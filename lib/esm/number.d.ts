interface LocaleDecimal {
    toLocaleDecimal: (decimals: number) => string;
}
interface Number extends LocaleDecimal {
}
