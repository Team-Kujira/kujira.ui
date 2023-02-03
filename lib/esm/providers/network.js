import { jsx as _jsx } from "react/jsx-runtime";
import { HttpBatchClient, Tendermint34Client, } from "@cosmjs/tendermint-rpc";
import { CHAIN_INFO, kujiraQueryClient, MAINNET, RPCS, } from "kujira.js";
import { createContext, useContext, useEffect, useMemo, useState, } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
const Context = createContext({
    network: MAINNET,
    setNetwork: () => { },
    tmClient: null,
    query: null,
    rpc: "",
    rpcs: [],
    setRpc: () => { },
    preferred: null,
    unlock: () => { },
    lock: () => { },
});
const toClient = (endpoint, setLatencies) => {
    const start = new Date().getTime();
    return Tendermint34Client.create(new HttpBatchClient(endpoint, {
        dispatchInterval: 100,
        batchSizeLimit: 200,
    })).then((c) => {
        setLatencies &&
            setLatencies((prev) => (Object.assign(Object.assign({}, prev), { [endpoint]: new Date().getTime() - start })));
        return [c, endpoint];
    });
};
export const NetworkContext = ({ children, onError }) => {
    const [network, setNetwork] = useLocalStorage("network", MAINNET);
    const [preferred, setPreferred] = useLocalStorage("rpc", "");
    const [tm, setTmClient] = useState(null);
    const [latencies, setLatencies] = useState({});
    const tmClient = tm && tm[0];
    useEffect(() => {
        if (preferred) {
            toClient(preferred)
                .then(setTmClient)
                .catch((err) => onError ? onError(err) : console.error(err));
        }
        else {
            Promise.any(RPCS[network].map((x) => toClient(x, setLatencies)))
                .then(setTmClient)
                .catch((err) => onError ? onError(err) : console.error(err));
        }
    }, [network]);
    const setRpc = (val) => {
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
    const query = useMemo(() => tmClient && kujiraQueryClient({ client: tmClient }), [tmClient]);
    return (tm && (_jsx(Context.Provider, Object.assign({ value: {
            network,
            setNetwork,
            tmClient,
            query,
            rpc: tm[1],
            rpcs: RPCS[network].map((endpoint) => ({
                endpoint,
                latency: latencies[endpoint] || 9999,
            })),
            setRpc,
            unlock,
            lock,
            preferred: preferred || null,
        } }, { children: children }), network)));
};
export const useNetwork = () => {
    const { network, setNetwork, tmClient, query, rpc, setRpc, preferred, lock, unlock, rpcs, } = useContext(Context);
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
