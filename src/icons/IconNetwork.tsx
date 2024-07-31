import { Osmosis } from "./IconOsmo";

export const IconNetwork: React.FC<{
  network: string;
  className?: string;
}> = ({ network, className }) => {
  if (network.toLowerCase() === "kraken")
    return <Kraken className={"icon-network " + className} />;
  if (network.toLowerCase() === "mexc")
    return <MEXC className={"icon-network " + className} />;
  if (network.toLowerCase() === "arbitrum")
    return <Arbitrum className={"icon-network " + className} />;
  if (network.toLowerCase() === "binance smart chain")
    return <BSC className={"icon-network " + className} />;
  if (network.toLowerCase() === "ethereum")
    return <Ethereum className={"icon-network " + className} />;
  if (network.toLowerCase() === "optimism")
    return <Optimism className={"icon-network " + className} />;
  if (network.toLowerCase() === "cosmos hub")
    return <Hub className={"icon-network " + className} />;
  if (network.toLowerCase() === "noble")
    return <Noble className={"icon-network " + className} />;
  if (network.toLowerCase() === "base")
    return <Base className={"icon-network " + className} />;
  if (network.toLowerCase() === "avalanche")
    return <Avalanche className={"icon-network " + className} />;
  if (network.toLowerCase() === "osmosis")
    return <Osmosis className={"icon-network " + className} />;
  if (network.toLowerCase() === "solana")
    return <Solana className={"icon-network " + className} />;
  if (network.toLowerCase() === "celestia")
    return <Celestia className={"icon-network " + className} />;
  return null;
};

const Kraken = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 340.405 267.508">
    <path
      fill="#5b1ecf"
      fillRule="nonzero"
      d="M159.5.348c29.5-1.9 59.5 4 86 17.2 39.1 19.2 70.2 53.9 84.9 94.8 6.5 18.1 10 37.2 10 56.4v71.3c0 2.9.1 5.9-.6 8.7-1.6 7.2-6.7 13.5-13.5 16.6-4.7 2.2-10.1 2.5-15.1 1.7-10.9-2-19.3-12.2-19.4-23.2-.1-22.1 0-44.2 0-66.4.2-6.3.2-13-3.2-18.5-5.5-10.2-18.9-15.1-29.6-10.7-9.1 3.2-15.7 12.4-15.8 22.1-.1 22.5 0 44.9 0 67.3 0 4.2.2 8.5-1 12.5-2.3 7.9-8.9 14.3-16.8 16.5-10.4 2.9-22.3-1.7-27.6-11.3-3.6-5.8-3.3-12.8-3.2-19.2-.1-22.3.1-44.6-.1-66.9-.2-11.3-9.5-21.5-20.8-23-7.3-1.1-15 1.3-20.3 6.5-4.8 4.5-7.5 11-7.5 17.6v65c-.1 5.5.6 11.1-1.5 16.2-3.2 9.3-12.6 16.1-22.5 15.8-10.1.6-20-6.4-23.2-15.9-1.8-4.7-1.4-9.7-1.4-14.7 0-22.4.1-44.8 0-67.3-.1-11.1-8.7-21.2-19.6-23.2-9.8-2.1-20.7 2.9-25.7 11.8-2.1 3.7-3.2 8-3.2 12.2v72.8c.1 7.1-3.2 14.1-8.6 18.6-8.2 7.2-21.5 7.6-30.2 1-6.3-4.3-10-11.6-10-19.2v-73.7c.1-27.9 7.1-55.7 20.4-80.2 10.9-20 25.8-37.9 43.7-52.1 27-21.9 60.8-35 95.4-37.1Z"
    />
  </svg>
);

const MEXC = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 139.809 85.76">
    <defs>
      <linearGradient
        id="mexc-a"
        x1="-8.083%"
        x2="85.155%"
        y1="40.493%"
        y2="68.056%">
        <stop offset="0%" stopColor="#003087" stopOpacity="0" />
        <stop offset="100%" stopColor="#003087" />
      </linearGradient>
    </defs>
    <g fill="none" fillRule="nonzero">
      <path
        fill="#003087"
        d="m137.52 60.586-30.185-52.41c-6.588-10.914-22.813-11.012-29.204.492L46.469 63.142c-5.9 10.03 1.376 22.518 13.274 22.518h63.619c11.898.098 20.846-12.881 14.159-25.074Z"
      />
      <path
        fill="#1877F2"
        d="m93.962 64.716-1.869-3.245c-1.77-3.048-5.604-9.538-5.604-9.538L60.923 7.49c-6.588-9.833-22.32-10.718-28.908 1.77L2.22 60.782c-6.195 10.816 1.18 24.877 14.553 24.976h106.195c-16.323.097-21.534-8.457-29.007-21.043Z"
      />
      <path
        fill="url(#mexc-a)"
        d="m93.962 64.52-1.869-3.246c-1.77-3.048-5.604-9.538-5.604-9.538l-16.52-29.105-23.697 40.511c-5.9 10.03 1.377 22.518 13.275 22.518h63.422c-16.421-.099-21.534-8.457-29.007-21.14Z"
      />
    </g>
  </svg>
);

