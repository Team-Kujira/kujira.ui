import { NETWORK } from "kujira.js";
import { Wallets } from "../providers/Wallet";
export declare const NetworkSelect: ({ onChange, }: {
    onChange: (network: NETWORK) => void;
}) => JSX.Element;
export declare const NetworkWarning: () => JSX.Element;
export declare function Wallet({ adapter, }: {
    adapter?: () => Pick<Wallets, "balance" | "account" | "connect" | "disconnect" | "balances" | "chainInfo">;
}): JSX.Element;
export declare const KujiUnconnected: () => JSX.Element;
export declare const KujiConnected: () => JSX.Element;
export declare const Network: ({ onClick }: {
    onClick: () => void;
}) => JSX.Element;
