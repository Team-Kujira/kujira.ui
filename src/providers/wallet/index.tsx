import { AccountData, EncodeObject } from "@cosmjs/proto-signing";
import {
  assertIsDeliverTxSuccess,
  Coin,
  DeliverTxResponse,
} from "@cosmjs/stargate";
import { ChainInfo } from "@keplr-wallet/types";
import { DelegationResponse } from "cosmjs-types/cosmos/staking/v1beta1/staking";
import { Any } from "cosmjs-types/google/protobuf/any";
import { BigNumber } from "ethers";
import { CHAIN_INFO, Denom, NETWORK } from "kujira.js";
import {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";
import QRCode from "react-qr-code";
import { Modal } from "../../components/Modal";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useWindowSize } from "../../hooks/useWindowSize";
import { IconSonar } from "../../icons";
import { useNetwork } from "../network";
import { Keplr } from "./keplr";
import { Sonar } from "./sonar";

export enum Adapter {
  Sonar = "sonar",
  Keplr = "keplr",
}

export type IWallet = {
  connect: null | ((adapter: Adapter, chain?: NETWORK) => void);
  disconnect: () => void;
  account: AccountData | null;
  kujiraAccount: Any | null;
  balances: Coin[];
  getBalance: (
    denom: Denom,
    refresh?: boolean
  ) => Promise<BigNumber | null>;
  balance: (denom: Denom) => BigNumber;
  signAndBroadcast: (
    msgs: EncodeObject[],
    memo?: string
  ) => Promise<DeliverTxResponse>;
  delegations: null | DelegationResponse[];
  refreshBalances: () => void;
  refreshDelegations: () => void;
  feeDenom: string;
  setFeeDenom: (denom: string) => void;
  chainInfo: ChainInfo;
};

const Context = createContext<IWallet>({
  account: null,
  getBalance: async () => BigNumber.from(0),
  balance: () => BigNumber.from(0),
  connect: null,
  disconnect: () => {},
  kujiraAccount: null,
  balances: [],
  signAndBroadcast: async () => {
    throw new Error("Not Implemented");
  },

  delegations: null,
  refreshBalances: () => {},
  refreshDelegations: () => {},
  feeDenom: "ukuji",
  setFeeDenom: () => {},
  chainInfo: {} as ChainInfo,
});

export const WalletContext: FC = ({ children }) => {
  const [stored, setStored] = useLocalStorage("wallet", "");
  const [wallet, setWallet] = useState<Sonar | Keplr | null>(null);
  const [feeDenom, setFeeDenom] = useLocalStorage(
    "feeDenom",
    "ukuji"
  );
  const [balances, setBalances] = useState<Record<string, BigNumber>>(
    {}
  );

  const [kujiraBalances, setKujiraBalances] = useState<Coin[]>([]);

  const [{ network, chainInfo, query }] = useNetwork();
  const [link, setLink] = useState("");
  const [modal, setModal] = useState(false);

  const [kujiraAccount, setKujiraAccount] = useState<null | Any>(
    null
  );

  const [delegations, setDelegations] = useState<
    null | DelegationResponse[]
  >(null);

  useEffect(() => {
    stored && connect(stored, network, true);
  }, []);

  useEffect(() => {
    wallet && connect(stored, network);
  }, [network]);

  const refreshBalances = () => {
    if (!wallet) return;
    query?.bank.allBalances(wallet.account.address).then((x) => {
      x && setKujiraBalances(x);
      x?.map((b) => {
        setBalances((prev) =>
          b.denom
            ? {
                ...prev,
                [b.denom]: BigNumber.from(b.amount),
              }
            : prev
        );
      });
    });
  };

  useEffect(() => {
    setKujiraBalances([]);
    setBalances({});
    refreshBalances();
  }, [wallet, query]);

  useEffect(() => {
    if (!wallet) return;
    query?.auth
      .account(wallet.account.address)
      .then((account) => account && setKujiraAccount(account));
  }, [wallet, query]);

  const refreshDelegations = () => {
    if (!wallet) return;
    setDelegations(null);
    query?.staking
      .delegatorDelegations(wallet.account.address)
      .then(
        ({ delegationResponses }) =>
          delegationResponses && setDelegations(delegationResponses)
      );
  };

  useEffect(() => {
    refreshDelegations();
  }, [wallet, query]);

  const balance = (denom: Denom): BigNumber =>
    balances[denom.reference] || BigNumber.from(0);

  const fetchBalance = async (denom: Denom): Promise<BigNumber> => {
    if (!wallet) return BigNumber.from(0);
    if (!query) return BigNumber.from(0);
    return query.bank
      .balance(wallet.account.address, denom.reference)
      .then((resp) => BigNumber.from(resp?.amount || 0))
      .then((balance) => {
        setBalances((prev) => ({
          ...prev,
          [denom.reference]: balance,
        }));
        return balance;
      });
  };

  const getBalance = async (denom: Denom, refresh = true) =>
    balances[denom.reference] || refresh
      ? fetchBalance(denom)
      : BigNumber.from(0);

  const signAndBroadcast = async (
    msgs: EncodeObject[],
    memo?: string
  ): Promise<DeliverTxResponse> => {
    if (!wallet) throw new Error("No Wallet Connected");
    const res = await wallet.signAndBroadcast(msgs, feeDenom, memo);
    assertIsDeliverTxSuccess(res);
    return res;
  };

  const size = useWindowSize();

  const sonarRequest = (uri: string) => {
    if (size?.width && size?.width < 768) {
      window.location.assign(
        `kujira://ws?uri=${encodeURIComponent(uri)}`
      );
    } else {
      setLink(uri);
      setModal(true);
    }
  };

  const connect = (
    adapter: Adapter,
    chain?: NETWORK,
    auto?: boolean
  ) => {
    switch (adapter) {
      case Adapter.Keplr:
        Keplr.connect(CHAIN_INFO[chain || network], {
          feeDenom,
        })
          .then((x) => {
            setStored(adapter);
            setWallet(x);
          })
          .catch((err) => {
            console.error(err.message);
          });

        break;

      case Adapter.Sonar:
        Sonar.connect(network, {
          request: sonarRequest,
          auto: !!auto,
        }).then((x) => {
          setModal(false);
          setStored(adapter);
          setWallet(x);
        });
        break;
    }
  };

  useEffect(() => {
    wallet && wallet.onChange(setWallet);
  }, [wallet]);

  const disconnect = () => {
    setStored("");
    setWallet(null);
    wallet?.disconnect();
  };

  return (
    <Context.Provider
      key={network + wallet?.account.address}
      value={{
        account: wallet?.account || null,
        delegations,
        connect,
        disconnect,
        kujiraAccount,
        balances: kujiraBalances,
        getBalance,
        balance,
        signAndBroadcast,
        refreshBalances,
        refreshDelegations,
        feeDenom,
        setFeeDenom,
        chainInfo,
      }}>
      {children}
      <Modal
        show={modal}
        close={() => setModal(false)}
        className="modal--auto">
        <div className="md-flex ai-c">
          <QRCode
            value={link}
            bgColor="#607d8b"
            fgColor="transparent"
            className="no-shrink"
          />
          <div className="ml-2">
            <IconSonar
              style={{
                display: "block",
                height: "3rem",
                marginBottom: "1.5rem",
              }}
            />
            <h3>Scan this code using the Sonar Mobile App.</h3>
          </div>
        </div>
      </Modal>
    </Context.Provider>
  );
};

export function useWallet() {
  return useContext(Context);
}
