"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coinSort = void 0;
const kujira_js_1 = require("kujira.js");
const coinSort = (a, b) => parseInt(b.amount || "") /
    Math.pow(10, kujira_js_1.Denom.from(b.denom || "").decimals) -
    parseInt(a.amount || "") / Math.pow(10, kujira_js_1.Denom.from(a.denom || "").decimals);
exports.coinSort = coinSort;
