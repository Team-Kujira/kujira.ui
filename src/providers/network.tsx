import { useLocalStorage } from "../hooks/useLocalStorage";
import { ChainInfo } from "@keplr-wallet/types";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Tendermint34Client, HttpBatchClient } from "@cosmjs/tendermint-rpc";
import {
  CHAIN_INFO,
  KujiraQueryClient,
  kujiraQueryClient,
  MAINNET,
  NETWORK,
} from "kujira.js";

export type NetworkContext = {
  network: NETWORK;
  setNetwork: (n: NETWORK) => void;
  tmClient: Tendermint34Client | null;
  query: KujiraQueryClient | null;
};

const Context = createContext<NetworkContext>({
  network: MAINNET,
  setNetwork: () => {},
  tmClient: null,
  query: null,
});

export const NetworkContext: React.FC = ({ children }) => {
  const [network, setNetwork] = useLocalStorage("network", MAINNET);
  const [tmClient, setTmClient] = useState<null | Tendermint34Client>(null);

  useEffect(() => {
    const httpClient = new HttpBatchClient(CHAIN_INFO[network as NETWORK].rpc, {
      dispatchInterval: 100,
      batchSizeLimit: 200,
    });
    Tendermint34Client.create(httpClient).then(setTmClient);
  }, [network]);

  const query = useMemo(
    () => tmClient && kujiraQueryClient({ client: tmClient }),
    [tmClient]
  );

  return (
    <Context.Provider
      key={network}
      value={{ network, setNetwork, tmClient, query }}
    >
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
  },
  (n: NETWORK) => void
] => {
  const { network, setNetwork, tmClient, query } = useContext(Context);

  return [
    { network, chainInfo: CHAIN_INFO[network], tmClient, query },
    setNetwork,
  ];
};
