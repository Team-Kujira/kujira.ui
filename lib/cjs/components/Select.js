"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Select = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
//import { motion, AnimatePresence } from "framer-motion";
const clsx_1 = __importDefault(require("clsx"));
const IconArrow_1 = require("../icons/IconArrow");
function Select({ options, selected, onChange, dark = false, className, }) {
    const node = (0, react_1.useRef)(null);
    const [open, setOpen] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);
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
        if (onChange)
            onChange(e);
    };
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ ref: node, className: (0, clsx_1.default)({
            select: true,
            //"ml-1": true,
            "select--dark": dark,
            "select--open": open,
            [`${className}`]: className,
        }), onClick: () => setOpen(!open) }, { children: [selected.label, (0, jsx_runtime_1.jsx)(IconArrow_1.IconArrow, {}), open && ((0, jsx_runtime_1.jsx)("ul", { children: options.map((m) => ((0, jsx_runtime_1.jsx)("li", Object.assign({ onClick: () => handleChange(m.value), className: m === selected ? "current" : "" }, { children: m.label }), m.label))) }))] })));
}
exports.Select = Select;
