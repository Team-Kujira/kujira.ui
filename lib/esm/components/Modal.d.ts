/// <reference types="react" />
export declare const Modal: ({ show, close, title, children, confirm, large, backgroundClose, className, }: {
    show: boolean;
    close: () => void;
    title?: string | undefined;
    children: React.ReactChild;
    confirm?: (() => void) | undefined;
    large?: boolean | undefined;
    backgroundClose?: boolean | undefined;
    className?: string | undefined;
}) => import("react").ReactPortal | null;
