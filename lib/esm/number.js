"use strict";
Number.prototype.toLocaleDecimal = function (decimals = 0) {
    return this.toLocaleString(undefined, {
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals,
    });
};
