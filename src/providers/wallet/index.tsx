import { AccountData, EncodeObject } from "@cosmjs/proto-signing";
import {
  Coin,
  DeliverTxResponse,
  assertIsDeliverTxSuccess,
} from "@cosmjs/stargate";
import { ChainInfo } from "@keplr-wallet/types";
import { DelegationResponse } from "cosmjs-types/cosmos/staking/v1beta1/staking";
import { Any } from "cosmjs-types/google/protobuf/any";
import { BigNumber } from "ethers";
import {
  CHAIN_INFO,
  DaoDao,
  Denom,
  Keplr,
  Leap,
  LeapSnap,
  NETWORK,
  ReadOnly,
  Sonar,
  Station,
  Xfi,
} from "kujira.js";
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-hot-toast";
//import QRCode from "react-qr-code";
import { PageRequest } from "cosmjs-types/cosmos/base/query/v1beta1/pagination";
import { WalletI } from "kujira.js/lib/cjs/wallets/interface";
import { GradientButton, useUnified } from "kujira-core";
import { i18n } from "kujira.ui";
import { QR } from "react-qr-rounded";
import Input from "../../components/Input";
import { Modal } from "../../components/Modal";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { IconAngleRight, IconSonar } from "../../icons";
import { appLink } from "../../utils";
import { useNetwork } from "../network";
import { usePasskeys } from "../passkey";
import Logo from "./../../assets/sonar.png";
import { Passkey } from "./passkey";

export enum Adapter {
  Sonar = "sonar",
  Passkey = "passkey",
  Keplr = "keplr",
  Station = "station",
  ReadOnly = "readOnly",
  Leap = "leap",
  LeapSnap = "leapSnap",
  Xfi = "xfi",
  DaoDao = "daodao",
}

