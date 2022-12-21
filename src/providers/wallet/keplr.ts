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

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Window extends KeplrWindow {}
}

type Options = { feeDenom: string };

export class Keplr {
  private constructor(
    public account: AccountData,
    private network: NETWORK,
    private options: Options
  ) {}

  static connect = (
    network: NETWORK = MAINNET,
    opts: { feeDenom: string }
  ): Promise<Keplr> => {
    const keplr = window.keplr;

    if (!keplr) throw new Error("Keplr Not Detected");

    const config = CHAIN_INFO[network];
    return keplr
      .experimentalSuggestChain({
        ...config,
        // Keplr is bullshti and defaults to the first of these provided as the fee denom
        feeCurrencies: config.feeCurrencies.filter(
          (x) => x.coinMinimalDenom === opts.feeDenom
        ),
      })
      .then(() => keplr.enable(network))
      .then(() => keplr.getOfflineSignerAuto(network))
      .then((signer) => signer.getAccounts())
      .then((as) => {
        if (as.length) {
          return new Keplr(as[0], network, opts);
        } else {
          throw new Error("No Accounts");
        }
      });
  };

  public onChange = (fn: (k: Keplr) => void) => {
    window.addEventListener("keplr_keystorechange", () => {
      const keplr = window.keplr;
      if (!keplr) return;

      keplr
        .getOfflineSignerAuto(this.network)
        .then((signer) => signer.getAccounts())
        .then((as) => {
          if (as.length) {
            this.account = as[0];
            fn(this);
          }
        });
    });
  };

  public disconnect = () => {};

  public signAndBroadcast = async (
    msgs: EncodeObject[],
    batch?: {
      size: number;
      cb: (total: number, remaining: number) => void;
    }
  ): Promise<DeliverTxResponse> => {
    if (!window.keplr) throw new Error("No Wallet Connected");

    const signer = await window.keplr.getOfflineSignerAuto(
      this.network
    );
    const gasPrice = new GasPrice(
      Decimal.fromUserInput("0.00125", 18),
      this.options.feeDenom
    );

    const client = await SigningStargateClient.connectWithSigner(
      CHAIN_INFO[this.network].rpc,
      signer,
      {
        registry,
        gasPrice,
        aminoTypes: aminoTypes("kujira"),
      }
    );

    // if (batch) {
    //   const chunks = msgs.reduce((agg, item, index) => {
    //     const chunkIndex = Math.floor(index / batch.size);
    //     if (!agg[chunkIndex]) agg[chunkIndex] = [];
    //     agg[chunkIndex].push(item);
    //     return agg;
    //   }, [] as EncodeObject[][]);
    //   let remaining = chunks.length;
    //   batch.cb(chunks.length, remaining);

    //   let res: DeliverTxResponse;
    //   for (const chunk of chunks) {
    //     res = await client.signAndBroadcast(
    //       this.account.address,
    //       chunk,
    //       1.5
    //     );
    //     remaining -= 1;
    //     batch.cb(chunks.length, remaining);
    //   }
    //   // @ts-expect-error this is fine
    //   return res;
    // } else {
    return await client.signAndBroadcast(
      this.account.address,
      msgs,
      1.5
    );
    // }
  };
}