const Arbitrum = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 29 32"
    fill="none">
    <g fill="#fff" clipPath="url(#arbi)">
      <path d="m16.93 18.432-1.586 4.248a.496.496 0 0 0 0 .366l2.724 7.311 3.153-1.78-3.782-10.145a.271.271 0 0 0-.509 0ZM20.103 11.284a.271.271 0 0 0-.509 0l-1.586 4.248a.495.495 0 0 0 0 .367l4.465 11.971 3.153-1.78-5.523-14.806Z" />
      <path d="M14.5 1.983c.08 0 .154.02.228.06L26.75 8.83c.14.078.227.222.227.38v13.574a.436.436 0 0 1-.227.38l-12.023 6.794a.472.472 0 0 1-.455 0L2.255 23.17a.436.436 0 0 1-.228-.38V9.21c0-.158.087-.302.228-.38l12.023-6.788a.446.446 0 0 1 .221-.059ZM14.5 0c-.428 0-.857.111-1.239.327L1.239 7.115A2.415 2.415 0 0 0 0 9.209v13.575c0 .864.475 1.67 1.238 2.101l12.024 6.788c.381.216.81.327 1.238.327.428 0 .857-.111 1.239-.327l12.023-6.788a2.404 2.404 0 0 0 1.238-2.1V9.208c0-.864-.475-1.669-1.238-2.1L15.745.326A2.563 2.563 0 0 0 14.5 0Z" />
      <path d="m6.555 27.883 1.104-2.958 2.223 1.806-2.075 1.859-1.252-.707ZM13.489 8.24h-3.046a.535.535 0 0 0-.509.347L3.4 26.103l3.153 1.78 7.197-19.29a.268.268 0 0 0-.261-.353Z" />
      <path d="M18.824 8.24h-3.046a.535.535 0 0 0-.51.347L7.806 28.59l3.153 1.78 8.12-21.77a.267.267 0 0 0-.254-.36Z" />
    </g>
    <defs>
      <clipPath id="arbi">
        <path fill="#fff" d="M0 0h29v32H0z" />
      </clipPath>
    </defs>
  </svg>
);

const BSC = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20.745 24">
    <path
      fill="#F0B90B"
      fillRule="nonzero"
      d="M4.004 3.676 10.373 0l6.368 3.676L14.4 5.034l-4.027-2.318-4.028 2.318-2.341-1.358ZM16.74 8.312 14.4 6.954l-4.027 2.318-4.028-2.318-2.341 1.358v2.716l4.027 2.318v4.636l2.342 1.358 2.341-1.358v-4.636l4.027-2.318V8.312Zm0 7.352v-2.716L14.4 14.306v2.716l2.341-1.358Zm1.663.96-4.027 2.318v2.716l6.368-3.676V10.63l-2.341 1.358v4.636Zm-2.341-10.63 2.34 1.358v2.716l2.342-1.358V5.994l-2.341-1.358-2.341 1.358ZM8.03 19.926v2.716L10.373 24l2.341-1.358v-2.716l-2.341 1.358-2.342-1.358Zm-4.027-4.262 2.341 1.358v-2.716l-2.341-1.358v2.716Zm4.027-9.67 2.342 1.358 2.341-1.358-2.341-1.358L8.03 5.994Zm-5.69 1.358 2.342-1.358L2.34 4.636 0 5.994V8.71l2.341 1.358V7.352Zm0 4.636L0 10.63v7.352l6.369 3.677v-2.717L2.34 16.624v-4.636Z"
    />
  </svg>
);

