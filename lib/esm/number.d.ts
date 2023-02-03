interface LocaleDecimal {
    toLocaleDecimal: (decimals: number) => string;
}
export interface Number extends LocaleDecimal {
}
export {};
