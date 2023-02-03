import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { LOCALNET, MAINNET, NETWORKS, TESTNET } from "kujira.js";
import { useNetwork } from "../providers/network";
import { Select } from "./Select";
const status = (latency) => latency > 2000 ? "red" : latency > 750 ? "orange" : "green";
export const Network = () => {
    var _a;
    const [{ rpcs, rpc, setRpc, preferred, lock, unlock }] = useNetwork();
    const locked = !!preferred;
    const latency = ((_a = rpcs.find((r) => r.endpoint === rpc)) === null || _a === void 0 ? void 0 : _a.latency) || 0;
    return (_jsxs("div", Object.assign({ className: "rpc" }, { children: [_jsx("span", { children: "Connected to" }), _jsx(NetworkSelect, {}), _jsx("span", { children: "with" }), _jsx(Select, { className: "select--small select--mono select--align-start", options: rpcs
                    .sort((a, b) => b.latency - a.latency)
                    .map((e) => ({
                    label: `${e.endpoint}`,
                    value: e.endpoint,
                    status: status(e.latency),
                })), selected: {
                    label: rpc || "",
                    value: rpc || "",
                    status: status(latency),
                }, disabled: locked, allowCustomInput: true, onCustomChange: (v) => setRpc(v), onChange: (v) => setRpc(v), suffix: (v) => {
                    var _a;
                    return (_jsxs("small", Object.assign({ className: "color-lightGrey ml-q1" }, { children: ["(", ((_a = rpcs.find((r) => r.endpoint === v.value)) === null || _a === void 0 ? void 0 : _a.latency) || 0, "ms)"] })));
                } }), locked ? (_jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 384 512", onClick: unlock }, { children: _jsx("path", { fill: "#60fbd0", d: "M274.8 6.288C279.4 2.237 285.3 0 291.4 0C308.6 0 320.6 17.05 314.8 33.27L246.7 224H356.1C371.9 224 384 236.1 384 251C384 258.8 380.7 266.2 374.9 271.3L109.1 505.8C104.6 509.8 98.7 512 92.63 512C75.41 512 63.39 494.9 69.18 478.7L137.3 288H25.81C11.56 288 0 276.4 0 262.2C0 254.8 3.153 247.8 8.664 242.9L274.8 6.288zM275.4 48.65L42.08 256H160C165.2 256 170.1 258.5 173.1 262.8C176.1 267 176.8 272.5 175.1 277.4L108.6 463.6L343.8 256H224C218.8 256 213.9 253.5 210.9 249.2C207.9 244.1 207.2 239.5 208.9 234.6L275.4 48.65z" }) }))) : (_jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 512", onClick: lock }, { children: _jsx("path", { fill: "currentColor", d: "M351.4 362.3L376.9 382.4L237.1 505.8C232.6 509.8 226.7 512 220.6 512C203.4 512 191.4 494.9 197.2 478.7L263.5 292.1L290 313.9L236.6 463.6L351.4 362.3zM216.7 256L257.2 288H153.8C139.6 288 128 276.4 128 262.2C128 254.8 131.2 247.8 136.7 242.9L166.5 216.4L192 236.5L170.1 256H216.7zM289.2 150.1L263.7 129.1L402.8 6.288C407.4 2.237 413.3 0 419.4 0C436.6 0 448.6 17.05 442.8 33.27L376.5 219L349.1 198.1L403.4 48.65L289.2 150.1zM512 251C512 258.8 508.7 266.2 502.9 271.3L474.4 296.4L448.9 276.2L471.8 256H423.3L382.8 224H484.1C499.9 224 512 236.1 512 251zM633.9 483.4C640.9 488.9 642 498.1 636.6 505.9C631.1 512.9 621 514 614.1 508.6L6.086 28.56C-.8493 23.08-2.033 13.02 3.443 6.087C8.918-.849 18.98-2.033 25.91 3.443L633.9 483.4z" }) })))] })));
};
const names = {
    [TESTNET]: "testnet",
    [MAINNET]: "mainnet",
    [LOCALNET]: "local",
};
const NetworkSelect = () => {
    const [{ network }, setNetwork] = useNetwork();
    return (_jsx(_Fragment, { children: Object.entries(NETWORKS).length > 1 && (_jsx(Select, { className: "select--small select--mono select--align-start mr-1", selected: {
                label: `${names[network]} (${network})`,
                value: network,
            }, onChange: setNetwork, options: [
                { label: "Mainnet", value: MAINNET },
                { label: "Testnet", value: TESTNET },
                { label: "Local", value: LOCALNET },
            ] })) }));
};
