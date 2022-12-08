import { useState, useEffect } from "react";
export function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
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
