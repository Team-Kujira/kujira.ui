"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNetwork = exports.NetworkContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tendermint_rpc_1 = require("@cosmjs/tendermint-rpc");
const kujira_js_1 = require("kujira.js");
const react_1 = require("react");
const useLocalStorage_1 = require("../hooks/useLocalStorage");
const Context = (0, react_1.createContext)({
    network: kujira_js_1.MAINNET,
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
    return tendermint_rpc_1.Tendermint34Client.create(new tendermint_rpc_1.HttpBatchClient(endpoint, {
        dispatchInterval: 100,
        batchSizeLimit: 200,
    })).then((c) => {
        setLatencies &&
            setLatencies((prev) => (Object.assign(Object.assign({}, prev), { [endpoint]: new Date().getTime() - start })));
        return [c, endpoint];
    });
};
const NetworkContext = ({ children, onError }) => {
    const [network, setNetwork] = (0, useLocalStorage_1.useLocalStorage)("network", kujira_js_1.MAINNET);
    const [preferred, setPreferred] = (0, useLocalStorage_1.useLocalStorage)("rpc", "");
    const [tm, setTmClient] = (0, react_1.useState)(null);
    const [latencies, setLatencies] = (0, react_1.useState)({});
    const tmClient = tm && tm[0];
    (0, react_1.useEffect)(() => {
        if (preferred) {
            toClient(preferred)
                .then(setTmClient)
                .catch((err) => onError ? onError(err) : console.error(err));
        }
        else {
            Promise.any(kujira_js_1.RPCS[network].map((x) => toClient(x, setLatencies)))
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
    const query = (0, react_1.useMemo)(() => tmClient && (0, kujira_js_1.kujiraQueryClient)({ client: tmClient }), [tmClient]);
    return (tm && ((0, jsx_runtime_1.jsx)(Context.Provider, Object.assign({ value: {
            network,
            setNetwork,
            tmClient,
            query,
            rpc: tm[1],
            rpcs: kujira_js_1.RPCS[network].map((endpoint) => ({
                endpoint,
                latency: latencies[endpoint] || 9999,
            })),
            setRpc,
            unlock,
            lock,
            preferred: preferred || null,
        } }, { children: children }), network)));
};
exports.NetworkContext = NetworkContext;
const useNetwork = () => {
    const { network, setNetwork, tmClient, query, rpc, setRpc, preferred, lock, unlock, rpcs, } = (0, react_1.useContext)(Context);
    return [
        {
            network,
            chainInfo: kujira_js_1.CHAIN_INFO[network],
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
exports.useNetwork = useNetwork;
