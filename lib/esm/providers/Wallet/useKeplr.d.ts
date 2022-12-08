import { Window as KeplrWindow } from "@keplr-wallet/types";
import { AccountData, EncodeObject } from "@cosmjs/proto-signing";
import { DeliverTxResponse } from "@cosmjs/stargate";
declare global {
    interface Window extends KeplrWindow {
    }
}
export declare type UseKeplr = {
    connect: null | ((chain?: string) => void);
    disconnect: () => void;
    account: AccountData | null;
    signAndBroadcast: (msgs: EncodeObject[]) => Promise<DeliverTxResponse>;
};
export declare const useKeplr: ({ feeDenom }: {
    feeDenom: string;
}) => UseKeplr;
