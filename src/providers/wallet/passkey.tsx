import {
  AccountData,
  EncodeObject,
  coins,
} from "@cosmjs/proto-signing";
import { DeliverTxResponse, GasPrice } from "@cosmjs/stargate";
import { Tendermint37Client } from "@cosmjs/tendermint-rpc";
import {
  ChainInfo,
  Window as KeplrWindow,
} from "@keplr-wallet/types";
import {
  AuthnClient,
  AuthnSigner,
  accountParser,
  registry,
} from "kujira.js";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Window extends KeplrWindow {}
}

export class Passkey {
  private constructor(
    public account: AccountData,
    public config: ChainInfo,
    private signer: AuthnSigner
  ) {}

  static connect = async (
    config: ChainInfo,
    signer: AuthnSigner
  ): Promise<Passkey> => {
    const [account] = await signer.getAccounts();

    // @ts-expect-error
    return new Passkey(account, config, signer);
  };

  public onChange = (fn: (k: Passkey) => void) => {};

  public disconnect = () => {};

  public signAndBroadcast = async (
    rpc: string,
    msgs: EncodeObject[]
    // batch?: {
    //   size: number;
    //   cb: (total: number, remaining: number) => void;
    // }
  ): Promise<DeliverTxResponse> => {
    const tmClient = await Tendermint37Client.connect(rpc);
    const client = await AuthnClient.createWithSigner(
      tmClient,
      this.signer,
      {
        registry,
        gasPrice: GasPrice.fromString("0.034ukuji"),
        accountParser,
      }
    );

    return await client.signAndBroadcast(this.account.address, msgs, {
      amount: coins(12500, "ukuji"),
      gas: "1000000",
    });
  };
}