export type IWallet = {
  connect: null | ((adapter: Adapter, chain?: NETWORK) => void);
  disconnect: () => void;
  account: (AccountData & { label?: string }) | null;
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

const toAdapter = (wallet: any) => {
  return wallet instanceof Keplr
    ? Adapter.Keplr
    : wallet instanceof Leap
    ? Adapter.Leap
    : wallet instanceof LeapSnap
    ? Adapter.LeapSnap
    : wallet instanceof Xfi
    ? Adapter.Xfi
    : wallet instanceof Sonar
    ? Adapter.Sonar
    : wallet instanceof Passkey
    ? Adapter.Passkey
    : wallet instanceof Station
    ? Adapter.Station
    : wallet instanceof ReadOnly
    ? Adapter.ReadOnly
    : null;
};

export const WalletContext: FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [address, setAddress] = useLocalStorage("address", "");
  const [showAddress, setShowAddress] = useState(false);
  const [stored, setStored] = useLocalStorage("wallet", "");
  const [wallet, setWallet] = useState<WalletI | null>(null);
  const { signer, selectSigner } = usePasskeys();

  const adapter = toAdapter(wallet);
  const { unified } = useUnified();

  const [feeDenom, setFeeDenom] = useLocalStorage(
    "feeDenom",
    "ukuji"
  );
  const [balances, setBalances] = useState<Record<string, BigNumber>>(
    {}
  );

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
    if (!wallet && stored === Adapter.ReadOnly && address) {
      ReadOnly.connect(address).then(setWallet);
      return;
    }

    stored && connect(stored, network, true);

    const chainInfo: ChainInfo = CHAIN_INFO[network];
    DaoDao.connect(chainInfo)
      .then(setWallet)
      .catch((err) => {
        err.message?.includes("missing an account") &&
          toast.error(err.message);
      });
  }, []);

  useEffect(() => {
    wallet && connect(stored, network);
  }, [network]);

  const refreshBalances = () => {
    if (!wallet) return;
    query?.bank
      .allBalances(
        wallet.account.address,
        PageRequest.fromPartial({ limit: BigInt(10000) })
      )
      .then((x) => {
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
    rpc: string,
    msgs: EncodeObject[],
    memo?: string
  ): Promise<DeliverTxResponse> => {
    if (!wallet) throw new Error("No Wallet Connected");
    const res = await wallet.signAndBroadcast(
      rpc,
      msgs,
      feeDenom,
      memo
    );
    assertIsDeliverTxSuccess(res);
    return res;
  };

  const sonarRequest = (uri: string) => {
    setLink(uri);
    setModal(true);
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
      case Adapter.Passkey:
        if (!signer) {
          toast.error("No Signer Available");
          return;
        }
        Passkey.connect({ ...chainInfo, rpc }, signer)
          .then((passkey) => {
            setStored(adapter);
            setWallet(passkey);
          })
          .catch((err) => {
            setStored("");
            toast.error(err.message);
          });
        break;
      case Adapter.Keplr:
        Keplr.connect({ ...chainInfo, rpc }, { feeDenom })
          .then((x) => {
            setStored(adapter);
            setWallet(x);
          })
          .catch((err) => {
            setStored("");
            toast.error(err.message);
          });

        break;

      case Adapter.Leap:
        Leap.connect({ ...chainInfo, rpc }, { feeDenom })
          .then((x) => {
            setStored(adapter);
            setWallet(x);
          })
          .catch((err) => {
            setStored("");
            toast.error(err.message);
          });

        break;

      case Adapter.LeapSnap:
        LeapSnap.connect({ ...chainInfo, rpc }, { feeDenom })
          .then((x) => {
            setStored(adapter);
            setWallet(x);
          })
          .catch((err) => {
            setStored("");
            toast.error(err.message);
          });

        break;

      case Adapter.Xfi:
        Xfi.connect({ ...chainInfo, rpc }, { feeDenom })
          .then((x) => {
            setStored(adapter);
            setWallet(x);
          })
          .catch((err) => {
            setStored("");
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
        Station.connect(chainInfo)
          .then((x) => {
            setStored(adapter);
            setWallet(x);
          })
          .catch((err) => {
            setStored("");
            toast.error(
              err.message === "extension instance is not created!"
                ? "Station extension not available"
                : err.message
            );
          });
        break;
      case Adapter.ReadOnly:
        setShowAddress(true);
        break;
    }
  };

  useEffect(() => {
    wallet && wallet.onChange(setWallet);
  }, [wallet]);

  const disconnect = () => {
    stored === Adapter.Passkey && selectSigner("");
    setStored("");
    setWallet(null);
    wallet?.disconnect();
  };

  const value: IWallet = {
    adapter,
    account: wallet?.account || null,
    delegations,
    connect,
    disconnect,
    kujiraAccount,
    balances: kujiraBalances,
    getBalance,
    balance,
    signAndBroadcast: (msgs, memo) =>
      signAndBroadcast(rpc, msgs, memo),
    refreshBalances,
    refreshDelegations,
    feeDenom,
    setFeeDenom,
    chainInfo,
  };

  return (
    <Context.Provider
      key={network + wallet?.account.address}
      value={value}>
      {children}
      <Modal
        show={modal}
        close={() => {
          setStored("");
          setModal(false);
        }}
        className="modal--auto">
        <div className="md-flex ai-c">
          <div className="no-shrink bg-darkGrey">
            {/* <QRCode
              className="m-1"
              value={link}
              bgColor="transparent"
              fgColor="#607d8b"
            /> */}
            <QR
              height={256}
              color="#ffffff"
              backgroundColor="transparent"
              rounding={0}
              /* cutout
              cutoutElement={
                <img
                  src={Logo}
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "100%",
                  }}
                />
              } */
              errorCorrectionLevel="M">
              {link}
            </QR>
          </div>
          <div className="ml-3">
            <IconSonar
              style={{
                display: "block",
                height: "3rem",
                marginBottom: "1.5rem",
              }}
            />
            <h3>Scan this code using the Sonar Mobile App.</h3>
            {}
            {unified ? (
              <GradientButton
                href="https://sonar.kujira.network"
                target="_blank"
                className="md-button--icon-right mt-2">
                <i18n.span>Download Sonar</i18n.span>
                <IconAngleRight />
              </GradientButton>
            ) : (
              <a
                href={appLink("sonar")}
                target="_blank"
                className="md-button mt-2 md-button--icon-right">
                <span>Download Sonar</span>
                <IconAngleRight />
              </a>
            )}
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
