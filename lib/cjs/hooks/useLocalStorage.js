"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLocalStorage = void 0;
const react_1 = require("react");
const useLocalStorage = (key, def) => {
    const initial = (0, react_1.useMemo)(() => localStorage.getItem(key), [key]);
    const [val, setLocalVal] = (0, react_1.useState)(initial ? JSON.parse(initial) : def);
    const setVal = (v) => {
        setLocalVal(v);
        v
            ? localStorage.setItem(key, JSON.stringify(v))
            : localStorage.removeItem(key);
    };
    return [val, setVal];
};
exports.useLocalStorage = useLocalStorage;