const Ethereum = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 180 180"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg">
    <g
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
      strokeLinejoin="round">
      <polygon
        id="Path"
        stroke="#1616B4"
        fill="#F0CDC2"
        fillRule="nonzero"
        points="89.5054 180 89.5054 134.84 33.64064 102.171"></polygon>
      <polygon
        id="Path"
        stroke="#1616B4"
        fill="#C9B3F5"
        fillRule="nonzero"
        points="89.6906 180 89.6906 134.84 145.555 102.171"></polygon>
      <polygon
        id="Path"
        stroke="#1616B4"
        fill="#88AAF1"
        fillRule="nonzero"
        points="89.5055 123.615 89.5055 65.9786 33 91.2811"></polygon>
      <polygon
        id="Path"
        stroke="#1616B4"
        fill="#C9B3F5"
        fillRule="nonzero"
        points="89.6903 123.615 89.6903 65.9786 146.196 91.2811"></polygon>
      <polygon
        id="Path"
        stroke="#1616B4"
        fill="#F0CDC2"
        fillRule="nonzero"
        points="33.00006 91.2811 89.5054 0 89.5054 65.9786"></polygon>
      <polygon
        id="Path"
        stroke="#1616B4"
        fill="#B8FAF6"
        fillRule="nonzero"
        points="146.196 91.2811 89.6906 0 89.6906 65.9786"></polygon>
    </g>
  </svg>
);

const Optimism = ({ className }: { className?: string }) => (
  <svg
    className={className}
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 500 500">
    <circle cx="250" cy="250" r="250" fill="#ff0420" />
    <path
      d="M177.1 316.4c-14.9 0-27.1-3.5-36.6-10.5-9.4-7.1-14.1-17.3-14.1-30.4 0-2.8.3-6.1.9-10.1 1.6-9 3.9-19.8 6.9-32.5 8.5-34.4 30.5-51.6 65.9-51.6 9.6 0 18.3 1.6 25.9 4.9 7.6 3.1 13.6 7.9 18 14.3 4.4 6.3 6.6 13.8 6.6 22.5 0 2.6-.3 5.9-.9 9.9-1.9 11.1-4.1 22-6.8 32.5-4.4 17.1-11.9 30-22.7 38.5-10.7 8.4-25.1 12.5-43.1 12.5zm2.7-27c7 0 12.9-2.1 17.8-6.2 5-4.1 8.6-10.4 10.7-19 2.9-11.8 5.1-22 6.6-30.8.5-2.6.8-5.3.8-8.1 0-11.4-5.9-17.1-17.8-17.1-7 0-13 2.1-18 6.2-4.9 4.1-8.4 10.4-10.5 19-2.3 8.4-4.5 18.6-6.8 30.8-.5 2.5-.8 5.1-.8 7.9-.1 11.6 6 17.3 18 17.3zM259.3 314.6c-1.4 0-2.4-.4-3.2-1.3-.6-1-.8-2.1-.6-3.4l25.9-122c.2-1.4.9-2.5 2.1-3.4 1.1-.9 2.3-1.3 3.6-1.3H337c13.9 0 25 2.9 33.4 8.6 8.5 5.8 12.8 14.1 12.8 25 0 3.1-.4 6.4-1.1 9.8-3.1 14.4-9.4 25-19 31.9-9.4 6.9-22.3 10.3-38.7 10.3h-25.3l-8.6 41.1c-.3 1.4-.9 2.5-2.1 3.4-1.1.9-2.3 1.3-3.6 1.3h-25.5zm66.4-71.7c5.3 0 9.8-1.4 13.7-4.3 4-2.9 6.6-7 7.9-12.4.4-2.1.6-4 .6-5.6 0-3.6-1.1-6.4-3.2-8.3-2.1-2-5.8-3-10.9-3h-22.5l-7.1 33.6h21.5z"
      fill="#ffffff"
    />
  </svg>
);

