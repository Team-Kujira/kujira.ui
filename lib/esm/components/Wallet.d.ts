/// <reference types="react" />
import { IWallet } from "../providers/wallet";
export declare const NetworkWarning: () => JSX.Element;
export declare function Wallet({ adapter, }: {
    adapter?: () => Pick<IWallet, "balance" | "account" | "connect" | "disconnect" | "balances" | "chainInfo">;
}): JSX.Element;
export declare const KujiUnconnected: () => JSX.Element;
export declare const KujiConnected: () => JSX.Element;
