import { FC } from "react";

export const IconARCH: FC<JSX.IntrinsicElements["svg"]> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="300"
      height="300"
      fill="none"
      viewBox="0 0 300 300"
      className="icon-denom"
      {...props}>
      <rect width="300" height="300" fill="#FF4D00" rx="150"></rect>
      <path
        fill="#fff"
        d="M85 141.52C85 105.334 114.101 76 150 76c35.898 0 65 29.334 65 65.52v64.415C214.965 170.066 185.877 141 150 141c-35.898 0-65 29.101-65 65v-64.48z"></path>
    </svg>
  );
};