const Hub = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 174 200">
    <path
      fill="#BA3FD9"
      fillRule="evenodd"
      d="M87 6.928 6.397 53.464v93.072L87 193.072l80.603-46.536V53.464L87 6.928ZM173.603 50 87 0 .397 50v100L87 200l86.603-50V50Z"
      clipRule="evenodd"
    />
    <path
      fill="#BA3FD9"
      fillRule="evenodd"
      d="M86.966 64.135c-6.19 0-11.226-5.04-11.226-11.234 0-6.195 5.035-11.234 11.226-11.234 6.19 0 11.226 5.04 11.226 11.234 0 6.195-5.036 11.234-11.226 11.234Zm0-16.347a5.117 5.117 0 0 0-5.11 5.113 5.117 5.117 0 0 0 5.11 5.113 5.117 5.117 0 0 0 5.11-5.113 5.117 5.117 0 0 0-5.11-5.113Z"
      clipRule="evenodd"
    />
    <path
      fill="#BA3FD9"
      d="M84.073 65.993c.964.223 1.969.34 3 .34 1.03 0 2.035-.117 3-.34v21.014a13.331 13.331 0 0 0-3-.34c-1.031 0-2.036.117-3 .34V65.993ZM77.327 90.91 59.122 80.398c-.29.946-.69 1.875-1.206 2.768a13.32 13.32 0 0 1-1.794 2.428l18.199 10.507a13.34 13.34 0 0 1 3.006-5.193ZM74.32 103.898l-18.198 10.508c.675.724 1.28 1.535 1.795 2.428.515.893.916 1.821 1.205 2.768l18.205-10.511a13.336 13.336 0 0 1-3.006-5.193ZM84.073 112.993v21.014c.965-.223 1.969-.34 3-.34s2.036.117 3 .34v-21.014c-.965.223-1.97.34-3 .34-1.031 0-2.036-.117-3-.34ZM96.818 109.091l18.206 10.511a13.352 13.352 0 0 1 3-5.197l-18.199-10.507a13.336 13.336 0 0 1-3.007 5.193ZM99.825 96.102l18.199-10.507a13.35 13.35 0 0 1-3-5.196l-18.206 10.51a13.34 13.34 0 0 1 3.007 5.193Z"
    />
    <path
      fill="#BA3FD9"
      fillRule="evenodd"
      d="M55.96 82.16c-3.096 5.362-9.978 7.203-15.343 4.105-5.364-3.097-7.211-9.978-4.116-15.338 3.095-5.362 9.978-7.203 15.342-4.106 5.365 3.097 7.211 9.979 4.116 15.34Zm-14.158-8.173a5.117 5.117 0 0 0 1.873 6.981 5.117 5.117 0 0 0 6.983-1.868 5.117 5.117 0 0 0-1.873-6.982 5.117 5.117 0 0 0-6.983 1.869ZM56.066 118.026c3.096 5.361 1.25 12.241-4.116 15.339-5.364 3.097-12.246 1.256-15.342-4.105-3.095-5.361-1.248-12.242 4.116-15.34 5.365-3.097 12.247-1.255 15.343 4.106Zm-14.157 8.173a5.118 5.118 0 0 0 6.983 1.869 5.118 5.118 0 0 0 1.873-6.982 5.118 5.118 0 0 0-6.982-1.869 5.118 5.118 0 0 0-1.873 6.982ZM87.18 135.865c6.19 0 11.226 5.04 11.226 11.234 0 6.195-5.035 11.234-11.226 11.234-6.19 0-11.226-5.039-11.226-11.234 0-6.194 5.036-11.234 11.226-11.234Zm0 16.347a5.116 5.116 0 0 0 5.11-5.113 5.117 5.117 0 0 0-5.11-5.113 5.117 5.117 0 0 0-5.11 5.113 5.117 5.117 0 0 0 5.11 5.113ZM118.187 117.84c3.095-5.361 9.977-7.203 15.342-4.105 5.364 3.097 7.211 9.978 4.116 15.339-3.095 5.361-9.978 7.202-15.342 4.105-5.365-3.097-7.211-9.978-4.116-15.339Zm14.157 8.173a5.116 5.116 0 0 0-1.874-6.981 5.116 5.116 0 0 0-6.982 1.868 5.117 5.117 0 0 0 1.873 6.982 5.117 5.117 0 0 0 6.983-1.869ZM118.079 81.975c-3.095-5.361-1.249-12.242 4.116-15.34 5.365-3.097 12.247-1.256 15.342 4.105 3.095 5.361 1.249 12.243-4.115 15.34-5.365 3.097-12.248 1.255-15.343-4.105Zm14.157-8.174a5.116 5.116 0 0 0-6.982-1.868 5.117 5.117 0 0 0-1.874 6.981 5.118 5.118 0 0 0 6.983 1.869 5.117 5.117 0 0 0 1.873-6.982ZM86.965 94.788a5.117 5.117 0 0 0-5.109 5.113 5.117 5.117 0 0 0 5.11 5.113 5.117 5.117 0 0 0 5.11-5.113 5.117 5.117 0 0 0-5.11-5.113Zm0 16.347c-6.19 0-11.225-5.039-11.225-11.234s5.035-11.234 11.225-11.234c6.19 0 11.227 5.04 11.227 11.234 0 6.195-5.036 11.234-11.227 11.234Z"
      clipRule="evenodd"
    />
  </svg>
);

