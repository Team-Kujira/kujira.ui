/// <reference types="react" />
import { ChainInfo } from "@keplr-wallet/types";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { KujiraQueryClient, NETWORK } from "kujira.js";
export declare type NetworkContext = {
    network: NETWORK;
    setNetwork: (n: NETWORK) => void;
    tmClient: Tendermint34Client | null;
    query: KujiraQueryClient | null;
};
export declare const NetworkContext: React.FC;
export declare const useNetwork: () => [{
    network: NETWORK;
    chainInfo: ChainInfo;
    tmClient: Tendermint34Client | null;
    query: KujiraQueryClient | null;
}, (n: NETWORK) => void];
