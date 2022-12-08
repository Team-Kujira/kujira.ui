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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useKujiraWalletConnect = void 0;
const client_1 = __importDefault(require("@walletconnect/client"));
const kujira_js_1 = require("kujira.js");
const react_1 = require("react");
const useWindowSize_1 = require("../../hooks/useWindowSize");
const useKujiraWalletConnect = ({ feeDenom, setModal, setLink, }) => {
    const [accounts, setAccounts] = (0, react_1.useState)(null);
    const connect = (network = kujira_js_1.MAINNET) => {
        connector.createSession();
    };
    const size = (0, useWindowSize_1.useWindowSize)();
    const connector = (0, react_1.useMemo)(() => new client_1.default({
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
    (0, react_1.useEffect)(() => {
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
                .map((m) => kujira_js_1.registry.encodeAsAny(m))
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
exports.useKujiraWalletConnect = useKujiraWalletConnect;
