import { Denom } from "kujira.js";
export const coinSort = (a, b) => parseInt(b.amount || "") /
    Math.pow(10, Denom.from(b.denom || "").decimals) -
    parseInt(a.amount || "") / Math.pow(10, Denom.from(a.denom || "").decimals);
