var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useEffect, useState } from "react";
import { SigningStargateClient, GasPrice, } from "@cosmjs/stargate";
import { Decimal } from "@cosmjs/math";
import { registry, aminoTypes, CHAIN_INFO, MAINNET } from "kujira.js";
import { useNetwork } from "../network";
export const useKeplr = ({ feeDenom }) => {
    const [{ network, chainInfo }, setNetwork] = useNetwork();
    const [accounts, setAccounts] = useState(null);
    const keplr = window.keplr;
    const connect = (network = MAINNET) => {
        if (!keplr)
            return;
        const config = CHAIN_INFO[network];
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
    useEffect(() => {
        const stored = document.cookie.includes("keplr=connected");
        if (stored && connect)
            connect(network);
    }, [keplr]);
    const account = accounts ? accounts[0] : null;
    useEffect(() => {
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
    useEffect(() => {
        if (!account)
            return;
        const keplr = window.keplr;
        keplr === null || keplr === void 0 ? void 0 : keplr.experimentalSuggestChain(Object.assign(Object.assign({}, chainInfo), { feeCurrencies: chainInfo.feeCurrencies.filter((x) => x.coinMinimalDenom === feeDenom) })).then(() => keplr.enable(network));
    }, [account, network, chainInfo]);
    const signAndBroadcast = (msgs, batch) => __awaiter(void 0, void 0, void 0, function* () {
        if (!window.keplr || !account)
            throw new Error("No Wallet Connected");
        const signer = yield window.keplr.getOfflineSignerAuto(network);
        const gasPrice = new GasPrice(Decimal.fromUserInput("0.00125", 18), feeDenom);
        const client = yield SigningStargateClient.connectWithSigner(chainInfo.rpc, signer, {
            registry,
            gasPrice,
            aminoTypes: aminoTypes("kujira"),
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
