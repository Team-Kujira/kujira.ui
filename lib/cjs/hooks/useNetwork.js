"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNetwork = exports.NetworkContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const useLocalStorage_1 = require("./useLocalStorage");
const react_1 = require("react");
const tendermint_rpc_1 = require("@cosmjs/tendermint-rpc");
const kujira_js_1 = require("kujira.js");
const Context = (0, react_1.createContext)({
    network: kujira_js_1.MAINNET,
    setNetwork: () => { },
    tmClient: null,
    query: null,
});
const NetworkContext = ({ children }) => {
    const [network, setNetwork] = (0, useLocalStorage_1.useLocalStorage)("network", kujira_js_1.MAINNET);
    const [tmClient, setTmClient] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const httpClient = new tendermint_rpc_1.HttpBatchClient(kujira_js_1.CHAIN_INFO[network].rpc, {
            dispatchInterval: 100,
            batchSizeLimit: 200,
        });
        tendermint_rpc_1.Tendermint34Client.create(httpClient).then(setTmClient);
    }, [network]);
    const query = (0, react_1.useMemo)(() => tmClient && (0, kujira_js_1.kujiraQueryClient)({ client: tmClient }), [tmClient]);
    return ((0, jsx_runtime_1.jsx)(Context.Provider, Object.assign({ value: { network, setNetwork, tmClient, query } }, { children: children }), network));
};
exports.NetworkContext = NetworkContext;
const useNetwork = () => {
    const { network, setNetwork, tmClient, query } = (0, react_1.useContext)(Context);
    return [
        { network, chainInfo: kujira_js_1.CHAIN_INFO[network], tmClient, query },
        setNetwork,
    ];
};
exports.useNetwork = useNetwork;
