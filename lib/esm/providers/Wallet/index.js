var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useEffect, useState, createContext } from "react";
import { assertIsDeliverTxSuccess, } from "@cosmjs/stargate";
import { BigNumber } from "ethers";
import QRCode from "react-qr-code";
import { useKujiraWalletConnect } from "./useKujiraWalletConnect";
import { useKeplr } from "./useKeplr";
import { useKujiraWebView } from "./useKujiraWebView";
import { useNetwork } from "../../hooks/useNetwork";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Modal } from "../../components/Modal";
export var Adapter;
(function (Adapter) {
    Adapter["KujiraWebview"] = "kujira-webview";
    Adapter["KujiraWalletConnect"] = "kujira-walletconnect";
    Adapter["Keplr"] = "keplr";
})(Adapter || (Adapter = {}));
const Context = createContext({
    adapter: Adapter.KujiraWalletConnect,
    setAdapter: () => { },
    account: null,
    getBalance: () => __awaiter(void 0, void 0, void 0, function* () { return BigNumber.from(0); }),
    balance: () => BigNumber.from(0),
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
export const WalletContext = ({ children }) => {
    const kujiraWebView = useKujiraWebView();
    const [adapter, setAdapter] = useState(kujiraWebView ? Adapter.KujiraWebview : Adapter.Keplr);
    const [feeDenom, setFeeDenom] = useLocalStorage("feeDenom", "ukuji");
    const [balances, setBalances] = useState({});
    const [kujiraBalances, setKujiraBalances] = useState([]);
    useEffect(() => {
        document.onkeyup = function (e) {
            if (e.ctrlKey && e.shiftKey && e.key == "W") {
                setAdapter(adapter === Adapter.KujiraWalletConnect
                    ? Adapter.Keplr
                    : Adapter.KujiraWalletConnect);
            }
        };
    }, [adapter]);
    const [{ network, chainInfo, query }] = useNetwork();
    const [link, setLink] = useState("");
    const [modal, setModal] = useState(false);
    const [kujiraAccount, setKujiraAccount] = useState(null);
    const [delegations, setDelegations] = useState(null);
    const kujiraWalletConnect = useKujiraWalletConnect({
        feeDenom,
        setLink,
        setModal,
    });
    const keplr = useKeplr({ feeDenom });
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
                    ? Object.assign(Object.assign({}, prev), { [b.denom]: BigNumber.from(b.amount) }) : prev);
            });
        });
    };
    useEffect(() => {
        setKujiraBalances([]);
        setBalances({});
        refreshBalances();
    }, [account, query]);
    useEffect(() => {
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
    useEffect(() => {
        refreshDelegations();
    }, [account, query]);
    const balance = (denom) => balances[denom.reference] || BigNumber.from(0);
    const fetchBalance = (denom) => __awaiter(void 0, void 0, void 0, function* () {
        if (!account)
            return BigNumber.from(0);
        if (!query)
            return BigNumber.from(0);
        return query.bank
            .balance((account === null || account === void 0 ? void 0 : account.address) || "", denom.reference)
            .then((resp) => BigNumber.from((resp === null || resp === void 0 ? void 0 : resp.amount) || 0))
            .then((balance) => {
            setBalances((prev) => (Object.assign(Object.assign({}, prev), { [denom.reference]: balance })));
            return balance;
        });
    });
    const getBalance = (denom, refresh = true) => __awaiter(void 0, void 0, void 0, function* () {
        return balances[denom.reference] || refresh
            ? fetchBalance(denom)
            : BigNumber.from(0);
    });
    const signAndBroadcast = (msgs) => __awaiter(void 0, void 0, void 0, function* () {
        if (!account)
            throw new Error("No Wallet Connected");
        const res = yield connector.signAndBroadcast(msgs);
        assertIsDeliverTxSuccess(res);
        return res;
    });
    return (_jsxs(Context.Provider, Object.assign({ value: {
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
        } }, { children: [children, _jsx(Modal, Object.assign({ show: modal, close: () => setModal(false) }, { children: _jsx(QRCode, { value: link }) }))] }), network + (account === null || account === void 0 ? void 0 : account.address)));
};
export function useWallet() {
    return useContext(Context);
}
