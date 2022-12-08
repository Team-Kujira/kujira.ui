import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import clsx from "clsx";
import ReactDOM from "react-dom";
import { IconClose } from "../icons/IconClose";
export const Modal = ({ show, close, title, children, confirm, large, backgroundClose = true, className, }) => {
    const dest = document.getElementById("modal");
    return dest
        ? ReactDOM.createPortal(_jsx(_Fragment, { children: show ? (_jsx("div", Object.assign({ className: clsx({
                    modal: true,
                    "modal--large": large,
                    [`${className}`]: className,
                }), onClick: () => (backgroundClose ? close() : null) }, { children: _jsxs("div", Object.assign({ className: "modal__window", onClick: (e) => {
                        e.stopPropagation();
                    } }, { children: [title && (_jsxs("div", Object.assign({ className: "modal__header" }, { children: [_jsx("h2", { children: title }), !confirm && _jsx(IconClose, { onClick: close })] }))), children, confirm && (_jsxs("div", Object.assign({ className: "modal__footer text-right mt-4" }, { children: [_jsx("button", Object.assign({ className: "button--outline-blue", onClick: close }, { children: "Cancel" })), _jsx("button", Object.assign({ className: "button--gradient ml-1", onClick: confirm }, { children: "Confirm" }))] })))] })) }))) : null }), dest)
        : null;
};
