import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { IconArrow } from "../icons/IconArrow";
export function Select({ options, selected, onChange, dark = false, className, allowCustomInput, onCustomChange, disabled, suffix, }) {
    const node = useRef(null);
    const drop = useRef(null);
    const [open, setOpen] = useState(false);
    const [top, setTop] = useState(false);
    const [custom, setCustom] = useState("");
    useEffect(() => {
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
    useEffect(() => {
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
    return (_jsxs("div", Object.assign({ ref: node, className: clsx({
            select: true,
            "select--dark": dark,
            "select--open": open,
            "select--top": top,
            "select--disabled": disabled,
            [`${className}`]: className,
        }), onClick: () => !disabled && setOpen(!open) }, { children: [open && allowCustomInput ? (_jsx("input", { autoFocus: true, type: "text", value: custom, onChange: (e) => setCustom(e.currentTarget.value), onKeyDown: (e) => {
                    if (e.key === "Enter" && onCustomChange) {
                        onCustomChange(custom);
                        setOpen(false);
                    }
                } })) : (_jsxs(_Fragment, { children: [selected.status && _jsx("b", { className: selected.status }), selected.label] })), !disabled && (_jsxs(_Fragment, { children: [_jsx("div", { className: "select__space" }), _jsx(IconArrow, {})] })), open && (_jsx("ul", Object.assign({ ref: drop }, { children: options.map((m) => (_jsxs("li", Object.assign({ onClick: () => handleChange(m.value), className: m.value === selected.value ? "current" : "" }, { children: [m.status && _jsx("b", { className: m.status }), _jsx("span", { children: m.label }), suffix && suffix(m)] }), m.label))) })))] })));
}
