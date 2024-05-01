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

/*
truncates the value to `places` significant figures
*/
export const priceFormatter = (num: number): string => {
  const places =
    num > 10000
      ? 7
      : num > 1000
      ? 6
      : num > 100
      ? 5
      : num > 10
      ? 4
      : 3;

  if (num === 0) return "0";

  const multiplier = Math.pow(
    10,
    places - Math.floor(Math.log10(Math.abs(num))) - 1
  );
  const truncated = Math.floor(num * multiplier) / multiplier;

  const units = truncated.toString().split(".").at(0)?.length || 0;
  const decimals = truncated.toString().split(".").at(1)?.length || 0;
  // we need _at least_ the total number of chars as sig figs displayed
  const dp = Math.max(places - units, decimals);
  const str = truncated.toFixed(dp);
  let [x, y] = str.split(".");
  const meme = y?.match(/^(0{3,})([0-9]+)/);
  x = parseInt(x).toLocaleString().split(".").at(0) || x;
  if (meme) {
    const len = meme.at(1)?.length || 0;
    const val = meme.at(2) || "";
    y =
      "\u0030" +
      {
        "0": "\u2080",
        "1": "\u2081",
        "2": "\u2082",
        "3": "\u2083",
        "4": "\u2084",
        "5": "\u2085",
        "6": "\u2086",
        "7": "\u2087",
        "8": "\u2088",
        "9": "\u2089",
      }[len] +
      val;
  }
  return y ? `${x}.${y}` : x;
};
