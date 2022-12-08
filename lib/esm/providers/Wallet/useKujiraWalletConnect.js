var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useEffect, useState, useMemo } from "react";
import WalletConnect from "@walletconnect/client";
import { useLocation } from "react-router-dom";
import { MAINNET, registry } from "kujira.js";
import { useNetwork } from "../../hooks/useNetwork";
import { useWindowSize } from "../../hooks/useWindowSize";
export const useKujiraWalletConnect = ({ feeDenom, setModal, setLink, }) => {
    const [{ chainInfo }] = useNetwork();
    const location = useLocation();
    const [accounts, setAccounts] = useState(null);
    const connect = (network = MAINNET) => {
        connector.createSession();
    };
    const size = useWindowSize();
    const connector = useMemo(() => new WalletConnect({
        bridge: "https://bridge.walletconnect.org",
        qrcodeModal: {
            open(uri, cb) {
                if ((size === null || size === void 0 ? void 0 : size.width) && (size === null || size === void 0 ? void 0 : size.width) < 768) {
                    window.location.assign(`kujira://ws?uri=${encodeURIComponent(uri)}`);
                }
                else {
                    setLink(uri);
                    setModal(true);
                }
            },
            close: () => { },
        },
    }), []);
    // Create a connector
    useEffect(() => {
        if (!connector)
            return;
        connector.session &&
            setAccounts(connector.session.accounts.map((address) => ({
                address,
                pubkey: new Uint8Array(),
                algo: "secp256k1",
            })));
        // Subscribe to connection events
        connector.on("connect", (error, payload) => {
            if (error)
                throw error;
            setModal(false);
            setAccounts(payload.params[0].accounts.map((address) => ({
                address,
                pubkey: new Uint8Array(),
                algo: "secp256k1",
            })));
        });
        connector.on("session_update", (error, payload) => {
            console.log({ error, payload });
            if (error)
                throw error;
        });
        connector.on("disconnect", (error, payload) => {
            if (error)
                throw error;
            setAccounts(null);
            // Delete connector
        });
    }, [connector]);
    const account = accounts && accounts[0];
    const signAndBroadcast = (msgs) => __awaiter(void 0, void 0, void 0, function* () {
        if (!account)
            throw new Error("No Wallet Connected");
        const x = yield connector.sendCustomRequest({
            id: 0,
            jsonrpc: "2.0",
            method: "sign_tx",
            params: msgs
                .map((m) => registry.encodeAsAny(m))
                .map((x) => (Object.assign(Object.assign({}, x), { value: Buffer.from(x.value).toString("base64") }))),
        });
        return x;
    });
    return {
        account,
        connect,
        disconnect: () => {
            connector.killSession();
        },
        signAndBroadcast,
    };
};
