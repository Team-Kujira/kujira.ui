import { Coin } from "@cosmjs/stargate";
import { Denom } from "kujira.js";

export const coinSort = (a: Coin, b: Coin): number =>
  parseInt(b.amount || "") /
    10 ** Denom.from(b.denom || "").decimals -
  parseInt(a.amount || "") / 10 ** Denom.from(a.denom || "").decimals;
export const appLink = (app: string): string =>
  window.location.host.replace(/^[a-z]+\./, app ? `${app}.` : "");
