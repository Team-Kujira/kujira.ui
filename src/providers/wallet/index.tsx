import {
  AccountData,
  EncodeObject,
  coin,
} from "@cosmjs/proto-signing";
import {
  Coin,
  DeliverTxResponse,
  assertIsDeliverTxSuccess,
} from "@cosmjs/stargate";
import { ChainInfo } from "@keplr-wallet/types";
import {
  ConnectType,
  WalletController,
  getChainOptions,
} from "@terra-money/wallet-controller";
import { DelegationResponse } from "cosmjs-types/cosmos/staking/v1beta1/staking";
import { Any } from "cosmjs-types/google/protobuf/any";
import { BigNumber } from "ethers";
import { CHAIN_INFO, Denom, MAINNET, NETWORK } from "kujira.js";
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
import {
  CW3Wallet,
  Keplr,
  Leap,
  LeapSnap,
  ReadOnly,
  Sonar,
  Station,
  Xfi,
} from "kujira.js";
import { QR } from "react-qr-rounded";
import Input from "../../components/Input";
import { Modal } from "../../components/Modal";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useWindowSize } from "../../hooks/useWindowSize";
import { IconAngleRight, IconSonar } from "../../icons";
import { appLink } from "../../utils";
import { useNetwork } from "../network";
import Logo from "./../../assets/sonar.png";

export enum Adapter {
  Sonar = "sonar",
  CW3 = "cw3",
  Keplr = "keplr",
  Station = "station",
  ReadOnly = "readOnly",
  Leap = "leap",
  LeapSnap = "leapSnap",
  Xfi = "xfi",
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
    : wallet instanceof Station
    ? Adapter.Station
    : wallet instanceof ReadOnly
    ? Adapter.ReadOnly
    : wallet instanceof CW3Wallet
    ? Adapter.CW3
    : null;
};

export const WalletContext: FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [address, setAddress] = useLocalStorage("address", "");
  const [showAddress, setShowAddress] = useState(false);
  const [cw3Address, setCw3Address] = useLocalStorage("cw3", "");
  const [cw3Modal, setCw3Modal] = useState<"address" | "proposal">();
  const [cw3Title, setCw3Title] = useState<string>();
  const [cw3Desc, setCw3Desc] = useState<string>();
  const [cw3Resolve, setCw3Resolve] =
    useState<(a: { title: string; description: string }) => void>();
  const [cw3Reject, setCw3Reject] = useState<(a: Error) => void>();

  const [stored, setStored] = useLocalStorage("wallet", "");
  const [wallet, setWallet] = useState<
    | Sonar
    | Keplr
    | Station
    | ReadOnly
    | CW3Wallet
    | Leap
    | LeapSnap
    | Xfi
    | null
  >(null);

  const adapter = toAdapter(wallet);

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
    query?.bank
      .allBalances(
        wallet.account.address,
        PageRequest.fromPartial({ limit: 10000 })
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
    if (adapter === Adapter.CW3) {
      setCw3Modal("proposal");
      return new Promise<{ title: string; description: string }>(
        (resolve, reject) => {
          setCw3Resolve(() => resolve);
          setCw3Reject(() => reject);
        }
      ).then(({ title, description }) => {
        return wallet.signAndBroadcast(
          rpc,
          msgs,
          feeDenom,
          memo,
          title,
          description,
          coin(
            "100000000",
            "factory/kujira1r85reqy6h0lu02vyz0hnzhv5whsns55gdt4w0d7ft87utzk7u0wqr4ssll/uusk"
          )
        );
      });
    } else {
      const res = await wallet.signAndBroadcast(
        rpc,
        msgs,
        feeDenom,
        memo
      );
      assertIsDeliverTxSuccess(res);
      return res;
    }
  };

  const submitCw3 = () => {
    if (cw3Resolve && cw3Title && cw3Desc)
      cw3Resolve({ title: cw3Title, description: cw3Desc });
  };

  const size = useWindowSize();

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
      ...CHAIN_INFO[MAINNET],
      chainId: network,
      chainName: "Kujira Kev",
    };

    switch (adapter) {
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
        stationController &&
          Station.connect(chainInfo, {
            controller: stationController,
          })
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
      case Adapter.CW3:
        setCw3Modal("address");
    }
  };

  useEffect(() => {
    wallet && wallet.onChange(setWallet);
  }, [wallet]);

  const disconnect = () => {
    if (wallet instanceof CW3Wallet) {
      setWallet(wallet.wallet);
    } else {
      setStored("");
      setWallet(null);
      wallet?.disconnect();
    }
  };

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
        signAndBroadcast: (msgs, memo) =>
          signAndBroadcast(rpc, msgs, memo),
        refreshBalances,
        refreshDelegations,
        feeDenom,
        setFeeDenom,
        chainInfo,
      }}>
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
              rounding={150}
              cutout
              cutoutElement={
                <img
                  src={Logo}
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "100%",
                  }}
                />
              }
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
            <a
              href={appLink("sonar")}
              target="_blank"
              className="md-button mt-2 md-button--icon-right">
              Download Sonar
              <IconAngleRight />
            </a>
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

      <Modal
        show={cw3Modal === "address"}
        close={() => setCw3Modal(undefined)}
        confirm={() => {
          if (!wallet) return;
          if (wallet instanceof ReadOnly) return;
          if (wallet instanceof CW3Wallet) return;
          setStored(Adapter.CW3);
          setWallet(new CW3Wallet(address, wallet));
          setCw3Modal(undefined);
        }}
        title="DAO Connection">
        <>
          <p className="fs-14 lh-16 color-white mb-2">
            Enter a CW3 DAO address. You will be able to submit
            proposals to the DAO where normally you would execute
            those transactions with your own account.
          </p>
          <Input
            placeholder="kujira1..."
            value={address}
            onChange={(e) => setAddress(e.currentTarget.value)}
          />
        </>
      </Modal>

      <Modal
        show={cw3Modal === "proposal"}
        close={() => {
          cw3Reject && cw3Reject(new Error("User Cancelled"));
          setCw3Modal(undefined);
        }}
        confirm={submitCw3}
        title="SQUAD Connection">
        <>
          <p className="fs-14 lh-16 color-white mb-2">
            Enter proposal details that will be submitted to the DAO
            with the transaction
          </p>
          <Input
            placeholder="kujira1..."
            value={cw3Title}
            onChange={(e) => setCw3Title(e.currentTarget.value)}
          />
          <textarea
            placeholder="kujira1..."
            value={cw3Desc}
            onChange={(e) => setCw3Desc(e.currentTarget.value)}
          />
        </>
      </Modal>
    </Context.Provider>
  );
};

export function useWallet() {
  return useContext(Context);
}
