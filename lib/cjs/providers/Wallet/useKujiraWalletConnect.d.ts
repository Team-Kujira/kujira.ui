import { AccountData, EncodeObject } from "@cosmjs/proto-signing";
import { DeliverTxResponse } from "@cosmjs/stargate";
export declare type UseKujiraWallet = {
    connect: null | ((chain?: string) => void);
    disconnect: () => void;
    account: AccountData | null;
    signAndBroadcast: (msgs: EncodeObject[]) => Promise<DeliverTxResponse>;
};
export declare const useKujiraWalletConnect: ({ feeDenom, setModal, setLink, }: {
    feeDenom: string;
    setModal: (b: boolean) => void;
    setLink: (b: string) => void;
}) => UseKujiraWallet;
