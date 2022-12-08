import { jsx as _jsx } from "react/jsx-runtime";
import { useWallet } from "../providers/Wallet";
import { Modal } from "./Modal";
export default function ({ onClose }) {
    const { account } = useWallet();
    return (_jsx(Modal, Object.assign({ className: "nopad", show: true, close: () => {
            onClose();
        } }, { children: _jsx("iframe", { src: `https://app.kado.money?${new URLSearchParams({
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
