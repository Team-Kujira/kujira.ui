/// <reference types="react" />
declare type OptionType<T> = {
    label: string;
    value: T;
};
export declare type SelectProps<T> = {
    options: OptionType<T>[];
    selected: OptionType<T>;
    onChange?: (e: any) => void;
    dark?: boolean;
    className?: string;
};
export declare function Select<T>({ options, selected, onChange, dark, className, }: SelectProps<T>): JSX.Element;
export {};
