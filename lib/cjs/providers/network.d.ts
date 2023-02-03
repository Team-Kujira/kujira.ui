import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { ChainInfo } from "@keplr-wallet/types";
import { KujiraQueryClient, NETWORK } from "kujira.js";
import { PropsWithChildren } from "react";
export type NetworkContext = {
    network: NETWORK;
    setNetwork: (n: NETWORK) => void;
    tmClient: Tendermint34Client | null;
    query: KujiraQueryClient | null;
    rpc: string;
    rpcs: {
        endpoint: string;
        latency: number;
    }[];
    setRpc: (val: string) => void;
    preferred: string | null;
    unlock: () => void;
    lock: () => void;
};
export declare const NetworkContext: React.FC<PropsWithChildren<{
    onError?: (err: any) => void;
}>>;
export declare const useNetwork: () => [{
    network: NETWORK;
    chainInfo: ChainInfo;
    tmClient: Tendermint34Client | null;
    query: KujiraQueryClient | null;
    rpc: string;
    rpcs: {
        endpoint: string;
        latency: number;
    }[];
    setRpc: (val: string) => void;
    preferred: null | string;
    unlock: () => void;
    lock: () => void;
}, (n: NETWORK) => void];
