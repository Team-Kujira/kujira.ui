"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconClose = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
function IconClose({ onClick }) {
    const handleClick = () => {
        if (onClick)
            onClick();
    };
    return ((0, jsx_runtime_1.jsx)("svg", Object.assign({ onClick: handleClick, viewBox: "0 0 320 512" }, { children: (0, jsx_runtime_1.jsx)("path", { fill: "currentColor", d: "M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z" }) })));
}
exports.IconClose = IconClose;