const Noble = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 34 34.002">
    <defs>
      <linearGradient
        id="noble-a"
        x1="-4.406%"
        x2="99.421%"
        y1="99.262%"
        y2="-11.974%">
        <stop offset="5%" stopColor="#FFF" />
        <stop offset="38%" stopColor="#A7B3FF" />
        <stop offset="100%" stopColor="#74A4FF" />
      </linearGradient>
    </defs>
    <path
      fill="url(#noble-a)"
      fillRule="nonzero"
      d="M31.726 20.967a10.697 10.697 0 0 1-.816 4.12 10.715 10.715 0 0 1-2.332 3.49c-1 1-2.186 1.793-3.493 2.333a10.7 10.7 0 0 1-4.11.818h-.052c-2.27 0-4.523-.74-6.349-2.085a10.816 10.816 0 0 1-4.368-8.672v-7.934a2.815 2.815 0 0 1 .83-2.001 2.824 2.824 0 0 1 3.998.002c.533.534.828 1.244.83 1.998v7.932a5.066 5.066 0 0 0 1.499 3.607 5.072 5.072 0 0 0 2.611 1.39 5.094 5.094 0 0 0 5.233-2.167c.564-.84.863-1.818.865-2.83V5.104a2.828 2.828 0 0 1 5.654 0v15.862ZM9.429 9.427a5.077 5.077 0 0 0-1.497 3.609v15.863a2.81 2.81 0 0 1-.829 2c-1.068 1.07-2.932 1.07-4.001 0a2.813 2.813 0 0 1-.828-2V13.037c.002-2.58.93-5.073 2.616-7.026a10.767 10.767 0 0 1 16.099-.218l.016-.02.015.058a10.746 10.746 0 0 1 2.314 4.085l.044.145c.281.968.423 1.969.424 2.975v7.93a2.832 2.832 0 0 1-1.745 2.613c-.337.14-.693.206-1.052.21v.005c-.014 0-.027-.004-.041-.004-.18 0-.361-.012-.541-.048a2.623 2.623 0 0 1-.305-.084v-.014c-.068-.022-.138-.033-.204-.06a2.832 2.832 0 0 1-1.745-2.613v-7.183h-.002v-.753a5.107 5.107 0 0 0-3.172-4.72 4.922 4.922 0 0 0-1.959-.383 5.078 5.078 0 0 0-3.607 1.496v-.001Zm23.074-7.928A5.079 5.079 0 0 0 28.898.003h-.002a5.08 5.08 0 0 0-3.602 1.5 5.08 5.08 0 0 0-1.492 3.602v.573A13.051 13.051 0 0 0 8.689.746a12.987 12.987 0 0 0-6.295 4.766A12.986 12.986 0 0 0 0 13.036v15.863c0 1.363.531 2.644 1.495 3.608a5.067 5.067 0 0 0 3.608 1.495 5.07 5.07 0 0 0 3.608-1.495 5.069 5.069 0 0 0 1.495-3.608v-.57a13.056 13.056 0 0 0 15.108 4.929 12.985 12.985 0 0 0 6.293-4.766A12.986 12.986 0 0 0 34 20.972V5.102a5.08 5.08 0 0 0-1.497-3.604Z"
    />
  </svg>
);

const Base = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 146 146"
    fill="none">
    <circle cx="73" cy="73" r="73" fill="#0052FF" />
    <path
      d="M73.323 123.729C101.617 123.729 124.553 100.832 124.553 72.5875C124.553 44.343 101.617 21.4463 73.323 21.4463C46.4795 21.4463 24.4581 42.0558 22.271 68.2887H89.9859V76.8864H22.271C24.4581 103.119 46.4795 123.729 73.323 123.729Z"
      fill="white"
    />
  </svg>
);

