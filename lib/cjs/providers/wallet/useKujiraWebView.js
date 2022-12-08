"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useKujiraWebView = void 0;
const kujira_js_1 = require("kujira.js");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const useKujiraWebView = () => {
    const { search } = (0, react_router_dom_1.useLocation)();
    const params = (0, react_1.useMemo)(() => new URLSearchParams(search), []);
    const address = (0, react_1.useMemo)(() => params.get("walletAddress"), [params]);
    const signAndBroadcast = (msgs) => __awaiter(void 0, void 0, void 0, function* () {
        if (!account)
            throw new Error("No Wallet Connected");
        return new Promise((resolve, reject) => {
            window.onSignAndBroadcastSuccess = (result) => {
                console.log(result);
                delete window.onSignAndBroadcastError;
                delete window.onSignAndBroadcastSuccess;
                const response = JSON.parse(result);
                console.log(response);
                resolve(response);
            };
            window.onSignAndBroadcastError = (error) => {
                console.log(error);
                delete window.onSignAndBroadcastError;
                delete window.onSignAndBroadcastSuccess;
                reject(error);
            };
            window.ReactNativeWebView.postMessage(JSON.stringify({
                id: 0,
                jsonrpc: "2.0",
                method: "sign_tx",
                params: msgs
                    .map((m) => kujira_js_1.registry.encodeAsAny(m))
                    .map((x) => (Object.assign(Object.assign({}, x), { value: Buffer.from(x.value).toString("base64") }))),
            }));
        });
    });
    const account = (0, react_1.useMemo)(() => address
        ? {
            address,
            pubkey: new Uint8Array(),
            algo: "secp256k1",
        }
        : null, [address]);
    return account
        ? {
            account,
            connect: () => { },
            disconnect: () => { },
            signAndBroadcast,
        }
        : null;
};
exports.useKujiraWebView = useKujiraWebView;
