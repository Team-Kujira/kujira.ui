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
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconCheck = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
function IconCheck(_a) {
    var props = __rest(_a, []);
    return ((0, jsx_runtime_1.jsx)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", role: "img" }, props, { children: (0, jsx_runtime_1.jsx)("path", { fill: "currentColor", d: "M14.29,2l-9.2,9.21L1.71,7.79a.42.42,0,0,0-.6,0l-1,1a.43.43,0,0,0,0,.6L4.79,14a.44.44,0,0,0,.6,0L15.88,3.55a.43.43,0,0,0,0-.6l-1-1A.44.44,0,0,0,14.29,2Z" }) })));
}
exports.IconCheck = IconCheck;
