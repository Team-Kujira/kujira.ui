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
exports.useWallet = exports.Adapter = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const stargate_1 = require("@cosmjs/stargate");
const ethers_1 = require("ethers");
const react_qr_code_1 = __importDefault(require("react-qr-code"));
const useKujiraWalletConnect_1 = require("./useKujiraWalletConnect");
const useKeplr_1 = require("./useKeplr");
const useKujiraWebView_1 = require("./useKujiraWebView");
const useNetwork_1 = require("../../hooks/useNetwork");
const useLocalStorage_1 = require("../../hooks/useLocalStorage");
const Modal_1 = require("../../components/Modal");
var Adapter;
(function (Adapter) {
    Adapter["KujiraWebview"] = "kujira-webview";
    Adapter["KujiraWalletConnect"] = "kujira-walletconnect";
    Adapter["Keplr"] = "keplr";
})(Adapter = exports.Adapter || (exports.Adapter = {}));
const Context = (0, react_1.createContext)({
    adapter: Adapter.KujiraWalletConnect,
    setAdapter: () => { },
    account: null,
    getBalance: () => __awaiter(void 0, void 0, void 0, function* () { return ethers_1.BigNumber.from(0); }),
    balance: () => ethers_1.BigNumber.from(0),
    connect: null,
    disconnect: () => { },
    kujiraAccount: null,
    balances: [],
    signAndBroadcast: () => __awaiter(void 0, void 0, void 0, function* () {
        throw new Error("Not Implemented");
    }),
    delegations: null,
    refreshBalances: () => { },
    refreshDelegations: () => { },
    feeDenom: "ukuji",
    setFeeDenom: () => { },
    chainInfo: {},
});
const WalletContext = ({ children }) => {
    const kujiraWebView = (0, useKujiraWebView_1.useKujiraWebView)();
    const [adapter, setAdapter] = (0, react_1.useState)(kujiraWebView ? Adapter.KujiraWebview : Adapter.Keplr);
    const [feeDenom, setFeeDenom] = (0, useLocalStorage_1.useLocalStorage)("feeDenom", "ukuji");
    const [balances, setBalances] = (0, react_1.useState)({});
    const [kujiraBalances, setKujiraBalances] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        document.onkeyup = function (e) {
            if (e.ctrlKey && e.shiftKey && e.key == "W") {
                setAdapter(adapter === Adapter.KujiraWalletConnect
                    ? Adapter.Keplr
                    : Adapter.KujiraWalletConnect);
            }
        };
    }, [adapter]);
    const [{ network, chainInfo, query }] = (0, useNetwork_1.useNetwork)();
    const [link, setLink] = (0, react_1.useState)("");
    const [modal, setModal] = (0, react_1.useState)(false);
    const [kujiraAccount, setKujiraAccount] = (0, react_1.useState)(null);
    const [delegations, setDelegations] = (0, react_1.useState)(null);
    const kujiraWalletConnect = (0, useKujiraWalletConnect_1.useKujiraWalletConnect)({
        feeDenom,
        setLink,
        setModal,
    });
    const keplr = (0, useKeplr_1.useKeplr)({ feeDenom });
    const connector = kujiraWebView
        ? kujiraWebView
        : adapter === Adapter.KujiraWalletConnect
            ? kujiraWalletConnect
            : keplr;
    const { account } = connector;
    const refreshBalances = () => {
        if (!account)
            return;
        query === null || query === void 0 ? void 0 : query.bank.allBalances(account.address).then((x) => {
            x && setKujiraBalances(x);
            x === null || x === void 0 ? void 0 : x.map((b) => {
                setBalances((prev) => b.denom
                    ? Object.assign(Object.assign({}, prev), { [b.denom]: ethers_1.BigNumber.from(b.amount) }) : prev);
            });
        });
    };
    (0, react_1.useEffect)(() => {
        setKujiraBalances([]);
        setBalances({});
        refreshBalances();
    }, [account, query]);
    (0, react_1.useEffect)(() => {
        if (!account)
            return;
        query === null || query === void 0 ? void 0 : query.auth.account(account.address).then((account) => account && setKujiraAccount(account));
    }, [account, query]);
    const refreshDelegations = () => {
        if (!account)
            return;
        setDelegations(null);
        query === null || query === void 0 ? void 0 : query.staking.delegatorDelegations(account.address).then(({ delegationResponses }) => delegationResponses && setDelegations(delegationResponses));
    };
    (0, react_1.useEffect)(() => {
        refreshDelegations();
    }, [account, query]);
    const balance = (denom) => balances[denom.reference] || ethers_1.BigNumber.from(0);
    const fetchBalance = (denom) => __awaiter(void 0, void 0, void 0, function* () {
        if (!account)
            return ethers_1.BigNumber.from(0);
        if (!query)
            return ethers_1.BigNumber.from(0);
        return query.bank
            .balance((account === null || account === void 0 ? void 0 : account.address) || "", denom.reference)
            .then((resp) => ethers_1.BigNumber.from((resp === null || resp === void 0 ? void 0 : resp.amount) || 0))
            .then((balance) => {
            setBalances((prev) => (Object.assign(Object.assign({}, prev), { [denom.reference]: balance })));
            return balance;
        });
    });
    const getBalance = (denom, refresh = true) => __awaiter(void 0, void 0, void 0, function* () {
        return balances[denom.reference] || refresh
            ? fetchBalance(denom)
            : ethers_1.BigNumber.from(0);
    });
    const signAndBroadcast = (msgs) => __awaiter(void 0, void 0, void 0, function* () {
        if (!account)
            throw new Error("No Wallet Connected");
        const res = yield connector.signAndBroadcast(msgs);
        (0, stargate_1.assertIsDeliverTxSuccess)(res);
        return res;
    });
    return ((0, jsx_runtime_1.jsxs)(Context.Provider, Object.assign({ value: {
            adapter,
            setAdapter,
            account,
            delegations,
            connect: connector.connect,
            disconnect: connector.disconnect,
            kujiraAccount,
            balances: kujiraBalances,
            getBalance,
            balance,
            signAndBroadcast,
            refreshBalances,
            refreshDelegations,
            feeDenom,
            setFeeDenom,
            chainInfo,
        } }, { children: [children, (0, jsx_runtime_1.jsx)(Modal_1.Modal, Object.assign({ show: modal, close: () => setModal(false) }, { children: (0, jsx_runtime_1.jsx)(react_qr_code_1.default, { value: link }) }))] }), network + (account === null || account === void 0 ? void 0 : account.address)));
};
function useWallet() {
    return (0, react_1.useContext)(Context);
}
exports.useWallet = useWallet;
