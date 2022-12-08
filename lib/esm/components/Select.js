import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
//import { motion, AnimatePresence } from "framer-motion";
import { IconArrow } from "../icons/IconArrow";
import clsx from "clsx";
export function Select({ options, selected, onChange, dark = false, className, }) {
    const node = useRef(null);
    const [open, setOpen] = useState(false);
    useEffect(() => {
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
    return (_jsxs("div", Object.assign({ ref: node, className: clsx({
            select: true,
            //"ml-1": true,
            "select--dark": dark,
            "select--open": open,
            [`${className}`]: className,
        }), onClick: () => setOpen(!open) }, { children: [selected.label, _jsx(IconArrow, {}), open && (_jsx("ul", { children: options.map((m) => (_jsx("li", Object.assign({ onClick: () => handleChange(m.value), className: m === selected ? "current" : "" }, { children: m.label }), m.label))) }))] })));
}
