import { jsx as _jsx } from "react/jsx-runtime";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Tendermint34Client, HttpBatchClient } from "@cosmjs/tendermint-rpc";
import { CHAIN_INFO, kujiraQueryClient, MAINNET, } from "kujira.js";
const Context = createContext({
    network: MAINNET,
    setNetwork: () => { },
    tmClient: null,
    query: null,
});
export const NetworkContext = ({ children }) => {
    const [network, setNetwork] = useLocalStorage("network", MAINNET);
    const [tmClient, setTmClient] = useState(null);
    useEffect(() => {
        const httpClient = new HttpBatchClient(CHAIN_INFO[network].rpc, {
            dispatchInterval: 100,
            batchSizeLimit: 200,
        });
        Tendermint34Client.create(httpClient).then(setTmClient);
    }, [network]);
    const query = useMemo(() => tmClient && kujiraQueryClient({ client: tmClient }), [tmClient]);
    return (_jsx(Context.Provider, Object.assign({ value: { network, setNetwork, tmClient, query } }, { children: children }), network));
};
export const useNetwork = () => {
    const { network, setNetwork, tmClient, query } = useContext(Context);
    return [
        { network, chainInfo: CHAIN_INFO[network], tmClient, query },
        setNetwork,
    ];
};
