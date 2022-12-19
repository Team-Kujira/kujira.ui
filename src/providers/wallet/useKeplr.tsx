import { Decimal } from "@cosmjs/math";
import { AccountData, EncodeObject } from "@cosmjs/proto-signing";
import {
  DeliverTxResponse,
  GasPrice,
  SigningStargateClient,
} from "@cosmjs/stargate";
import { Window as KeplrWindow } from "@keplr-wallet/types";
import {
  aminoTypes,
  CHAIN_INFO,
  MAINNET,
  NETWORK,
  registry,
} from "kujira.js";
import { useEffect, useState } from "react";
import { useNetwork } from "../network";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Window extends KeplrWindow {}
}

export type UseKeplr = {
  connect: null | ((chain?: string) => void);
  disconnect: () => void;
  account: AccountData | null;
  signAndBroadcast: (
    msgs: EncodeObject[]
  ) => Promise<DeliverTxResponse>;
};

export const useKeplr = ({
  feeDenom,
}: {
  feeDenom: string;
}): UseKeplr => {
  const [{ network, chainInfo }, setNetwork] = useNetwork();

  const [accounts, setAccounts] = useState<
    null | readonly AccountData[]
  >(null);
  const keplr = window.keplr;

  const connect = (network: string = MAINNET) => {
    if (!keplr) return;

    const config = CHAIN_INFO[network as NETWORK];
    keplr
      .experimentalSuggestChain({
        ...config,
        // Keplr is bullshti and defaults to the first of these provided as the fee denom
        feeCurrencies: config.feeCurrencies.filter(
          (x) => x.coinMinimalDenom === feeDenom
        ),
      })
      .then(() => keplr.enable(network))
      .then(() => keplr.getOfflineSignerAuto(network))
      .then((signer) => signer.getAccounts())
      .then((as) => {
        document.cookie = "keplr=connected; path=/";
        setNetwork(network as NETWORK);
        setAccounts(as);
      });
  };

  useEffect(() => {
    const stored = document.cookie.includes("keplr=connected");

    if (stored && connect) connect(network);
  }, [keplr]);

  const account = accounts ? accounts[0] : null;

  useEffect(() => {
    window.addEventListener("keplr_keystorechange", () => {
      const keplr = window.keplr;
      if (!keplr) return;

      account &&
        keplr
          .getOfflineSignerAuto(network)
          .then((signer) => signer.getAccounts())
          .then(setAccounts);
    });
  }, [account]);

  useEffect(() => {
    if (!account) return;
    const keplr = window.keplr;
    keplr
      ?.experimentalSuggestChain({
        ...chainInfo,
        feeCurrencies: chainInfo.feeCurrencies.filter(
          (x) => x.coinMinimalDenom === feeDenom
        ),
      })
      .then(() => keplr.enable(network));
  }, [account, network, chainInfo]);

  const signAndBroadcast = async (
    msgs: EncodeObject[],
    batch?: {
      size: number;
      cb: (total: number, remaining: number) => void;
    }
  ): Promise<DeliverTxResponse> => {
    if (!window.keplr || !account)
      throw new Error("No Wallet Connected");

    const signer = await window.keplr.getOfflineSignerAuto(network);
    const gasPrice = new GasPrice(
      Decimal.fromUserInput("0.00125", 18),
      feeDenom
    );

    const client = await SigningStargateClient.connectWithSigner(
      chainInfo.rpc,
      signer,
      {
        registry,
        gasPrice,
        aminoTypes: aminoTypes("kujira"),
      }
    );

    if (batch) {
      const chunks = msgs.reduce((agg, item, index) => {
        const chunkIndex = Math.floor(index / batch.size);
        if (!agg[chunkIndex]) agg[chunkIndex] = [];
        agg[chunkIndex].push(item);
        return agg;
      }, [] as EncodeObject[][]);
      let remaining = chunks.length;
      batch.cb(chunks.length, remaining);

      let res: DeliverTxResponse;
      for (const chunk of chunks) {
        res = await client.signAndBroadcast(
          account.address,
          chunk,
          1.5
        );
        remaining -= 1;
        batch.cb(chunks.length, remaining);
      }
      // @ts-expect-error this is fine
      return res;
    } else {
      return await client.signAndBroadcast(
        account.address,
        msgs,
        1.5
      );
    }
  };

  return {
    account,
    connect,
    disconnect: () => {
      document.cookie = "keplr=disconnected;";
      setAccounts(null);
    },
    signAndBroadcast,
  };
};
