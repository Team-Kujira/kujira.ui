import { AccountData, EncodeObject } from "@cosmjs/proto-signing";
import { Coin, DeliverTxResponse } from "@cosmjs/stargate";
import { ChainInfo } from "@keplr-wallet/types";
import { DelegationResponse } from "cosmjs-types/cosmos/staking/v1beta1/staking";
import { Any } from "cosmjs-types/google/protobuf/any";
import { BigNumber } from "ethers";
import { Denom, NETWORK } from "kujira.js";
import { FC, PropsWithChildren } from "react";
export declare enum Adapter {
    Sonar = "sonar",
    Keplr = "keplr",
    Station = "station",
    ReadOnly = "readOnly"
}
export type IWallet = {
    connect: null | ((adapter: Adapter, chain?: NETWORK) => void);
    disconnect: () => void;
    account: AccountData | null;
    kujiraAccount: Any | null;
    balances: Coin[];
    getBalance: (denom: Denom, refresh?: boolean) => Promise<BigNumber | null>;
    balance: (denom: Denom) => BigNumber;
    signAndBroadcast: (msgs: EncodeObject[], memo?: string) => Promise<DeliverTxResponse>;
    delegations: null | DelegationResponse[];
    refreshBalances: () => void;
    refreshDelegations: () => void;
    feeDenom: string;
    setFeeDenom: (denom: string) => void;
    chainInfo: ChainInfo;
};
export declare const WalletContext: FC<PropsWithChildren<{}>>;
export declare function useWallet(): IWallet;
