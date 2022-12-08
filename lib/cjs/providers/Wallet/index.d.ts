import { ChainInfo } from "@keplr-wallet/types";
import { Any } from "cosmjs-types/google/protobuf/any";
import { AccountData, EncodeObject } from "@cosmjs/proto-signing";
import { DeliverTxResponse, Coin } from "@cosmjs/stargate";
import { BigNumber } from "ethers";
import { DelegationResponse } from "cosmjs-types/cosmos/staking/v1beta1/staking";
import { Denom } from "kujira.js";
export declare enum Adapter {
    KujiraWebview = "kujira-webview",
    KujiraWalletConnect = "kujira-walletconnect",
    Keplr = "keplr"
}
export declare type Wallets = {
    adapter: Adapter;
    setAdapter: (a: Adapter) => void;
    connect: null | ((chain?: string) => void);
    disconnect: () => void;
    account: AccountData | null;
    kujiraAccount: Any | null;
    balances: Coin[];
    getBalance: (denom: Denom, refresh?: boolean) => Promise<BigNumber | null>;
    balance: (denom: Denom) => BigNumber;
    signAndBroadcast: (msgs: EncodeObject[]) => Promise<DeliverTxResponse>;
    delegations: null | DelegationResponse[];
    refreshBalances: () => void;
    refreshDelegations: () => void;
    feeDenom: string;
    setFeeDenom: (denom: string) => void;
    chainInfo: ChainInfo;
};
export declare function useWallet(): Wallets;
