import { AccountData, EncodeObject } from "@cosmjs/proto-signing";
import { DeliverTxResponse } from "@cosmjs/stargate";
import WalletConnect from "@walletconnect/client";
import { MAINNET, registry } from "kujira.js";
import { useEffect, useMemo, useState } from "react";
import { useWindowSize } from "../../hooks/useWindowSize";

export type Sonar = {
  connect: null | ((chain?: string) => void);
  disconnect: () => void;
  account: AccountData | null;
  signAndBroadcast: (
    msgs: EncodeObject[]
  ) => Promise<DeliverTxResponse>;
};

export const useSonar = ({
  feeDenom,
  setModal,
  setLink,
}: {
  feeDenom: string;
  setModal: (b: boolean) => void;
  setLink: (b: string) => void;
}): Sonar => {
  const [accounts, setAccounts] = useState<
    null | readonly AccountData[]
  >(null);

  const connect = (network: string = MAINNET) => {
    connector.createSession();
  };

  const size = useWindowSize();

  const connector = useMemo(
    () =>
      new WalletConnect({
        bridge: "https://bridge.walletconnect.org", // Required
        qrcodeModal: {
          open(uri: string, cb: any) {
            if (size?.width && size?.width < 768) {
              window.location.assign(
                `kujira://ws?uri=${encodeURIComponent(uri)}`
              );
            } else {
              setLink(uri);
              setModal(true);
            }
          },
          close: () => {},
        },
      }),
    []
  );

  // Create a connector
  useEffect(() => {
    if (!connector) return;
    connector.session &&
      setAccounts(
        connector.session.accounts.map((address) => ({
          address,
          pubkey: new Uint8Array(),
          algo: "secp256k1",
        }))
      );

    // Subscribe to connection events
    connector.on("connect", (error, payload) => {
      if (error) throw error;

      setModal(false);
      setAccounts(
        payload.params[0].accounts.map((address: string) => ({
          address,
          pubkey: new Uint8Array(),
          algo: "secp256k1",
        }))
      );
    });

    connector.on("session_update", (error, payload) => {
      console.log({ error, payload });
      if (error) throw error;
    });

    connector.on("disconnect", (error, payload) => {
      if (error) throw error;
      setAccounts(null);
      // Delete connector
    });
  }, [connector]);

  const account = accounts && accounts[0];

  const signAndBroadcast = async (
    msgs: EncodeObject[]
  ): Promise<DeliverTxResponse> => {
    if (!account) throw new Error("No Wallet Connected");

    const x = await connector.sendCustomRequest({
      id: 0,
      jsonrpc: "2.0",
      method: "sign_tx",
      params: msgs
        .map((m) => registry.encodeAsAny(m))
        .map((x) => ({
          ...x,
          value: Buffer.from(x.value).toString("base64"),
        })),
    });

    return x;
  };

  return {
    account,
    connect,
    disconnect: () => {
      connector.killSession();
    },
    signAndBroadcast,
  };
};
