import { useMemo, useState } from "react";

type T = string | object;

export const useLocalStorage = (key: string, def: T) => {
  const initial = useMemo(() => localStorage.getItem(key), [key]);

  const [val, setLocalVal] = useState(initial ? JSON.parse(initial) : def);

  const setVal = (v: any) => {
    setLocalVal(v);
    v
      ? localStorage.setItem(key, JSON.stringify(v))
      : localStorage.removeItem(key);
  };

  return [val, setVal];
};
