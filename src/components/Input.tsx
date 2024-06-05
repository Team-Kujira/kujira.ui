import clsx from "clsx";
import { useEffect, useState } from "react";

export type InputProps = {
  label?: string;
  placeholder?: string;
  onSubmit?: () => void;
  icon?: React.ReactNode;
  readOnly?: Boolean;
} & JSX.IntrinsicElements["input"];

export default function Input({
  id,
  label,
  placeholder,
  value,
  className,
  onChange,
  onSubmit,
  step,
  icon,
  readOnly = false,
  children,
  ...rest
}: InputProps) {
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    const handleUserKeyPress = (event: KeyboardEvent) => {
      const { key } = event;

      if (key === "Enter") {
        onSubmit?.();
      }
    };

    window.addEventListener("keydown", handleUserKeyPress);

    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [onSubmit]);

  return (
    <div
      className={clsx({
        "md-input": true,
        "md-input--focus": focus,
        "md-input--nolabel": label === undefined,
        "md-input--icon": icon === undefined,
        [`${className}`]: className,
      })}>
      {label && <label htmlFor={id}>{label}</label>}
      {!readOnly ? (
        <input
          id={id}
          value={value}
          onChange={onChange}
          readOnly={!onChange}
          placeholder={placeholder}
          step={step || 1}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          {...rest}
        />
      ) : (
        <span>{value}</span>
      )}
      {icon && <button onClick={onSubmit}>{icon}</button>}
      {children}
    </div>
  );
}
