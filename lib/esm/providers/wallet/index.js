var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { assertIsDeliverTxSuccess, } from "@cosmjs/stargate";
import { ConnectType, getChainOptions, WalletController, } from "@terra-money/wallet-controller";
import { BigNumber } from "ethers";
import { CHAIN_INFO } from "kujira.js";
import { createContext, useContext, useEffect, useState, } from "react";
import { toast } from "react-hot-toast";
import QRCode from "react-qr-code";
import Input from "../../components/Input";
import { Modal } from "../../components/Modal";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useWindowSize } from "../../hooks/useWindowSize";
import { IconSonar } from "../../icons";
import { Keplr, ReadOnly, Sonar, Station } from "../../wallets";
import { useNetwork } from "../network";
export var Adapter;
(function (Adapter) {
    Adapter["Sonar"] = "sonar";
    Adapter["Keplr"] = "keplr";
    Adapter["Station"] = "station";
    Adapter["ReadOnly"] = "readOnly";
})(Adapter || (Adapter = {}));
const Context = createContext({
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
export const WalletContext = ({ children, }) => {
    const [address, setAddress] = useLocalStorage("address", "");
    const [showAddress, setShowAddress] = useState(false);
    const [stored, setStored] = useLocalStorage("wallet", "");
    const [wallet, setWallet] = useState(null);
    const [feeDenom, setFeeDenom] = useLocalStorage("feeDenom", "ukuji");
    const [balances, setBalances] = useState({});
    const [stationController, setStationController] = useState(null);
    const [kujiraBalances, setKujiraBalances] = useState([]);
    const [{ network, chainInfo, query, rpc }] = useNetwork();
    const [link, setLink] = useState("");
    const [modal, setModal] = useState(false);
    const [kujiraAccount, setKujiraAccount] = useState(null);
    const [delegations, setDelegations] = useState(null);
    useEffect(() => {
        getChainOptions().then((opts) => setStationController(new WalletController(opts)));
    }, []);
    useEffect(() => {
        if (!wallet && stored === Adapter.Station) {
            stationController === null || stationController === void 0 ? void 0 : stationController.availableConnections().subscribe((next) => {
                // https://github.com/terra-money/wallet-provider/blob/main/packages/src/%40terra-money/wallet-controller/controller.ts#L247-L259
                // The extension isn't actually available when this is called
                next.find((x) => x.type === ConnectType.EXTENSION) &&
                    setTimeout(() => {
                        connect(Adapter.Station);
                    }, 10);
            });
        }
    }, [stationController]);
    useEffect(() => {
        if (!wallet && stored === Adapter.ReadOnly && address) {
            ReadOnly.connect(address).then(setWallet);
            return;
        }
        stored && connect(stored, network, true);
    }, []);
    useEffect(() => {
        wallet && connect(stored, network);
    }, [network]);
    const refreshBalances = () => {
        if (!wallet)
            return;
        query === null || query === void 0 ? void 0 : query.bank.allBalances(wallet.account.address).then((x) => {
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
    }, [wallet, query]);
    useEffect(() => {
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
    useEffect(() => {
        refreshDelegations();
    }, [wallet, query]);
    const balance = (denom) => balances[denom.reference] || BigNumber.from(0);
    const fetchBalance = (denom) => __awaiter(void 0, void 0, void 0, function* () {
        if (!wallet)
            return BigNumber.from(0);
        if (!query)
            return BigNumber.from(0);
        return query.bank
            .balance(wallet.account.address, denom.reference)
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
    const signAndBroadcast = (msgs, memo) => __awaiter(void 0, void 0, void 0, function* () {
        if (!wallet)
            throw new Error("No Wallet Connected");
        const res = yield wallet.signAndBroadcast(msgs, feeDenom, memo);
        assertIsDeliverTxSuccess(res);
        return res;
    });
    const size = useWindowSize();
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
        const chainInfo = Object.assign({}, CHAIN_INFO[chain || network]);
        switch (adapter) {
            case Adapter.Keplr:
                Keplr.connect(Object.assign(Object.assign({}, chainInfo), { rpc }))
                    .then((x) => {
                    setStored(adapter);
                    setWallet(x);
                })
                    .catch((err) => {
                    toast.error(err.message);
                });
                break;
            case Adapter.Sonar:
                Sonar.connect(network, {
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
                    Station.connect(chainInfo, {
                        controller: stationController,
                    })
                        .then((x) => {
                        setStored(adapter);
                        setWallet(x);
                    })
                        .catch((err) => {
                        toast.error(err.message === "extension instance is not created!"
                            ? "Station extension not available"
                            : err.message);
                    });
                break;
            case Adapter.ReadOnly:
                setShowAddress(true);
        }
    };
    useEffect(() => {
        wallet && wallet.onChange(setWallet);
    }, [wallet]);
    const disconnect = () => {
        setStored("");
        setWallet(null);
        wallet === null || wallet === void 0 ? void 0 : wallet.disconnect();
    };
    return (_jsxs(Context.Provider, Object.assign({ value: {
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
        } }, { children: [children, _jsx(Modal, Object.assign({ show: modal, close: () => setModal(false), className: "modal--auto" }, { children: _jsxs("div", Object.assign({ className: "md-flex ai-c" }, { children: [_jsx(QRCode, { value: link, bgColor: "#607d8b", fgColor: "transparent", className: "no-shrink" }), _jsxs("div", Object.assign({ className: "ml-2" }, { children: [_jsx(IconSonar, { style: {
                                        display: "block",
                                        height: "3rem",
                                        marginBottom: "1.5rem",
                                    } }), _jsx("h3", { children: "Scan this code using the Sonar Mobile App." })] }))] })) })), _jsx(Modal, Object.assign({ show: showAddress, close: () => setShowAddress(false), confirm: () => ReadOnly.connect(address).then((w) => {
                    setStored(Adapter.ReadOnly);
                    setWallet(w);
                    setShowAddress(false);
                }), title: "Read Only Connection" }, { children: _jsxs(_Fragment, { children: [_jsxs("p", Object.assign({ className: "fs-14 lh-16 color-white mb-2" }, { children: ["Enter a Kujira address to see a ", _jsx("strong", { children: "read only" }), " ", "version of the app, as if connected with this address."] })), _jsx(Input, { placeholder: "kujira1...", value: address, onChange: (e) => setAddress(e.currentTarget.value) })] }) }))] }), network + (wallet === null || wallet === void 0 ? void 0 : wallet.account.address)));
};
export function useWallet() {
    return useContext(Context);
}
