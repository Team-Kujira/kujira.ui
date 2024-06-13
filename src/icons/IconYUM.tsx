import { FC } from "react";

export const IconYUM: FC<JSX.IntrinsicElements["svg"]> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={256}
    height={256}
    viewBox="0 0 256 256"
    fill="none"
    className="icon-denom"
    {...props}>
    <rect width={256} height={256} fill="#000" rx={128} />
    <mask
      id="c"
      width={246}
      height={246}
      x={5}
      y={5}
      fill="#000"
      maskUnits="userSpaceOnUse">
      <path fill="#fff" d="M5 5h246v246H5z" />
      <path d="M241 128c0 62.408-50.592 113-113 113S15 190.408 15 128 65.592 15 128 15s113 50.592 113 113Zm-214.7 0c0 56.167 45.533 101.7 101.7 101.7S229.7 184.167 229.7 128 184.167 26.3 128 26.3 26.3 71.833 26.3 128Z" />
    </mask>
    <g filter="url(#a)">
      <path
        fill="url(#b)"
        d="M241 128c0 62.408-50.592 113-113 113S15 190.408 15 128 65.592 15 128 15s113 50.592 113 113Zm-214.7 0c0 56.167 45.533 101.7 101.7 101.7S229.7 184.167 229.7 128 184.167 26.3 128 26.3 26.3 71.833 26.3 128Z"
      />
    </g>
    <path
      stroke="#111010"
      strokeWidth={20}
      d="M241 128c0 62.408-50.592 113-113 113S15 190.408 15 128 65.592 15 128 15s113 50.592 113 113Zm-214.7 0c0 56.167 45.533 101.7 101.7 101.7S229.7 184.167 229.7 128 184.167 26.3 128 26.3 26.3 71.833 26.3 128Z"
      mask="url(#c)"
    />
    <g fill="#fff" clipPath="url(#d)">
      <path d="M46.879 74.081c40.193 31.163 122.648 31.163 162.841 0V59.61c-40.193 41.541-122.648 41.541-162.841 0v14.472Z" />
      <path d="M46.879 104.664c40.193 13.003 122.648 13.003 162.841 0V90.192c-40.193 23.349-122.648 23.349-162.841 0v14.472ZM46.879 135.229c40.193-5.188 122.648-5.188 162.841 0v-14.471c-40.193 5.188-122.648 5.188-162.841 0v14.471ZM46.879 165.824c40.193-23.349 122.648-23.349 162.841 0v-14.472c-40.193-13.003-122.648-13.003-162.841 0v14.472Z" />
      <path d="M46.879 196.394c40.193-41.54 122.648-41.54 162.841 0v-14.472c-40.193-31.163-122.648-31.163-162.841 0v14.472Z" />
      <path
        fillRule="evenodd"
        d="M82.9 109.306h8.928v22.344h-8.929v-22.344Zm89.287 40.219h-8.929V131.65h8.929v17.875Z"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <linearGradient
        id="b"
        x1={198.507}
        x2={-10.58}
        y1={205.432}
        y2={91.209}
        gradientUnits="userSpaceOnUse">
        <stop stopColor="#00F3FA" />
        <stop offset={1} stopColor="#6C40DE" />
      </linearGradient>
      <clipPath id="d">
        <path fill="#fff" d="M83.938 83.074h88.159v89.854H83.938z" />
      </clipPath>
      <filter
        id="a"
        width={246}
        height={250}
        x={5}
        y={5}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse">
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite
          in2="hardAlpha"
          k2={-1}
          k3={1}
          operator="arithmetic"
        />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend
          in2="shape"
          result="effect1_innerShadow_7352_46778"
        />
      </filter>
    </defs>
  </svg>
);
