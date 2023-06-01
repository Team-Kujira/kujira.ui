import { AccountData, EncodeObject } from "@cosmjs/proto-signing";
import { DeliverTxResponse } from "@cosmjs/stargate";
import { msg } from "kujira.js";
import { Keplr } from "./keplr";
import { Sonar } from "./sonar";

type Signer = Keplr | Sonar;

const toCosmosMsg = (encodeObject: EncodeObject): object => ({});

export class CW3Wallet {
  private constructor(
    public account: AccountData,
    public signer: Signer
  ) {}

  static connect = async (
    contract: string,
    signer: Signer
  ): Promise<CW3Wallet> => {
    return new CW3Wallet(
      {
        address: contract,
        algo: "secp256k1",
        pubkey: new Uint8Array(),
      },
      signer
    );
  };

  public onChange = (fn: (k: CW3Wallet | null) => void) => {};

  public disconnect = () => {};

  signAndBroadcast = async (
    rpc: string,
    encodeObjects: EncodeObject[],
    gas: string,
    memo?: string,
    title?: string,
    description?: string
  ): Promise<DeliverTxResponse> => {
    const msgs = [
      msg.wasm.msgExecuteContract({
        sender: this.signer.account.address,
        contract: this.account.address,
        msg: Buffer.from(
          JSON.stringify({
            propose: {
              title,
              description,
              msgs: encodeObjects.map(toCosmosMsg),
            },
          })
        ),
        funds: [],
      }),
    ];
    return this.signer.signAndBroadcast(rpc, msgs, gas, memo);
  };
}
