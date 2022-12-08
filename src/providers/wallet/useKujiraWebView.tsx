import { AccountData, EncodeObject } from "@cosmjs/proto-signing";
import { DeliverTxResponse } from "@cosmjs/stargate";
import { registry } from "kujira.js";
import { useMemo } from "react";

interface WebViewWindow {
  onSignAndBroadcastSuccess?: (res: string) => void;
  onSignAndBroadcastError?: (err: string) => void;
  ReactNativeWebView: {
    postMessage: typeof window.postMessage;
  };
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Window extends WebViewWindow {}
}

export const useKujiraWebView = (): null | {
  account: AccountData;
  connect: () => void;
  disconnect: () => void;
  signAndBroadcast: (msgs: EncodeObject[]) => Promise<DeliverTxResponse>;
} => {
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const address = useMemo(() => params.get("walletAddress"), [params]);

  const signAndBroadcast = async (
    msgs: EncodeObject[]
  ): Promise<DeliverTxResponse> => {
    if (!account) throw new Error("No Wallet Connected");
    return new Promise((resolve, reject) => {
      window.onSignAndBroadcastSuccess = (result: string) => {
        console.log(result);
        delete window.onSignAndBroadcastError;
        delete window.onSignAndBroadcastSuccess;
        const response = JSON.parse(result) as DeliverTxResponse;
        console.log(response);
        resolve(response);
      };

      window.onSignAndBroadcastError = (error) => {
        console.log(error);
        delete window.onSignAndBroadcastError;
        delete window.onSignAndBroadcastSuccess;
        reject(error);
      };

      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          id: 0,
          jsonrpc: "2.0",
          method: "sign_tx",
          params: msgs
            .map((m) => registry.encodeAsAny(m))
            .map((x) => ({
              ...x,
              value: Buffer.from(x.value).toString("base64"),
            })),
        })
      );
    });
  };

  const account: AccountData | null = useMemo(
    () =>
      address
        ? {
            address,
            pubkey: new Uint8Array(),
            algo: "secp256k1",
          }
        : null,
    [address]
  );

  return account
    ? {
        account,
        connect: () => {},
        disconnect: () => {},
        signAndBroadcast,
      }
    : null;
};
