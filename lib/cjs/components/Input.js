"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = __importDefault(require("clsx"));
const react_1 = require("react");
function Input(_a) {
    var { id, label, value, className, onChange, onSubmit, step, icon, readOnly = false, children } = _a, rest = __rest(_a, ["id", "label", "value", "className", "onChange", "onSubmit", "step", "icon", "readOnly", "children"]);
    const [focus, setFocus] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
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
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: (0, clsx_1.default)({
            "md-input": true,
            "md-input--focus": focus,
            "md-input--nolabel": label === undefined,
            "md-input--icon": icon === undefined,
            [`${className}`]: className,
        }) }, { children: [label && (0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: id }, { children: label })), !readOnly ? ((0, jsx_runtime_1.jsx)("input", Object.assign({ id: id, value: value, onChange: onChange, readOnly: !onChange, step: step || 1, onFocus: () => setFocus(true), onBlur: () => setFocus(false) }, rest))) : ((0, jsx_runtime_1.jsx)("span", { children: value })), icon && (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: onSubmit }, { children: icon })), children] })));
}
exports.default = Input;
