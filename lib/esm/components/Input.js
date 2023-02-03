var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { useEffect, useState } from "react";
export default function Input(_a) {
    var { id, label, value, className, onChange, onSubmit, step, icon, readOnly = false, children } = _a, rest = __rest(_a, ["id", "label", "value", "className", "onChange", "onSubmit", "step", "icon", "readOnly", "children"]);
    const [focus, setFocus] = useState(false);
    useEffect(() => {
        const handleUserKeyPress = (event) => {
            const { key } = event;
            if (key === "Enter") {
                onSubmit === null || onSubmit === void 0 ? void 0 : onSubmit();
            }
        };
        window.addEventListener("keydown", handleUserKeyPress);
        return () => {
            window.removeEventListener("keydown", handleUserKeyPress);
        };
    }, [onSubmit]);
    return (_jsxs("div", Object.assign({ className: clsx({
            "md-input": true,
            "md-input--focus": focus,
            "md-input--nolabel": label === undefined,
            "md-input--icon": icon === undefined,
            [`${className}`]: className,
        }) }, { children: [label && _jsx("label", Object.assign({ htmlFor: id }, { children: label })), !readOnly ? (_jsx("input", Object.assign({ id: id, value: value, onChange: onChange, readOnly: !onChange, step: step || 1, onFocus: () => setFocus(true), onBlur: () => setFocus(false) }, rest))) : (_jsx("span", { children: value })), icon && _jsx("button", Object.assign({ onClick: onSubmit }, { children: icon })), children] })));
}
