import { useState, useEffect } from "react";

interface Size {
  width: number;
  height: number;
}

export function useWindowSize(): Size {
  const [windowSize, setWindowSize] = useState<Size>({
    width: window.outerWidth,
    height: window.outerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}
