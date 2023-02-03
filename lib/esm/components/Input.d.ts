/// <reference types="react" />
export type InputProps = {
    label?: string;
    onSubmit?: () => void;
    icon?: React.ReactNode;
    readOnly?: Boolean;
} & JSX.IntrinsicElements["input"];
export default function Input({ id, label, value, className, onChange, onSubmit, step, icon, readOnly, children, ...rest }: InputProps): JSX.Element;
