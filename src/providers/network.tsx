import {
  HttpBatchClient,
  Tendermint34Client,
} from "@cosmjs/tendermint-rpc";
import { ChainInfo } from "@keplr-wallet/types";
import {
  CHAIN_INFO,
  KujiraQueryClient,
  kujiraQueryClient,
  MAINNET,
  NETWORK,
  RPCS,
} from "kujira.js";
import {
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
  tmClient: Tendermint34Client | null;
  query: KujiraQueryClient | null;
  rpc: string | null;
};

const Context = createContext<NetworkContext>({
  network: MAINNET,
  setNetwork: () => {},
  tmClient: null,
  query: null,
  rpc: null,
});

const toClient = (
  endpoint: string
): Promise<[Tendermint34Client, string]> =>
  Tendermint34Client.create(
    new HttpBatchClient(endpoint, {
      dispatchInterval: 100,
      batchSizeLimit: 200,
    })
  ).then((c) => [c, endpoint]);

export const NetworkContext: React.FC = ({ children }) => {
  const [network, setNetwork] = useLocalStorage("network", MAINNET);
  const [tm, setTmClient] = useState<
    null | [Tendermint34Client, string]
  >(null);

  const tmClient = tm && tm[0];

  useEffect(() => {
    Promise.any(RPCS[network as NETWORK].map(toClient)).then(
      setTmClient
    );
  }, [network]);

  const query = useMemo(
    () => tmClient && kujiraQueryClient({ client: tmClient }),
    [tmClient]
  );

  return (
    <Context.Provider
      key={network}
      value={{
        network,
        setNetwork,
        tmClient,
        query,
        rpc: tm && tm[1],
      }}>
      {children}
    </Context.Provider>
  );
};

export const useNetwork = (): [
  {
    network: NETWORK;
    chainInfo: ChainInfo;
    tmClient: Tendermint34Client | null;
    query: KujiraQueryClient | null;
    rpc: string | null;
  },
  (n: NETWORK) => void
] => {
  const { network, setNetwork, tmClient, query, rpc } =
    useContext(Context);

  return [
    { network, chainInfo: CHAIN_INFO[network], tmClient, query, rpc },
    setNetwork,
  ];
};
