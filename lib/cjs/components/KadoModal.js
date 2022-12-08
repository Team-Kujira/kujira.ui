"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Wallet_1 = require("../providers/Wallet");
const Modal_1 = require("./Modal");
function default_1({ onClose }) {
    const { account } = (0, Wallet_1.useWallet)();
    return ((0, jsx_runtime_1.jsx)(Modal_1.Modal, Object.assign({ className: "nopad", show: true, close: () => {
            onClose();
        } }, { children: (0, jsx_runtime_1.jsx)("iframe", { src: `https://app.kado.money?${new URLSearchParams({
                apiKey: "8b1e6d84-c305-4d91-b1e4-a928a441317d",
                onPayCurrency: "USD",
                onRevCurrency: "USDC",
                offPayCurrency: "USDC",
                offRevCurrency: "USD",
                onPayAmount: "25",
                offPayAmount: "25",
                onToAddress: (account === null || account === void 0 ? void 0 : account.address) || "",
                offFromAddress: (account === null || account === void 0 ? void 0 : account.address) || "",
                cryptoList: "USDC",
                fiatList: "USD,CAD,GBP,EUR,MXN,COP",
                network: "kujira",
                product: "BUY",
            }).toString()}`, width: "500", height: "800", style: { border: 0 } }) })));
}
exports.default = default_1;
