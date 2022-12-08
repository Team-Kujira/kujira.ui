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
exports.useKeplr = void 0;
const react_1 = require("react");
const stargate_1 = require("@cosmjs/stargate");
const math_1 = require("@cosmjs/math");
const kujira_js_1 = require("kujira.js");
const network_1 = require("../network");
const useKeplr = ({ feeDenom }) => {
    const [{ network, chainInfo }, setNetwork] = (0, network_1.useNetwork)();
    const [accounts, setAccounts] = (0, react_1.useState)(null);
    const keplr = window.keplr;
    const connect = (network = kujira_js_1.MAINNET) => {
        if (!keplr)
            return;
        const config = kujira_js_1.CHAIN_INFO[network];
        keplr
            .experimentalSuggestChain(Object.assign(Object.assign({}, config), { 
            // Keplr is bullshti and defaults to the first of these provided as the fee denom
            feeCurrencies: config.feeCurrencies.filter((x) => x.coinMinimalDenom === feeDenom) }))
            .then(() => keplr.enable(network))
            .then(() => keplr.getOfflineSignerAuto(network))
            .then((signer) => signer.getAccounts())
            .then((as) => {
            document.cookie = "keplr=connected; path=/";
            setNetwork(network);
            setAccounts(as);
        });
    };
    (0, react_1.useEffect)(() => {
        const stored = document.cookie.includes("keplr=connected");
        if (stored && connect)
            connect(network);
    }, [keplr]);
    const account = accounts ? accounts[0] : null;
    (0, react_1.useEffect)(() => {
        window.addEventListener("keplr_keystorechange", () => {
            const keplr = window.keplr;
            if (!keplr)
                return;
            account &&
                keplr
                    .getOfflineSignerAuto(network)
                    .then((signer) => signer.getAccounts())
                    .then(setAccounts);
        });
    }, [account]);
    (0, react_1.useEffect)(() => {
        if (!account)
            return;
        const keplr = window.keplr;
        keplr === null || keplr === void 0 ? void 0 : keplr.experimentalSuggestChain(Object.assign(Object.assign({}, chainInfo), { feeCurrencies: chainInfo.feeCurrencies.filter((x) => x.coinMinimalDenom === feeDenom) })).then(() => keplr.enable(network));
    }, [account, network, chainInfo]);
    const signAndBroadcast = (msgs, batch) => __awaiter(void 0, void 0, void 0, function* () {
        if (!window.keplr || !account)
            throw new Error("No Wallet Connected");
        const signer = yield window.keplr.getOfflineSignerAuto(network);
        const gasPrice = new stargate_1.GasPrice(math_1.Decimal.fromUserInput("0.00125", 18), feeDenom);
        const client = yield stargate_1.SigningStargateClient.connectWithSigner(chainInfo.rpc, signer, {
            registry: kujira_js_1.registry,
            gasPrice,
            aminoTypes: (0, kujira_js_1.aminoTypes)("kujira"),
        });
        if (batch) {
            const chunks = msgs.reduce((agg, item, index) => {
                const chunkIndex = Math.floor(index / batch.size);
                if (!agg[chunkIndex])
                    agg[chunkIndex] = [];
                agg[chunkIndex].push(item);
                return agg;
            }, []);
            let remaining = chunks.length;
            batch.cb(chunks.length, remaining);
            let res;
            for (const chunk of chunks) {
                res = yield client.signAndBroadcast(account.address, chunk, 1.5);
                remaining -= 1;
                batch.cb(chunks.length, remaining);
            }
            // @ts-expect-error this is fine
            return res;
        }
        else {
            return yield client.signAndBroadcast(account.address, msgs, 1.5);
        }
    });
    return {
        account,
        connect,
        disconnect: () => {
            document.cookie = "keplr=disconnected;";
            setAccounts(null);
        },
        signAndBroadcast,
    };
};
exports.useKeplr = useKeplr;
