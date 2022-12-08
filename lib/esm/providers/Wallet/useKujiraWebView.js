var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { registry } from "kujira.js";
import { useMemo } from "react";
export const useKujiraWebView = () => {
    const params = useMemo(() => new URLSearchParams(window.location.search), []);
    const address = useMemo(() => params.get("walletAddress"), [params]);
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
                    .map((m) => registry.encodeAsAny(m))
                    .map((x) => (Object.assign(Object.assign({}, x), { value: Buffer.from(x.value).toString("base64") }))),
            }));
        });
    });
    const account = useMemo(() => address
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
