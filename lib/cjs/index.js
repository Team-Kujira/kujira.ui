"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.providers = exports.icons = exports.i18n = exports.hooks = exports.components = void 0;
require("./number");
exports.components = __importStar(require("./components"));
exports.hooks = __importStar(require("./hooks"));
exports.i18n = __importStar(require("./i18n"));
exports.icons = __importStar(require("./icons"));
exports.providers = __importStar(require("./providers"));
__exportStar(require("./wallets"), exports);
Number.prototype.toLocaleDecimal = function (decimals = 0) {
    return this.toLocaleString(undefined, {
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals,
    });
};
Array.prototype.uniqueBy = function (fn) {
    return this.reduce((a, v, idx, arr) => arr.slice(0, idx).find((x) => fn(x) === fn(v)) ? a : [...a, v], []);
};
