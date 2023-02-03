import "./number";
export * as components from "./components";
export * as hooks from "./hooks";
export * as i18n from "./i18n";
export * as icons from "./icons";
export * as providers from "./providers";
export * from "./wallets";
declare global {
    interface Number {
        toLocaleDecimal(decimals: number): string;
    }
    interface Array<T> {
        uniqueBy(fn: (t: T) => any): Array<T>;
    }
}
