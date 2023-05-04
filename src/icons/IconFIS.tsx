import { FC } from "react";

export const IconFIS: FC<JSX.IntrinsicElements["svg"]> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 78 78"
    className="icon-denom"
    {...props}>
    <defs>
      <linearGradient
        id="a"
        x1="10.493%"
        x2="92.253%"
        y1="0%"
        y2="100%">
        <stop offset="0%" stopColor="#0093ED" />
        <stop offset="100%" stopColor="#00F3AB" />
      </linearGradient>
      <linearGradient
        id="b"
        x1="66%"
        x2="10.812%"
        y1="92.56%"
        y2="0%">
        <stop offset="0%" stopColor="#000A17" />
        <stop offset="100%" stopColor="#00554F" />
      </linearGradient>
    </defs>
    <g fill="none" fillRule="evenodd">
      <path
        fill="url(#a)"
        stroke="#00F3AB"
        strokeOpacity={0.2}
        d="M38 0c20.987 0 38 17.013 38 38S58.987 76 38 76 0 58.987 0 38 17.013 0 38 0Z"
        transform="translate(1 1)"
      />
      <path
        fill="url(#b)"
        d="M40.404 48.781c1.726.099 3.38.305 4.96.619l1.295 4.024.075-3.721.6.154a18.36 18.36 0 0 0 4.695 1.074L50.354 59h-6.72Zm-5.464.043L31.882 59h-6.487l-1.6-8.01c1.781-.067 3.405-.444 4.872-1.133.234-.062.47-.122.707-.18l.21 3.747 1.114-4.037a35.443 35.443 0 0 1 4.242-.563ZM22.957 17l6.076 28.077c-.123.068-.245.138-.366.209a13.49 13.49 0 0 1-5.785 1.138L17 17h5.957Zm29.192 0 6.851.328-6.033 29.088c-1.671-.073-3.549-.45-5.634-1.13l-.129-.075L52.15 17ZM39.59 31.25l3.956 12.45c-1.514-.418-3.155-.649-4.924-.692l-1.01-3.683-.985 3.713a19.743 19.743 0 0 0-4.31.699l3.695-12.487h3.578Z"
        transform="translate(1 1)"
      />
    </g>
  </svg>
);
