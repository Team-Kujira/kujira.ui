import { useMemo, useState } from "react";
export const useLocalStorage = (key, def) => {
    const initial = useMemo(() => localStorage.getItem(key), [key]);
    const [val, setLocalVal] = useState(initial ? JSON.parse(initial) : def);
    const setVal = (v) => {
        setLocalVal(v);
        v
            ? localStorage.setItem(key, JSON.stringify(v))
            : localStorage.removeItem(key);
    };
    return [val, setVal];
};
