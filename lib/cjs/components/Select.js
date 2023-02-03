"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Select = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = __importDefault(require("clsx"));
const react_1 = require("react");
const IconArrow_1 = require("../icons/IconArrow");
function Select({ options, selected, onChange, dark = false, className, allowCustomInput, onCustomChange, disabled, suffix, }) {
    const node = (0, react_1.useRef)(null);
    const drop = (0, react_1.useRef)(null);
    const [open, setOpen] = (0, react_1.useState)(false);
    const [top, setTop] = (0, react_1.useState)(false);
    const [custom, setCustom] = (0, react_1.useState)("");
    (0, react_1.useEffect)(() => {
        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
            const ref = drop.current;
            if (ref) {
                const box = ref.getBoundingClientRect();
                if (box.bottom >
                    (window.innerHeight ||
                        document.documentElement.clientHeight)) {
                    setTop(true);
                }
            }
        }
        else {
            if (custom !== "") {
            }
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);
    (0, react_1.useEffect)(() => {
        const ref = node.current;
        if (ref) {
            const box = ref.getBoundingClientRect();
            if (box.bottom >
                (window.innerHeight ||
                    document.documentElement.clientHeight) -
                    100) {
                setTop(true);
            }
        }
    }, []);
    const handleClickOutside = (e) => {
        const ref = node.current;
        if (ref) {
            if (ref.contains(e.target)) {
                return;
            }
        }
        e.stopPropagation();
        e.stopImmediatePropagation();
        setOpen(false);
        return false;
    };
    const handleChange = (e) => {
        setCustom("");
        if (onChange && e !== selected.value)
            onChange(e);
    };
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ ref: node, className: (0, clsx_1.default)({
            select: true,
            "select--dark": dark,
            "select--open": open,
            "select--top": top,
            "select--disabled": disabled,
            [`${className}`]: className,
        }), onClick: () => !disabled && setOpen(!open) }, { children: [open && allowCustomInput ? ((0, jsx_runtime_1.jsx)("input", { autoFocus: true, type: "text", value: custom, onChange: (e) => setCustom(e.currentTarget.value), onKeyDown: (e) => {
                    if (e.key === "Enter" && onCustomChange) {
                        onCustomChange(custom);
                        setOpen(false);
                    }
                } })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [selected.status && (0, jsx_runtime_1.jsx)("b", { className: selected.status }), selected.label] })), !disabled && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "select__space" }), (0, jsx_runtime_1.jsx)(IconArrow_1.IconArrow, {})] })), open && ((0, jsx_runtime_1.jsx)("ul", Object.assign({ ref: drop }, { children: options.map((m) => ((0, jsx_runtime_1.jsxs)("li", Object.assign({ onClick: () => handleChange(m.value), className: m.value === selected.value ? "current" : "" }, { children: [m.status && (0, jsx_runtime_1.jsx)("b", { className: m.status }), (0, jsx_runtime_1.jsx)("span", { children: m.label }), suffix && suffix(m)] }), m.label))) })))] })));
}
exports.Select = Select;
