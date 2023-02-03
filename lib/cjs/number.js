"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Number.prototype.toLocaleDecimal = function (decimals = 0) {
    return this.toLocaleString(undefined, {
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals,
    });
};
