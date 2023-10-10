import {
  HttpBatchClient,
  Tendermint37Client,
} from "@cosmjs/tendermint-rpc";
import { ChainInfo } from "@keplr-wallet/types";
import {
  CHAIN_INFO,
  KujiraQueryClient,
  MAINNET,
  NETWORK,
  RPCS,
  kujiraQueryClient,
} from "kujira.js";
import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export type NetworkContext = {
  network: NETWORK;
  setNetwork: (n: NETWORK) => void;
  tmClient: Tendermint37Client | null;
  query: KujiraQueryClient | null;
  rpc: string;
  rpcs: {
    endpoint: string;
    latency: number;
    latestBlockTime: Date;
  }[];
  setRpc: (val: string) => void;
  preferred: string | null;
  unlock: () => void;
  lock: () => void;
};

const Context = createContext<NetworkContext>({
  network: MAINNET,
  setNetwork: () => {},
  tmClient: null,
  query: null,
  rpc: "",
  rpcs: [],
  setRpc: () => {},
  preferred: null,
  unlock: () => {},
  lock: () => {},
});

const toClient = async (
  endpoint: string,
  setLatencies?: Dispatch<
    SetStateAction<
      Record<string, { latency: number; latestBlockTime: Date }>
    >
  >
): Promise<[Tendermint37Client, string]> => {
  const start = new Date().getTime();

  const c = await Tendermint37Client.create(
    new HttpBatchClient(endpoint, {
      dispatchInterval: 100,
      batchSizeLimit: 200,
    })
  );
  const status = await c.status();

  setLatencies &&
    setLatencies((prev) => ({
      ...prev,
      [endpoint]: {
        latency: new Date().getTime() - start,
        latestBlockTime: new Date(
          status.syncInfo.latestBlockTime.toISOString()
        ),
      },
    }));
  return [c, endpoint];
};

export const NetworkContext: React.FC<
  PropsWithChildren<{
    onError?: (err: any) => void;
  }>
> = ({ children, onError }) => {
  const [network, setNetwork] = useLocalStorage("network", MAINNET);
  const [preferred, setPreferred] = useLocalStorage("rpc", "");
  const [tm, setTmClient] = useState<
    null | [Tendermint37Client, string]
  >();
  const [latencies, setLatencies] = useState<
    Record<string, { latency: number; latestBlockTime: Date }>
  >({});

  const tmClient = tm && tm[0];

  useEffect(() => {
    if (preferred) {
      toClient(preferred)
        .then(setTmClient)
        .catch((err) =>
          onError ? onError(err) : console.error(err)
        );
    } else {
      Promise.any(
        RPCS[network as NETWORK].map((x) => toClient(x, setLatencies))
      )
        .then(setTmClient)
        .catch((err) => {
          setTmClient(null);
          onError ? onError(err) : console.error(err);
        });
    }
  }, [network]);

  const setRpc = (val: string) => {
    toClient(val)
      .then(setTmClient)
      .catch((err) => (onError ? onError(err) : console.error(err)));
  };

  const unlock = () => {
    setPreferred("");
  };

  const lock = () => {
    tm && setPreferred(tm[1]);
  };

  const query = useMemo(
    () => (tmClient ? kujiraQueryClient({ client: tmClient }) : null),
    [tmClient]
  );

  switch (tm) {
    case null:
      return (
        <NoConnection network={network} setNetwork={setNetwork} />
      );
    case undefined:
      return null;
    default:
      return (
        <Context.Provider
          key={network}
          value={{
            network,
            setNetwork,
            tmClient: tmClient || null,
            query,
            rpc: tm[1],
            rpcs: Object.entries(latencies).map(
              ([endpoint, data]) => ({
                endpoint,
                ...data,
              })
            ),
            setRpc,
            unlock,
            lock,
            preferred: preferred || null,
          }}>
          {children}
        </Context.Provider>
      );
  }
};

const NoConnection: FC<{
  network: NETWORK;
  setNetwork(n: NETWORK): void;
}> = ({ network, setNetwork }) => {
  return (
    <div className="px-2 py-10 md-flex ai-c jc-c dir-c wrap">
      <h1 className="fs-18">
        No RPC connections available for {network}
      </h1>
      <h2 className="fs-16">Please check your internet connection</h2>
      {network !== MAINNET && (
        <button
          className="md-button mt-2"
          onClick={() => setNetwork(MAINNET)}>
          Switch to Mainnet
        </button>
      )}
    </div>
  );
};

export const useNetwork = (): [
  {
    network: NETWORK;
    chainInfo: ChainInfo;
    tmClient: Tendermint37Client | null;
    query: KujiraQueryClient | null;
    rpc: string;
    rpcs: {
      endpoint: string;
      latency: number;
      latestBlockTime: Date;
    }[];
    setRpc: (val: string) => void;
    preferred: null | string;
    unlock: () => void;
    lock: () => void;
  },
  (n: NETWORK) => void
] => {
  const {
    network,
    setNetwork,
    tmClient,
    query,
    rpc,
    setRpc,
    preferred,
    lock,
    unlock,
    rpcs,
  } = useContext(Context);

  return [
    {
      network,
      chainInfo: CHAIN_INFO[network],
      tmClient,
      query,
      rpc,
      rpcs,
      setRpc,
      preferred,
      lock,
      unlock,
    },
    setNetwork,
  ];
};
