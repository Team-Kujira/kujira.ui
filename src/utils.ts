import { Coin } from "@cosmjs/stargate";
import { Denom } from "kujira.js";

export const coinSort = (a: Coin, b: Coin): number =>
  parseInt(b.amount || "") /
    10 ** Denom.from(b.denom || "").decimals -
  parseInt(a.amount || "") / 10 ** Denom.from(a.denom || "").decimals;
export const appLink = (app: string): string => {
  const domain = window.location.host.split(".").slice(-2).join(".");
  return "https://" + app + (app === "" ? "" : ".") + domain;
};

export const defaultReplacer = (key: string, value: any) => {
  if (typeof value === "bigint") {
    return value.toString();
  }
  return value;
};
