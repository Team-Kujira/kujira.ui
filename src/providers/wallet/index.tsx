import { AccountData, EncodeObject } from "@cosmjs/proto-signing";
import {
  assertIsDeliverTxSuccess,
  Coin,
  DeliverTxResponse,
} from "@cosmjs/stargate";
import { ChainInfo } from "@keplr-wallet/types";
import {
  ConnectType,
  getChainOptions,
  WalletController,
} from "@terra-money/wallet-controller";
import { DelegationResponse } from "cosmjs-types/cosmos/staking/v1beta1/staking";
import { Any } from "cosmjs-types/google/protobuf/any";
import { BigNumber } from "ethers";
import { CHAIN_INFO, Denom, NETWORK } from "kujira.js";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-hot-toast";
import QRCode from "react-qr-code";
import Input from "../../components/Input";
import { Modal } from "../../components/Modal";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useWindowSize } from "../../hooks/useWindowSize";
import { IconSonar } from "../../icons";
import { Keplr, ReadOnly, Sonar, Station } from "../../wallets";
import { useNetwork } from "../network";

export enum Adapter {
  Sonar = "sonar",
  Keplr = "keplr",
  Station = "station",
  ReadOnly = "readOnly",
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
  adapter: null | Adapter;
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
  adapter: null,
});

export const WalletContext: FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [address, setAddress] = useLocalStorage("address", "");
  const [showAddress, setShowAddress] = useState(false);
  const [stored, setStored] = useLocalStorage("wallet", "");
  const [wallet, setWallet] = useState<
    Sonar | Keplr | Station | ReadOnly | null
  >(null);
  const [feeDenom, setFeeDenom] = useLocalStorage(
    "feeDenom",
    "ukuji"
  );
  const [balances, setBalances] = useState<Record<string, BigNumber>>(
    {}
  );
  const [stationController, setStationController] =
    useState<WalletController | null>(null);

  const [kujiraBalances, setKujiraBalances] = useState<Coin[]>([]);

  const [{ network, chainInfo, query, rpc }] = useNetwork();
  const [link, setLink] = useState("");
  const [modal, setModal] = useState(false);

  const [kujiraAccount, setKujiraAccount] = useState<null | Any>(
    null
  );

  const [delegations, setDelegations] = useState<
    null | DelegationResponse[]
  >(null);

  useEffect(() => {
    getChainOptions().then((opts) =>
      setStationController(new WalletController(opts))
    );
  }, []);

  useEffect(() => {
    if (!wallet && stored === Adapter.Station) {
      stationController?.availableConnections().subscribe((next) => {
        // https://github.com/terra-money/wallet-provider/blob/main/packages/src/%40terra-money/wallet-controller/controller.ts#L247-L259
        // The extension isn't actually available when this is called
        next.find((x) => x.type === ConnectType.EXTENSION) &&
          setTimeout(() => {
            connect(Adapter.Station);
          }, 10);
      });
    }
  }, [stationController]);

  useEffect(() => {
    if (!wallet && stored === Adapter.ReadOnly && address) {
      ReadOnly.connect(address).then(setWallet);
      return;
    }

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
    const chainInfo: ChainInfo = {
      ...CHAIN_INFO[chain || network],
    };

    switch (adapter) {
      case Adapter.Keplr:
        Keplr.connect({ ...chainInfo, rpc })
          .then((x) => {
            setStored(adapter);
            setWallet(x);
          })
          .catch((err) => {
            toast.error(err.message);
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
      case Adapter.Station:
        stationController &&
          Station.connect(chainInfo, {
            controller: stationController,
          })
            .then((x) => {
              setStored(adapter);
              setWallet(x);
            })
            .catch((err) => {
              toast.error(
                err.message === "extension instance is not created!"
                  ? "Station extension not available"
                  : err.message
              );
            });
        break;
      case Adapter.ReadOnly:
        setShowAddress(true);
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

  const adapter =
    wallet instanceof Keplr
      ? Adapter.Keplr
      : wallet instanceof Sonar
      ? Adapter.Sonar
      : wallet instanceof Station
      ? Adapter.Station
      : wallet instanceof ReadOnly
      ? Adapter.ReadOnly
      : null;

  return (
    <Context.Provider
      key={network + wallet?.account.address}
      value={{
        adapter,
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

      <Modal
        show={showAddress}
        close={() => setShowAddress(false)}
        confirm={() =>
          ReadOnly.connect(address).then((w) => {
            setStored(Adapter.ReadOnly);
            setWallet(w);
            setShowAddress(false);
          })
        }
        title="Read Only Connection">
        <>
          <p className="fs-14 lh-16 color-white mb-2">
            Enter a Kujira address to see a <strong>read only</strong>{" "}
            version of the app, as if connected with this address.
          </p>
          <Input
            placeholder="kujira1..."
            value={address}
            onChange={(e) => setAddress(e.currentTarget.value)}
          />
        </>
      </Modal>
    </Context.Provider>
  );
};

export function useWallet() {
  return useContext(Context);
}
