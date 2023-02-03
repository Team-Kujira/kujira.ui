"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modal = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = __importDefault(require("clsx"));
const react_dom_1 = __importDefault(require("react-dom"));
const IconClose_1 = require("../icons/IconClose");
const Modal = ({ show, close, title, children, confirm, large, backgroundClose = true, className, }) => {
    const dest = document.getElementById("modal");
    return dest
        ? react_dom_1.default.createPortal((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: show ? ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: (0, clsx_1.default)({
                    modal: true,
                    "modal--large": large,
                    [`${className}`]: className,
                }), onClick: () => (backgroundClose ? close() : null) }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "modal__window", onClick: (e) => {
                        e.stopPropagation();
                    } }, { children: [title && ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "modal__header" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: title }), !confirm && (0, jsx_runtime_1.jsx)(IconClose_1.IconClose, { onClick: close })] }))), children, confirm && ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "modal__footer text-right mt-4" }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ className: "md-button md-button--grey", onClick: close }, { children: "Cancel" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "md-button ml-1", onClick: confirm }, { children: "Confirm" }))] })))] })) }))) : null }), dest)
        : null;
};
exports.Modal = Modal;