const Avalanche = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1503 1504"
    fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1502.5 752C1502.5 1166.77 1166.27 1503 751.5 1503C336.734 1503 0.5 1166.77 0.5 752C0.5 337.234 336.734 1 751.5 1C1166.27 1 1502.5 337.234 1502.5 752ZM538.688 1050.86H392.94C362.314 1050.86 347.186 1050.86 337.962 1044.96C327.999 1038.5 321.911 1027.8 321.173 1015.99C320.619 1005.11 328.184 991.822 343.312 965.255L703.182 330.935C718.495 303.999 726.243 290.531 736.021 285.55C746.537 280.2 759.083 280.2 769.599 285.55C779.377 290.531 787.126 303.999 802.438 330.935L876.42 460.079L876.797 460.738C893.336 489.635 901.723 504.289 905.385 519.669C909.443 536.458 909.443 554.169 905.385 570.958C901.695 586.455 893.393 601.215 876.604 630.549L687.573 964.702L687.084 965.558C670.436 994.693 661.999 1009.46 650.306 1020.6C637.576 1032.78 622.263 1041.63 605.474 1046.62C590.161 1050.86 573.004 1050.86 538.688 1050.86ZM906.75 1050.86H1115.59C1146.4 1050.86 1161.9 1050.86 1171.13 1044.78C1181.09 1038.32 1187.36 1027.43 1187.92 1015.63C1188.45 1005.1 1181.05 992.33 1166.55 967.307C1166.05 966.455 1165.55 965.588 1165.04 964.706L1060.43 785.75L1059.24 783.735C1044.54 758.877 1037.12 746.324 1027.59 741.472C1017.08 736.121 1004.71 736.121 994.199 741.472C984.605 746.453 976.857 759.552 961.544 785.934L857.306 964.891L856.949 965.507C841.69 991.847 834.064 1005.01 834.614 1015.81C835.352 1027.62 841.44 1038.5 851.402 1044.96C860.443 1050.86 875.94 1050.86 906.75 1050.86Z"
      fill="#E84142"
    />
  </svg>
);

const Solana = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 101 88"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M100.48 69.3817L83.8068 86.8015C83.4444 87.1799 83.0058 87.4816 82.5185 87.6878C82.0312 87.894 81.5055 88.0003 80.9743 88H1.93563C1.55849 88 1.18957 87.8926 0.874202 87.6912C0.558829 87.4897 0.31074 87.2029 0.160416 86.8659C0.0100923 86.529 -0.0359181 86.1566 0.0280382 85.7945C0.0919944 85.4324 0.263131 85.0964 0.520422 84.8278L17.2061 67.408C17.5676 67.0306 18.0047 66.7295 18.4904 66.5234C18.9762 66.3172 19.5002 66.2104 20.0301 66.2095H99.0644C99.4415 66.2095 99.8104 66.3169 100.126 66.5183C100.441 66.7198 100.689 67.0067 100.84 67.3436C100.99 67.6806 101.036 68.0529 100.972 68.415C100.908 68.7771 100.737 69.1131 100.48 69.3817ZM83.8068 34.3032C83.4444 33.9248 83.0058 33.6231 82.5185 33.4169C82.0312 33.2108 81.5055 33.1045 80.9743 33.1048H1.93563C1.55849 33.1048 1.18957 33.2121 0.874202 33.4136C0.558829 33.6151 0.31074 33.9019 0.160416 34.2388C0.0100923 34.5758 -0.0359181 34.9482 0.0280382 35.3103C0.0919944 35.6723 0.263131 36.0083 0.520422 36.277L17.2061 53.6968C17.5676 54.0742 18.0047 54.3752 18.4904 54.5814C18.9762 54.7875 19.5002 54.8944 20.0301 54.8952H99.0644C99.4415 54.8952 99.8104 54.7879 100.126 54.5864C100.441 54.3849 100.689 54.0981 100.84 53.7612C100.99 53.4242 101.036 53.0518 100.972 52.6897C100.908 52.3277 100.737 51.9917 100.48 51.723L83.8068 34.3032ZM1.93563 21.7905H80.9743C81.5055 21.7907 82.0312 21.6845 82.5185 21.4783C83.0058 21.2721 83.4444 20.9704 83.8068 20.592L100.48 3.17219C100.737 2.90357 100.908 2.56758 100.972 2.2055C101.036 1.84342 100.99 1.47103 100.84 1.13408C100.689 0.79713 100.441 0.510296 100.126 0.308823C99.8104 0.107349 99.4415 1.24074e-05 99.0644 0L20.0301 0C19.5002 0.000878397 18.9762 0.107699 18.4904 0.313848C18.0047 0.519998 17.5676 0.821087 17.2061 1.19848L0.524723 18.6183C0.267681 18.8866 0.0966198 19.2223 0.0325185 19.5839C-0.0315829 19.9456 0.0140624 20.3177 0.163856 20.6545C0.31365 20.9913 0.561081 21.2781 0.875804 21.4799C1.19053 21.6817 1.55886 21.7896 1.93563 21.7905Z"
      fill="url(#paint0_linear_174_4403)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_174_4403"
        x1="8.52558"
        y1="90.0973"
        x2="88.9933"
        y2="-3.01622"
        gradientUnits="userSpaceOnUse">
        <stop offset="0.08" stop-color="#9945FF" />
        <stop offset="0.3" stop-color="#8752F3" />
        <stop offset="0.5" stop-color="#5497D5" />
        <stop offset="0.6" stop-color="#43B4CA" />
        <stop offset="0.72" stop-color="#28E0B9" />
        <stop offset="0.97" stop-color="#19FB9B" />
      </linearGradient>
    </defs>
  </svg>
);

