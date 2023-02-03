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
exports.useWallet = exports.WalletContext = exports.Adapter = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const stargate_1 = require("@cosmjs/stargate");
const wallet_controller_1 = require("@terra-money/wallet-controller");
const ethers_1 = require("ethers");
const kujira_js_1 = require("kujira.js");
const react_1 = require("react");
const react_hot_toast_1 = require("react-hot-toast");
const react_qr_code_1 = __importDefault(require("react-qr-code"));
const Input_1 = __importDefault(require("../../components/Input"));
const Modal_1 = require("../../components/Modal");
const useLocalStorage_1 = require("../../hooks/useLocalStorage");
const useWindowSize_1 = require("../../hooks/useWindowSize");
const icons_1 = require("../../icons");
const wallets_1 = require("../../wallets");
const network_1 = require("../network");
var Adapter;
(function (Adapter) {
    Adapter["Sonar"] = "sonar";
    Adapter["Keplr"] = "keplr";
    Adapter["Station"] = "station";
    Adapter["ReadOnly"] = "readOnly";
})(Adapter = exports.Adapter || (exports.Adapter = {}));
const Context = (0, react_1.createContext)({
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
const WalletContext = ({ children, }) => {
    const [address, setAddress] = (0, useLocalStorage_1.useLocalStorage)("address", "");
    const [showAddress, setShowAddress] = (0, react_1.useState)(false);
    const [stored, setStored] = (0, useLocalStorage_1.useLocalStorage)("wallet", "");
    const [wallet, setWallet] = (0, react_1.useState)(null);
    const [feeDenom, setFeeDenom] = (0, useLocalStorage_1.useLocalStorage)("feeDenom", "ukuji");
    const [balances, setBalances] = (0, react_1.useState)({});
    const [stationController, setStationController] = (0, react_1.useState)(null);
    const [kujiraBalances, setKujiraBalances] = (0, react_1.useState)([]);
    const [{ network, chainInfo, query, rpc }] = (0, network_1.useNetwork)();
    const [link, setLink] = (0, react_1.useState)("");
    const [modal, setModal] = (0, react_1.useState)(false);
    const [kujiraAccount, setKujiraAccount] = (0, react_1.useState)(null);
    const [delegations, setDelegations] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        (0, wallet_controller_1.getChainOptions)().then((opts) => setStationController(new wallet_controller_1.WalletController(opts)));
    }, []);
    (0, react_1.useEffect)(() => {
        if (!wallet && stored === Adapter.Station) {
            stationController === null || stationController === void 0 ? void 0 : stationController.availableConnections().subscribe((next) => {
                // https://github.com/terra-money/wallet-provider/blob/main/packages/src/%40terra-money/wallet-controller/controller.ts#L247-L259
                // The extension isn't actually available when this is called
                next.find((x) => x.type === wallet_controller_1.ConnectType.EXTENSION) &&
                    setTimeout(() => {
                        connect(Adapter.Station);
                    }, 10);
            });
        }
    }, [stationController]);
    (0, react_1.useEffect)(() => {
        if (!wallet && stored === Adapter.ReadOnly && address) {
            wallets_1.ReadOnly.connect(address).then(setWallet);
            return;
        }
        stored && connect(stored, network, true);
    }, []);
    (0, react_1.useEffect)(() => {
        wallet && connect(stored, network);
    }, [network]);
    const refreshBalances = () => {
        if (!wallet)
            return;
        query === null || query === void 0 ? void 0 : query.bank.allBalances(wallet.account.address).then((x) => {
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
    }, [wallet, query]);
    (0, react_1.useEffect)(() => {
        if (!wallet)
            return;
        query === null || query === void 0 ? void 0 : query.auth.account(wallet.account.address).then((account) => account && setKujiraAccount(account));
    }, [wallet, query]);
    const refreshDelegations = () => {
        if (!wallet)
            return;
        setDelegations(null);
        query === null || query === void 0 ? void 0 : query.staking.delegatorDelegations(wallet.account.address).then(({ delegationResponses }) => delegationResponses && setDelegations(delegationResponses));
    };
    (0, react_1.useEffect)(() => {
        refreshDelegations();
    }, [wallet, query]);
    const balance = (denom) => balances[denom.reference] || ethers_1.BigNumber.from(0);
    const fetchBalance = (denom) => __awaiter(void 0, void 0, void 0, function* () {
        if (!wallet)
            return ethers_1.BigNumber.from(0);
        if (!query)
            return ethers_1.BigNumber.from(0);
        return query.bank
            .balance(wallet.account.address, denom.reference)
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
    const signAndBroadcast = (msgs, memo) => __awaiter(void 0, void 0, void 0, function* () {
        if (!wallet)
            throw new Error("No Wallet Connected");
        const res = yield wallet.signAndBroadcast(msgs, feeDenom, memo);
        (0, stargate_1.assertIsDeliverTxSuccess)(res);
        return res;
    });
    const size = (0, useWindowSize_1.useWindowSize)();
    const sonarRequest = (uri) => {
        if ((size === null || size === void 0 ? void 0 : size.width) && (size === null || size === void 0 ? void 0 : size.width) < 768) {
            window.location.assign(`kujira://ws?uri=${encodeURIComponent(uri)}`);
        }
        else {
            setLink(uri);
            setModal(true);
        }
    };
    const connect = (adapter, chain, auto) => {
        const chainInfo = Object.assign({}, kujira_js_1.CHAIN_INFO[chain || network]);
        switch (adapter) {
            case Adapter.Keplr:
                wallets_1.Keplr.connect(Object.assign(Object.assign({}, chainInfo), { rpc }))
                    .then((x) => {
                    setStored(adapter);
                    setWallet(x);
                })
                    .catch((err) => {
                    react_hot_toast_1.toast.error(err.message);
                });
                break;
            case Adapter.Sonar:
                wallets_1.Sonar.connect(network, {
                    request: sonarRequest,
                    auto: !!auto,
                }).then((x) => {
                    setModal(false);
                    setStored(adapter);
                    setWallet(x);
                });
                break;
            case Adapter.Station:
                stationController &&
                    wallets_1.Station.connect(chainInfo, {
                        controller: stationController,
                    })
                        .then((x) => {
                        setStored(adapter);
                        setWallet(x);
                    })
                        .catch((err) => {
                        react_hot_toast_1.toast.error(err.message === "extension instance is not created!"
                            ? "Station extension not available"
                            : err.message);
                    });
                break;
            case Adapter.ReadOnly:
                setShowAddress(true);
        }
    };
    (0, react_1.useEffect)(() => {
        wallet && wallet.onChange(setWallet);
    }, [wallet]);
    const disconnect = () => {
        setStored("");
        setWallet(null);
        wallet === null || wallet === void 0 ? void 0 : wallet.disconnect();
    };
    return ((0, jsx_runtime_1.jsxs)(Context.Provider, Object.assign({ value: {
            account: (wallet === null || wallet === void 0 ? void 0 : wallet.account) || null,
            delegations,
            connect,
            disconnect,
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
        } }, { children: [children, (0, jsx_runtime_1.jsx)(Modal_1.Modal, Object.assign({ show: modal, close: () => setModal(false), className: "modal--auto" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "md-flex ai-c" }, { children: [(0, jsx_runtime_1.jsx)(react_qr_code_1.default, { value: link, bgColor: "#607d8b", fgColor: "transparent", className: "no-shrink" }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "ml-2" }, { children: [(0, jsx_runtime_1.jsx)(icons_1.IconSonar, { style: {
                                        display: "block",
                                        height: "3rem",
                                        marginBottom: "1.5rem",
                                    } }), (0, jsx_runtime_1.jsx)("h3", { children: "Scan this code using the Sonar Mobile App." })] }))] })) })), (0, jsx_runtime_1.jsx)(Modal_1.Modal, Object.assign({ show: showAddress, close: () => setShowAddress(false), confirm: () => wallets_1.ReadOnly.connect(address).then((w) => {
                    setStored(Adapter.ReadOnly);
                    setWallet(w);
                    setShowAddress(false);
                }), title: "Read Only Connection" }, { children: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("p", Object.assign({ className: "fs-14 lh-16 color-white mb-2" }, { children: ["Enter a Kujira address to see a ", (0, jsx_runtime_1.jsx)("strong", { children: "read only" }), " ", "version of the app, as if connected with this address."] })), (0, jsx_runtime_1.jsx)(Input_1.default, { placeholder: "kujira1...", value: address, onChange: (e) => setAddress(e.currentTarget.value) })] }) }))] }), network + (wallet === null || wallet === void 0 ? void 0 : wallet.account.address)));
};
exports.WalletContext = WalletContext;
function useWallet() {
    return (0, react_1.useContext)(Context);
}
exports.useWallet = useWallet;
