import { AccountData, EncodeObject } from "@cosmjs/proto-signing";
import { DeliverTxResponse } from "@cosmjs/stargate";
interface WebViewWindow {
    onSignAndBroadcastSuccess?: (res: string) => void;
    onSignAndBroadcastError?: (err: string) => void;
    ReactNativeWebView: {
        postMessage: typeof window.postMessage;
    };
}
declare global {
    interface Window extends WebViewWindow {
    }
}
export declare const useKujiraWebView: () => {
    account: AccountData;
    connect: () => void;
    disconnect: () => void;
    signAndBroadcast: (msgs: EncodeObject[]) => Promise<DeliverTxResponse>;
} | null;
export {};