const Celestia = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 56.106 56.106">
    <path
      fill="#FFF"
      fillRule="nonzero"
      d="M52.527 25.417a.522.522 0 0 1-.897.028 30.497 30.497 0 0 0-2.737-3.614.428.428 0 0 1 .323-.71h.01c2.304 0 3.513.57 3.882 1.265.308.582.213 1.599-.581 3.03m-.515 12.056c-.124.315-.253.627-.39.937-.02.042-.04.085-.063.128-.848 1.633-2.272 2.919-4.174 3.814a.55.55 0 0 1-.767-.644c.632-2.261 1.11-4.713 1.42-7.284.057-.48.294-.92.66-1.235a41.84 41.84 0 0 0 2.184-2.024l.008-.008a.619.619 0 0 1 1.03.26c.663 2.207.7 4.263.092 6.056m-5.172 8.163a25.533 25.533 0 0 1-1.669 1.629c-.231.206-.581-.052-.45-.333l.111-.242c.154-.34.303-.689.448-1.044a.287.287 0 0 1 .194-.169c.365-.092.72-.195 1.067-.306.28-.09.5.25.3.465m-3.799-2.04a22.39 22.39 0 0 1-2.42.212c-2.062.072-4.242-.106-6.48-.518a.29.29 0 0 1-.079-.544c.489-.248.978-.5 1.466-.76 3.426-1.815 6.623-3.8 9.421-5.836a.29.29 0 0 1 .457.284c-.388 2.332-.926 4.528-1.6 6.521a.953.953 0 0 1-.765.64m-.792 3.108c-1.837 3.612-4.099 5.64-6.292 5.6-2.383-.042-4.76-2.524-6.52-6.81l-.002-.004a.54.54 0 0 1 .286-.7l.056-.025a.548.548 0 0 1 .367-.025c3.292.924 6.536 1.406 9.575 1.406a25.838 25.838 0 0 0 2.107-.081.44.44 0 0 1 .423.639m-10.878 6.87c-1.092.14-2.2.212-3.32.212-5 0-9.784-1.417-13.892-4.062-.282-.182-.162-.62.174-.636l.192-.01a27.765 27.765 0 0 0 3.428-.46c2.638-.507 5.57-1.378 8.64-2.55a.543.543 0 0 1 .695.304c0 .002 0 .003.002.005 1.19 2.897 2.654 5.086 4.298 6.478a.41.41 0 0 1-.217.719m-14.88-18.029c2.268-1.846 4.924-3.688 7.839-5.433.062 3.728.471 7.306 1.194 10.539a47.035 47.035 0 0 1-3.226-1.524 45.728 45.728 0 0 1-5.807-3.582m-7.05 9.987c-.542-1.02.157-3.384 3.709-6.977l.002-.002a.884.884 0 0 0-.08-1.315 43.63 43.63 0 0 1-.423-.338.888.888 0 0 0-1.187.062l-.138.139c-1.775 1.822-3.018 3.51-3.714 5.026a.606.606 0 0 1-1.054.082c-2.755-4.165-4.235-9.046-4.235-14.154 0-1.827.19-3.624.558-5.37.056-.264.429-.28.507-.022.534 1.762 1.403 3.585 2.603 5.429 1.617 2.482 3.748 4.868 6.274 7.056.862.747 1.772 1.47 2.722 2.167a47.873 47.873 0 0 0 6.242 3.872 58.04 58.04 0 0 0 2.931 1.445 2.23 2.23 0 0 0 1.73.046c.465-.181.932-.37 1.402-.567a1.12 1.12 0 0 0 .653-1.307l-.038-.153c-.775-3.26-1.206-6.931-1.256-10.776h-.002v-.138c-.003-.21-.002-.422-.005-.631-.002-.067 0-.18.001-.247v-.08h.001a57.082 57.082 0 0 1 .077-2.686h-.001c.239-4.64 1.025-8.999 2.277-12.666a.648.648 0 0 0-.404-.823c-.331-.113-.662-.221-.992-.325a.645.645 0 0 0-.803.407c-1.356 3.983-2.194 8.707-2.417 13.707a1.882 1.882 0 0 1-.92 1.535c-2.96 1.755-5.68 3.615-8.03 5.49a1.3 1.3 0 0 1-1.662-.034c-2.354-2.041-4.336-4.259-5.834-6.56-2.944-4.52-3.644-8.779-1.97-11.989a25.663 25.663 0 0 1 .68-1.071C8.57 11.216 12.15 9.74 16.899 9.573c.3-.01.603-.016.908-.016 2.913 0 6.039.481 9.218 1.398l.21.061c.053.016.107.03.16.047.735.22 1.472.463 2.21.728l.052.019a42.974 42.974 0 0 1 .756.282l.174.066c1.552.602 3.103 1.3 4.635 2.097 2.965 1.54 5.68 3.346 8.041 5.328-4.507 1.032-9.747 3.024-15.015 5.71a.77.77 0 0 0-.419.641c-.018.326-.042.983-.06 1.505a.427.427 0 0 0 .626.392l.003-.002c5.216-2.739 10.422-4.786 14.892-5.868a1.67 1.67 0 0 0 1.26-1.856 45.778 45.778 0 0 0-.278-1.756 2.922 2.922 0 0 0-1.108-1.813 47.513 47.513 0 0 0-6.872-4.342 48.457 48.457 0 0 0-5.046-2.269.636.636 0 0 1-.328-.904c1.744-3.12 3.818-4.867 5.838-4.867h.063c2.384.043 4.76 2.525 6.52 6.81.891 2.169 1.581 4.67 2.053 7.388l-.007-.006c.201 1.16.363 2.358.484 3.588l-.032.02.043.043a57.57 57.57 0 0 1 .026 10.5c-3.188 2.576-7.13 5.14-11.464 7.437a83.064 83.064 0 0 1-4.259 2.104l-.065.03c-.108.05-.216.1-.324.148h-.002a73.954 73.954 0 0 1-3.464 1.464l-.192.075-.24.093-.57.216-.157.06c-.23.085-.46.168-.688.25l-.085.03h-.001c-2.44.869-4.763 1.525-6.88 1.932-5.116.985-7.525.23-8.074-.806m3.675-38.434c4.33-3.101 9.505-4.774 14.937-4.774 1.434 0 2.849.117 4.236.346a.434.434 0 0 1 .2.767C31.145 4.49 29.896 6.048 28.79 8.07c-.27.493-.842.734-1.383.582-3.66-1.031-7.263-1.516-10.59-1.4-1.228.044-2.39.168-3.483.37-.307.056-.473-.345-.22-.526m35.321 18.753a.299.299 0 0 1 .542-.18 23.448 23.448 0 0 1 1.328 2.07.648.648 0 0 1-.084.757 30.108 30.108 0 0 1-1.375 1.412.257.257 0 0 1-.437-.193 60.4 60.4 0 0 0 .026-3.866M45.768 9.39a25.678 25.678 0 0 1 6.146 9 .433.433 0 0 1-.479.59 12.944 12.944 0 0 0-2.491-.177 1.297 1.297 0 0 1-1.305-1.064c-.5-2.806-1.223-5.397-2.152-7.659a25.635 25.635 0 0 0-.16-.382c-.119-.275.224-.515.44-.308M55.5 22.218c-1.109-5.267-3.715-10.106-7.61-14.002C42.59 2.918 35.545 0 28.052 0S13.515 2.918 8.216 8.216a28.352 28.352 0 0 0-3.434 4.158c-.297.395-.563.813-.8 1.25C1.386 17.938 0 22.89 0 28.053c0 7.493 2.918 14.538 8.216 19.836 5.299 5.299 12.344 8.217 19.837 8.217s14.538-2.918 19.836-8.217c2.5-2.5 4.47-5.39 5.854-8.532a9.96 9.96 0 0 0 .444-1.068 28.035 28.035 0 0 0 1.919-10.236c0-1.96-.202-3.887-.59-5.762l-.016-.073"
    />
  </svg>
);