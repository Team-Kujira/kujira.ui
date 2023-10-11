import {
  AccountData,
  Coin,
  EncodeObject,
} from "@cosmjs/proto-signing";
import { DeliverTxResponse } from "@cosmjs/stargate";
import { msg, registry } from "kujira.js";
import { Keplr } from "./keplr";
import { Leap } from "./leap";
import { LeapSnap } from "./leapSnap";
import { Sonar } from "./sonar";
import { Station } from "./station";
import { Xfi } from "./xfi";

const toCosmosMsg = (encodeObject: EncodeObject): object => {
  const any = registry.encodeAsAny(encodeObject);
  return {
    stargate: {
      type_url: any.typeUrl,
      value: Buffer.from(any.value).toString("base64"),
    },
  };
};

export class CW3Wallet {
  public account: AccountData;
  constructor(
    public contract: string,
    public wallet: Sonar | Keplr | Station | Leap | LeapSnap | Xfi
  ) {
    this.account = {
      address: contract,
      algo: "secp256k1",
      pubkey: new Uint8Array(),
    };
  }

  public onChange = (fn: (k: CW3Wallet | null) => void) => {};

  public disconnect = () => {};

  signAndBroadcast = async (
    rpc: string,
    encodeObjects: EncodeObject[],
    gas: string,
    memo?: string,
    title?: string,
    description?: string,
    deposit?: Coin
  ): Promise<DeliverTxResponse> => {
    console.log(encodeObjects);

    const proposal = {
      propose: {
        title,
        description,
        msgs: encodeObjects.map(toCosmosMsg),
      },
    };

    const msgs = [
      msg.wasm.msgExecuteContract({
        sender: this.wallet.account.address,
        contract: this.contract,
        msg: Buffer.from(JSON.stringify(proposal)),
        funds: deposit ? [deposit] : [],
      }),
    ];
    console.log(msgs);

    return this.wallet.signAndBroadcast(rpc, msgs, gas, memo);
  };
}
