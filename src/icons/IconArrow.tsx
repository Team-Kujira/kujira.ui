import { FC } from "react";

export const IconArrow: FC<JSX.IntrinsicElements["svg"]> = (
  props
) => (
  <svg
    width="16px"
    height="16px"
    viewBox="0 0 16 16"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path
      d="M7.535 11.951l-6.342-6.44a.657.657 0 010-.93l.388-.388a.657.657 0 01.93 0L8 9.786l5.49-5.588a.657.657 0 01.93 0l.387.388a.657.657 0 010 .93l-6.342 6.44a.662.662 0 01-.93-.005z"
      fill="currentColor"
      fillRule="nonzero"
    />
  </svg>
);
