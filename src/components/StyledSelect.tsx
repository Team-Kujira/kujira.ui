import clsx from "clsx";
import { FC, useState } from "react";
import { IconArrow } from "../icons";

export const StyledSelect: FC<JSX.IntrinsicElements["select"]> = ({
  children,
  className,
  value,
  ...rest
}) => {
  const [focus, setFocus] = useState(false);

  return (
    <div
      className={clsx({
        "md-input": true,
        "md-input--focus": focus,
        "md-input--icon": true,
        "md-input--select": true,
        [`${className}`]: className,
      })}>
      <span>{value}</span>
      <IconArrow />
      <select {...rest} onBlur={() => setFocus(false)}>
        {children}
      </select>
    </div>
  );
};
