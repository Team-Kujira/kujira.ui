import { Denom } from "kujira.js";
import {
  IconARCH,
  IconBTC,
  IconCoinDefault,
  IconKuji,
  IconLoopToken,
  IconLuna,
  IconSKuji,
  IconTORI,
  IconUSK,
  IconWarning,
} from ".";
import { i18n } from "..";
import { IconWBNB } from "./IconBNB";
import { IconCNTO } from "./IconCNTO";
import { IconFIS } from "./IconFIS";
import { IconFRNZ } from "./IconFRNZ";
import { IconLink } from "./IconLink";
import { IconLunc } from "./IconLunc";
import { IconPAXG } from "./IconPAXG";
import { IconQCKUJI, IconQCMNTA } from "./IconQuark";
import { IconRATOM } from "./IconRATOM";
import { IconSAvax } from "./IconSAvax";
import { IconSPERM } from "./IconSPERM";
import { IconSTATOM } from "./IconSTATOM";
import { IconSTJUNO } from "./IconSTJUNO";
import { IconSTOSMO } from "./IconSTOSMO";
import { IconSTSCRT } from "./IconSTSCRT";
import { IconSWTH } from "./IconSWTH";
import { IconWHALE } from "./IconWHALE";
import { IconWSTETH } from "./IconWSTETH";
import mnta from "./MNTA.png";
import neok from "./NEOK.png";
import wink from "./WINK.png";

const makeID = (length: number) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(
      Math.floor(Math.random() * charactersLength)
    );
    counter += 1;
  }
  return result;
};

export const IconDenom: React.FC<{ denom: Denom | string }> = ({
  denom,
}) => {
  const warning =
    typeof denom !== "string" &&
    denom.trace &&
    denom.trace.path.split("/").length > 2 &&
    i18n.t("Indirect IBC token. Possibly spoofed");

  return warning ? (
    <IconWarning
      className="color-red icon-denom"
      data-tip={warning}
    />
  ) : (
    <IconDenomInner denom={denom} />
  );
};
const IconDenomInner: React.FC<{ denom: Denom | string }> = ({
  denom,
}) => {
  if (!denom) return null;
  const token =
    typeof denom === "string" ? denom : denom.symbol.toLowerCase();

  if (typeof denom !== "string" && denom.underlying?.length === 1) {
    return (
      <div className="icon-denom">
        {denom.underlying.length === 1 ? (
          <img
            className="icon-denom"
            src={
              new URL(
                `../assets/ghost/${denom.underlying[0].symbol.toLowerCase()}.png`,
                import.meta.url
              ).href
            }
            alt={denom.underlying[0].symbol}
          />
        ) : (
          <IconDenom denom={denom.underlying[0]} />
        )}
        {denom.underlying
          .slice(1, denom.underlying.length)
          .map((d, idx) => (
            <IconDenom key={idx} denom={d} />
          ))}
      </div>
    );
  }
  if (typeof denom !== "string" && denom.underlying) {
    return (
      <>
        <IconDenom denom={denom.underlying[0]} />
        {denom.underlying
          .slice(1, denom.underlying.length)
          .map((d, idx) => (
            <IconDenom key={idx} denom={d} />
          ))}
      </>
    );
  }

  switch (token) {
    case "aqua":
      return <IconAQUA />;
    case "atom":
      return <IconAtom />;
    case "btc":
      return <IconBTC />;
    case "nbtc":
    case "nbtcc":
      return <IconNBTC />;
    case "luna":
      return <IconLuna />;
    case "lunc":
      return <IconLunc />;
    case "avax":
      return <IconAvax />;
    case "wasavax":
    case "savax":
      return <IconSAvax />;
    case "ksm":
      return <KSM />;
    case "lksm":
      return <LKSM />;
    case "kar":
      return <KAR />;
    case "ampkuji":
      return <IconAmpKUJI />;
    case "kuji":
      return <IconKuji />;
    case "skuji":
      return <IconSKuji />;
    case "usk":
      return <IconUSK />;
    case "nstk":
      return <IconNSTK />;
    case "osmo":
      return <IconOSMO />;
    case "demo":
      return <IconDEMO />;
    case "evmos":
      return <IconEVMOS />;
    case "sei":
      return <IconSEI />;
    case "axl":
    case "waxl":
      return <IconAXL />;
    case "wavax":
      return <IconWAVAX />;
    case "usdc":
    case "axlusdc":
    case "gusdc":
      return <IconUSDC />;
    case "eth":
    case "weth":
    case "gweth":
      return <IconETH />;
    case "scrt":
      return <IconSCRT />;
    case "ftm":
    case "wftm":
      return <IconWFTM />;
    case "matic":
    case "wmatic":
      return <IconWMatic />;
    case "dot":
    case "ldot":
      return <IconDot />;
    case "loop":
      return <IconLoopToken />;
    case "ausd":
      return <IconAUSD />;
    case "local":
    case "whlocal":
      return <IconLocal />;
    case "shd":
      return <SHD />;
    case "shd.legacy":
      return <SHD />;
    case "calc":
      return <IconCalc />;
    case "strd":
      return <IconStrd />;
    case "statom":
      return <IconSTATOM />;
    case "stjuno":
      return <IconSTJUNO />;
    case "stosmo":
      return <IconSTOSMO />;
    case "stscrt":
      return <IconSTSCRT />;
    case "cmst":
      return <IconCMST />;
    case "gpaxg":
    case "paxg":
      return <IconPAXG />;
    case "ratom":
      return <IconRATOM />;
    case "fis":
      return <IconFIS />;
    case "link":
      return <IconLink />;
    case "cnto":
      return <IconCNTO />;
    case "swth":
      return <IconSWTH />;
    case "ampwhale":
      return <IconAmpWHALE />;
    case "whale":
      return <IconWHALE />;
    case "roar":
      return <IconROAR />;
    case "frnz":
    case "frienzies":
      return <IconFRNZ />;
    case "hans":
      return <IconHans />;
    case "sperm":
      return <IconSPERM />;
    case "tori":
      return <IconTORI />;
    case "arch":
      return <IconARCH />;
    case "qcmnta":
      return <IconQCMNTA />;
    case "qckuji":
      return <IconQCKUJI />;
    case "fuzn":
      return <IconFUZN />;
    case "rfuzn":
      return <IconRFUZN />;
    case "mnta":
      return <img className="icon-denom" src={mnta} alt="MNTA" />;
    case "wink":
      return <img className="icon-denom" src={wink} alt="WINK" />;
    case "neok":
      return <img className="icon-denom" src={neok} alt="NEOK" />;

    case "wsteth":
      return <IconWSTETH />;
    case "tia":
      return (
        <img
          className="icon-denom"
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/celestia/images/celestia.png"
          alt="TIA"
        />
      );

    case "dydx":
      return (
        <img
          className="icon-denom"
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/dydx/images/dydx.png"
          alt="DYDX"
        />
      );

    case "rio":
      return (
        <img
          className="icon-denom"
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/realio/images/rio.png"
          alt="INJ"
        />
      );

    case "inj":
    case "ginj":
      return (
        <img
          className="icon-denom"
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/injective/images/inj.png"
          alt="INJ"
        />
      );

    case "stinj":
      return (
        <img
          className="icon-denom"
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/stinj.svg"
          alt="stINJ"
        />
      );

    case "yieldeth":
      return (
        <img
          className="icon-denom"
          src="https://app.sommelier.finance/assets/icons/real-yield-eth.png"
          alt="yieldETH"
        />
      );

    case "ntrn":
      return (
        <img
          className="icon-denom"
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/neutron/images/ntrn.png?raw=true"
          alt="NTRN"
        />
      );

    case "silk":
      return (
        <img
          className="icon-denom"
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/secretnetwork/images/silk.png"
          alt="SILK"
        />
      );
    case "acre":
      return (
        <img
          className="icon-denom"
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/acrechain/images/acre.svg"
          alt="ACRE"
        />
      );

    case "akt":
      return (
        <img
          className="icon-denom"
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/akash/images/akt.svg"
          alt="AKT"
        />
      );

    case "cre":
      return (
        <img
          className="icon-denom"
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/crescent/images/cre.svg"
          alt="CRE"
        />
      );

    case "dvpn":
      return (
        <img
          className="icon-denom"
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/sentinel/images/dvpn.svg"
          alt="DVPN"
        />
      );

    case "fet":
      return (
        <img
          className="icon-denom"
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/fetchhub/images/fet.svg"
          alt="FET"
        />
      );

    case "glto":
      return (
        <img
          className="icon-denom"
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/glto.svg"
          alt="GLTO"
        />
      );

    case "mntl":
      return (
        <img
          className="icon-denom"
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/assetmantle/images/mntl.svg"
          alt="MNTL"
        />
      );

    case "flix":
      return (
        <img
          className="icon-denom"
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/omniflixhub/images/flix.svg"
          alt="FLIX"
        />
      );

    case "regen":
      return (
        <img
          className="icon-denom"
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/regen/images/regen.svg"
          alt="REGEN"
        />
      );

    case "somm":
      return (
        <img
          className="icon-denom"
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/sommelier/images/somm.svg"
          alt="SOMM"
        />
      );

    case "plq":
      return (
        <img
          className="icon-denom"
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/planq/images/planq.svg"
          alt="PLQ"
        />
      );

    case "wglmr":
      return (
        <img
          className="icon-denom"
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/moonbeam/images/glmr.png"
          alt="wGMLR"
        />
      );

    case "ampluna":
      return (
        <img
          className="icon-denom"
          src="https://www.erisprotocol.com/assets/ampLuna.svg"
          alt="FURY"
        />
      );
    case "astro":
      return (
        <img
          className="icon-denom"
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/terra/images/astro.png"
          alt="FURY"
        />
      );
    case "fury":
      return (
        <img
          className="icon-denom"
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/terra/images/fury.png"
          alt="FURY"
        />
      );

    case "rac":
      return (
        <img
          className="icon-denom"
          src="https://raw.githubusercontent.com/cosmorama/wynd-assets-list/main/images/RAC.png"
          alt="FURY"
        />
      );

    case "cmdx":
      return (
        <img
          className="icon-denom"
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/comdex/images/cmdx.png"
          alt="CMDX"
        />
      );
    case "ngm":
      return (
        <img
          className="icon-denom"
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/emoney/images/ngm.png"
          alt="NGM"
        />
      );

    case "grav":
    case "graviton":
      return (
        <img
          className="icon-denom"
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/gravitybridge/images/grav.png"
          alt="Gravitation"
        />
      );
    case "juno":
      return (
        <img
          className="icon-denom"
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/juno.png"
          alt="Juno"
        />
      );
    case "stars":
      return (
        <img
          className="icon-denom"
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/stargaze/images/stars.png"
          alt="Stars"
        />
      );
    case "vdl":
      return (
        <img
          className="icon-denom"
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/vidulum/images/vdl.png"
          alt="VDL"
        />
      );
    case "xprt":
      return (
        <img
          className="icon-denom"
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/persistence/images/xprt.png"
          alt="XPRT"
        />
      );
    case "frax":
      return (
        <img
          className="icon-denom"
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/axelar/images/frax.svg"
          alt="FRAX"
        />
      );
    case "dai":
    case "gdai":
      return (
        <img
          className="icon-denom"
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/axelar/images/dai.png"
          alt="DAI"
        />
      );
    case "ust":
    case "ustc":
      return (
        <img
          className="icon-denom"
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/terra/images/ust.png"
          alt="UST"
        />
      );
    case "axlusdt":
    case "usdt":
    case "gusdt":
      return (
        <img
          className="icon-denom"
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/axelar/images/usdt.png"
          alt="USDT"
        />
      );
    case "pepe":
      return (
        <img
          className="icon-denom"
          src="https://s2.coinmarketcap.com/static/img/coins/128x128/24478.png"
          alt="PEPE"
        />
      );
    case "umee":
      return (
        <img
          className="icon-denom"
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/umee/images/umee.png"
          alt="umee"
        />
      );
    case "ist":
      return (
        <img
          className="icon-denom"
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/agoric/images/ist.png"
          alt="ist"
        />
      );
    case "wbtc":
    case "gwbtc":
      return (
        <img
          className="icon-denom"
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/axelar/images/wbtc.png"
          alt="wBTC"
        />
      );
    case "crbrus":
      return (
        <img
          className="icon-denom"
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/cerberus/images/crbrus.png"
          alt="CRBRUS"
        />
      );
    case "huahua":
      return (
        <img
          className="icon-denom"
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/chihuahua/images/huahua.png"
          alt="HUAHUA"
        />
      );
    case "cro":
      return (
        <img
          className="icon-denom"
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/cronos/images/cronos.png"
          alt="Cronos"
        />
      );
    case "eeur":
      return (
        <img
          className="icon-denom"
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/emoney/images/eeur.png"
          alt="e-Money EUR"
        />
      );
    case "ion":
      return (
        <img
          className="icon-denom"
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/ion.png"
          alt="ION"
        />
      );
    case "wbnb":
    case "bnb":
      return <IconWBNB />;
    /* return <IconBNB />; */
    case "mars":
      return <IconMars />;
    case "wtao":
    case "tao":
      return <IconTAO />;
    case "arb":
      return <IconARB />;
    case "bfit":
      return <IconBFIT />;
    case "uni":
      return <IconUNI />;
    default:
      return <IconCoinDefault />;
  }
};

const IconARB = () => (
  <svg
    className="icon-denom"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 140 140">
    <g fill="none" fillRule="nonzero">
      <path
        fill="#2D374B"
        d="m86.125 64.144 10.28-17.445 27.712 43.162.013 8.28-.09-56.998a4.29 4.29 0 0 0-1.986-3.42L72.163 9.027a4.398 4.398 0 0 0-3.812.018 4.342 4.342 0 0 0-.447.258l-.174.11-48.428 28.063-.189.085c-.25.116-.49.256-.715.417a4.28 4.28 0 0 0-1.787 3.228l.076 46.448 25.812-40.007c3.25-5.304 10.33-7.013 16.903-6.92l7.714.199L21.66 113.82l5.359 3.085L73.019 41l20.332-.074-45.88 77.82 19.12 11.003 2.286 1.314a4.39 4.39 0 0 0 3.08.061l50.592-29.319-9.678 5.605-26.746-43.265Zm3.922 56.496L70.737 90.33 82.523 70.33l25.361 39.973-17.838 10.338Z"
      />
      <path
        fill="#28A0F0"
        d="m70.736 90.331 19.311 30.308 17.839-10.338-25.36-39.972zM124.133 98.143l-.013-8.28L96.41 46.7 86.122 64.143l26.751 43.265 9.678-5.605a4.29 4.29 0 0 0 1.583-3.121v-.54Z"
      />
      <path
        fill="#FFF"
        d="m8.005 105.955 13.66 7.87 45.454-72.894-7.714-.2c-6.573-.093-13.654 1.616-16.903 6.921L16.69 87.66l-8.68 13.342v4.958l-.005-.004ZM93.353 40.93l-20.331.074-45.999 75.906 16.077 9.258 4.372-7.416z"
      />
      <path
        fill="#96BEDC"
        d="M132.697 40.825a12.95 12.95 0 0 0-6.079-10.41L76.074 1.347a13.147 13.147 0 0 0-11.597 0c-.422.212-49.154 28.476-49.154 28.476-.677.325-1.325.708-1.936 1.145A12.851 12.851 0 0 0 8 40.8v60.198l8.68-13.342-.067-46.446a4.315 4.315 0 0 1 1.787-3.228c.23-.165 49.793-28.854 49.95-28.933a4.398 4.398 0 0 1 3.813-.018l49.891 28.698a4.29 4.29 0 0 1 1.985 3.42v57.539a4.19 4.19 0 0 1-1.491 3.121l-9.678 5.605-4.988 2.894-17.839 10.338-18.09 10.484c-1 .353-2.095.332-3.08-.06l-21.404-12.311-4.372 7.415 19.236 11.074c.636.361 1.203.682 1.668.944.72.399 1.211.673 1.384.757 1.609.705 3.349 1.063 5.106 1.051a12.867 12.867 0 0 0 4.709-.886l52.545-30.43c3-2.334 4.814-5.878 4.95-9.677l.002-58.182Z"
      />
    </g>
  </svg>
);

const IconBFIT = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon-denom"
    viewBox="0 0 512 512">
    <circle cx="256" cy="256" r="256" fill="#00E9D7" />
    <circle
      cx="256.293"
      cy="256.293"
      r="190.293"
      fill="#00CEBE"
      fillRule="nonzero"
    />
    <path
      fill="#000"
      fillRule="nonzero"
      d="M261.28 263.877h-47.481l-.254-26.152h39.864c7.024 0 12.78-.889 17.265-2.666 4.486-1.862 7.829-4.528 10.03-7.998 2.285-3.555 3.427-7.872 3.427-12.95 0-5.755-1.1-10.41-3.3-13.965-2.116-3.554-5.459-6.136-10.03-7.744-4.485-1.608-10.283-2.412-17.392-2.412h-26.407V345h-38.085V160.156h64.492c10.748 0 20.355 1.016 28.818 3.047 8.548 2.031 15.785 5.121 21.709 9.268 5.925 4.147 10.453 9.394 13.584 15.742 3.132 6.263 4.697 13.711 4.697 22.344 0 7.617-1.735 14.642-5.205 21.074-3.385 6.432-8.76 11.68-16.123 15.742-7.278 4.063-16.8 6.305-28.564 6.729l-11.045 9.775ZM259.629 345h-56.24l14.854-29.707h41.386c6.687 0 12.146-1.058 16.377-3.174 4.232-2.2 7.364-5.163 9.395-8.887 2.031-3.724 3.047-7.998 3.047-12.822 0-5.417-.931-10.114-2.793-14.092-1.777-3.978-4.655-7.024-8.633-9.14-3.978-2.201-9.225-3.301-15.742-3.301h-36.69l.254-26.152h45.703l8.76 10.283c11.257-.169 20.313 1.819 27.168 5.967 6.94 4.062 11.976 9.352 15.108 15.869 3.216 6.517 4.824 13.499 4.824 20.947 0 11.849-2.582 21.836-7.744 29.961-5.163 8.04-12.738 14.092-22.725 18.154-9.902 4.063-22.005 6.094-36.309 6.094Z"
    />
  </svg>
);

const IconCalc = () => (
  <svg
    className="icon-denom"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z"
      fill="#191C25"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 22.5C17.799 22.5 22.5 17.799 22.5 12C22.5 6.20101 17.799 1.5 12 1.5C6.20101 1.5 1.5 6.20101 1.5 12C1.5 17.799 6.20101 22.5 12 22.5ZM12 23.5C18.3513 23.5 23.5 18.3513 23.5 12C23.5 5.64873 18.3513 0.5 12 0.5C5.64873 0.5 0.5 5.64873 0.5 12C0.5 18.3513 5.64873 23.5 12 23.5Z"
      fill="#FFB636"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.90128 12.0316C8.90128 10.3835 10.2055 9.04746 11.8144 9.04746C12.5811 9.04746 13.2776 9.35013 13.7982 9.84635L14.625 8.93606C13.8887 8.23423 12.8999 7.80407 11.8144 7.80407C9.53516 7.80407 7.6875 9.69681 7.6875 12.0316L8.90128 12.0316Z"
      fill="#FFB636"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.90128 11.9684C8.90128 13.6165 10.2055 14.9525 11.8144 14.9525C12.5811 14.9525 13.2776 14.6499 13.7982 14.1536L14.625 15.0639C13.8887 15.7658 12.8999 16.1959 11.8144 16.1959C9.53516 16.1959 7.6875 14.3032 7.6875 11.9684L8.90128 11.9684Z"
      fill="#9CCBF0"
    />
  </svg>
);

const SHD = () => (
  <svg
    className="icon-denom"
    width="40"
    height="40"
    viewBox="0 0 36 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    data-v-5477215f="">
    <path
      d="M14.9681 0.751949C21.1905 0.44129 25.3433 3.29338 29.2393 9.83998C34.0335 17.8956 31.5382 26.0359 26.4043 30.8452C29.6505 24.0412 28.9705 21.3013 21.8092 15.4524C14.6478 9.60341 14.1687 4.69824 14.9681 0.751949Z"
      fill="url(#paint0_linear_4159_2622)"></path>
    <path
      d="M36 16.1128C36 22.6871 32.0546 28.3419 26.398 30.8474C30.0228 27.4974 34.409 18.7763 29.4135 10.5476C24.9961 3.27135 18.4678 1.44061 14.9656 0.752001C16.5078 0.263534 18.1504 0 19.8547 0C28.7715 0 36 7.21394 36 16.1128Z"
      fill="url(#paint1_linear_4159_2622)"></path>
    <path
      d="M25.0319 31.2449C20.7797 31.9864 15.6627 29.311 10.7606 22.1568C5.46125 14.4228 8.46176 5.96094 13.5957 1.15155C10.3495 7.95552 11.0295 10.6955 18.1908 16.5445C25.3522 22.3935 25.8313 27.2986 25.0319 31.2449Z"
      fill="url(#paint2_linear_4159_2622)"></path>
    <path
      d="M4 15.884C4 9.30966 7.94534 3.65496 13.602 1.14935C9.97724 4.49932 5.59092 13.2204 10.5865 21.4491C15.0039 28.7254 21.5322 30.5562 25.0344 31.2448C23.4922 31.7333 21.8496 31.9968 20.1453 31.9968C11.2285 31.9968 4 24.7828 4 15.884Z"
      fill="url(#paint3_linear_4159_2622)"></path>
    <linearGradient
      id="paint0_linear_4159_2622"
      x1="14.9788"
      y1="0.75195"
      x2="26.5622"
      y2="30.8558"
      gradientUnits="userSpaceOnUse">
      <stop stopColor="#3A447C"></stop>
      <stop offset="0.523958" stopColor="#252945"></stop>
      <stop offset="1" stopColor="#121114"></stop>
    </linearGradient>
    <linearGradient
      id="paint1_linear_4159_2622"
      x1="14.9681"
      y1="0.827123"
      x2="26.6915"
      y2="30.8667"
      gradientUnits="userSpaceOnUse">
      <stop stopColor="#7387F6"></stop>
      <stop offset="0.473958" stopColor="#4B548D"></stop>
      <stop offset="1" stopColor="#1F1D23"></stop>
    </linearGradient>
    <linearGradient
      id="paint2_linear_4159_2622"
      x1="25.0212"
      y1="31.2449"
      x2="13.4378"
      y2="1.14102"
      gradientUnits="userSpaceOnUse">
      <stop stopColor="#53347A"></stop>
      <stop offset="0.523958" stopColor="#37244D"></stop>
      <stop offset="1" stopColor="#16141B"></stop>
    </linearGradient>
    <linearGradient
      id="paint3_linear_4159_2622"
      x1="25.032"
      y1="31.1696"
      x2="13.3085"
      y2="1.13013"
      gradientUnits="userSpaceOnUse">
      <stop stopColor="#A868F5"></stop>
      <stop offset="0.473958" stopColor="#684692"></stop>
      <stop offset="1" stopColor="#25222A"></stop>
    </linearGradient>
  </svg>
);

const KSM = () => (
  <svg className="icon-denom" viewBox="0 0 48 48">
    <g fill="none" fillRule="evenodd">
      <circle fill="#000" cx="24" cy="24" r="24" />
      <path
        d="M37.013 14.11c-.512-.404-1.122-.955-2.233-1.092-1.043-.138-2.106.56-2.824 1.023-.718.462-2.076 1.82-2.637 2.233-.56.413-1.997.797-4.309 2.184-2.312 1.387-11.382 7.211-11.382 7.211l2.361.03-10.527 5.42h1.053L5 32.272s1.338.354 2.46-.355v.325s12.533-4.939 14.953-3.66l-1.476.433c.128 0 2.51.158 2.51.158s.078 1.485 1.514 2.44c1.437.944 1.466 1.465 1.466 1.465s-.748.305-.748.689c0 0 1.102-.335 2.125-.305a8.13 8.13 0 0 1 1.919.305s-.079-.413-1.073-.689c-1.003-.285-1.977-1.357-2.459-1.948a2.757 2.757 0 0 1-.403-2.695c.344-.896 1.544-1.387 4.023-2.666 2.922-1.515 3.591-2.637 4.004-3.512.414-.876 1.024-2.617 1.368-3.434.433-1.053.964-1.613 1.407-1.948.433-.334 2.41-1.072 2.41-1.072s-1.505-1.309-1.987-1.692Z"
        fill="#FFF"
        fillRule="nonzero"
      />
    </g>
  </svg>
);

const LKSM = () => (
  <svg className="icon-denom" viewBox="0 0 48 48">
    <g fill="none" fillRule="evenodd">
      <circle fill="#fff" cx="24" cy="24" r="24" />
      <path
        d="M37.013 14.11c-.512-.404-1.122-.955-2.233-1.092-1.043-.138-2.106.56-2.824 1.023-.718.462-2.076 1.82-2.637 2.233-.56.413-1.997.797-4.309 2.184-2.312 1.387-11.382 7.211-11.382 7.211l2.361.03-10.527 5.42h1.053L5 32.272s1.338.354 2.46-.355v.325s12.533-4.939 14.953-3.66l-1.476.433c.128 0 2.51.158 2.51.158s.078 1.485 1.514 2.44c1.437.944 1.466 1.465 1.466 1.465s-.748.305-.748.689c0 0 1.102-.335 2.125-.305a8.13 8.13 0 0 1 1.919.305s-.079-.413-1.073-.689c-1.003-.285-1.977-1.357-2.459-1.948a2.757 2.757 0 0 1-.403-2.695c.344-.896 1.544-1.387 4.023-2.666 2.922-1.515 3.591-2.637 4.004-3.512.414-.876 1.024-2.617 1.368-3.434.433-1.053.964-1.613 1.407-1.948.433-.334 2.41-1.072 2.41-1.072s-1.505-1.309-1.987-1.692Z"
        fill="#000"
        fillRule="nonzero"
      />
    </g>
  </svg>
);

const KAR = () => (
  <svg
    className="icon-denom"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48">
    <defs>
      <linearGradient
        x1="73.344%"
        y1="-15.068%"
        x2="126.199%"
        y2="59.951%"
        id="kar">
        <stop stopColor="#5D6F84" offset="0%" />
        <stop stopColor="#354252" offset="100%" />
      </linearGradient>
    </defs>
    <g fill="none" fillRule="evenodd">
      <circle fill="#000" cx="24" cy="24" r="24" />
      <path
        d="m31.737 12-8.004 7.273a4.525 4.525 0 0 1-3.026 1.176l-2.386.005-.008-8.453H14V36.16h2.352a3.65 3.65 0 0 0 3.186-1.843c.006-.008.008-.017.013-.021.427-.768.641-2.283.6-3.318-.093-2.366-.474-2.981-.474-2.981-.08 1.621-1.773 1.709-1.773 1.709 1.205-1.15.548-2.021.548-2.021-2.133 1.519-2.666-.103-2.707-.25.067.057.674.564 1.828-1.017 1.22-1.67 2.846-4.455 3.88-5.171 1.037-.719 2.02-.66 2.02-.66s.567-.766 2.065-1.404c1.497-.634 2.457.296 2.457.296-1.531 1.235-3.61 3.263-3.726 6.17-.093 2.352 4.977 6.389 4.086 12.351.533-1.354.747-2.71.564-4.389-.146-1.354-1.02-4.183-1.02-4.183l4.87 6.728h5.385L27.63 21.698 38.154 12h-6.417Z"
        fill="url(#kar)"
        fillRule="nonzero"
      />
    </g>
  </svg>
);

const IconOSMO = () => (
  <svg
    className="icon-denom"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient
        x1="42.265%"
        y1="99.291%"
        x2="58.243%"
        y2=".72%"
        id="osmo_c">
        <stop stopColor="#81FFFF" offset="0%" />
        <stop stopColor="#FFF" stopOpacity="0" offset="62.02%" />
      </linearGradient>
      <linearGradient
        x1="83.115%"
        y1="25.17%"
        x2="34.596%"
        y2="65.27%"
        id="osmo_d">
        <stop stopColor="#FFF" offset="28.88%" />
        <stop stopColor="#FFF" stopOpacity="0" offset="77.96%" />
      </linearGradient>
      <linearGradient
        x1=".042%"
        y1="49.942%"
        x2="99.976%"
        y2="49.942%"
        id="osmo_e">
        <stop stopColor="#0002E9" offset="0%" />
        <stop stopColor="#FF00C7" offset="99.52%" />
      </linearGradient>
      <linearGradient
        x1="109.063%"
        y1="10.442%"
        x2="2.525%"
        y2="107.296%"
        id="osmo_f">
        <stop stopColor="#FFF" offset="28.88%" />
        <stop stopColor="#FFF" stopOpacity="0" offset="77.96%" />
      </linearGradient>
      <linearGradient
        x1=".079%"
        y1="49.942%"
        x2="100.136%"
        y2="49.942%"
        id="osmo_g">
        <stop stopColor="#000292" offset="0%" />
        <stop stopColor="#7D00C7" offset="99.52%" />
      </linearGradient>
      <linearGradient
        x1=".109%"
        y1="50.104%"
        x2="100.003%"
        y2="50.104%"
        id="osmo_h">
        <stop stopColor="#000292" offset="0%" />
        <stop stopColor="#BE00C7" offset="99.52%" />
      </linearGradient>
      <linearGradient
        x1="67.786%"
        y1="-.897%"
        x2="24.631%"
        y2="110.724%"
        id="osmo_i">
        <stop stopColor="#FFF" offset="28.88%" />
        <stop stopColor="#FFF" stopOpacity="0" offset="77.96%" />
      </linearGradient>
      <linearGradient
        x1="-.064%"
        y1="51.182%"
        x2="100.072%"
        y2="51.182%"
        id="osmo_j">
        <stop stopColor="#FFF" offset="28.88%" />
        <stop stopColor="#FFF" stopOpacity="0" offset="77.96%" />
      </linearGradient>
      <linearGradient
        x1="-.312%"
        y1="50.829%"
        x2="99.832%"
        y2="50.829%"
        id="osmo_k">
        <stop stopColor="#FFF" offset="28.88%" />
        <stop stopColor="#FFF" stopOpacity="0" offset="77.96%" />
      </linearGradient>
      <linearGradient
        x1="2.196%"
        y1="49.214%"
        x2="96.326%"
        y2="49.214%"
        id="osmo_l">
        <stop stopColor="#FFF" offset="28.88%" />
        <stop stopColor="#FFF" stopOpacity="0" offset="77.96%" />
      </linearGradient>
      <linearGradient
        x1=".916%"
        y1="49.12%"
        x2="95.036%"
        y2="49.12%"
        id="osmo_m">
        <stop stopColor="#FFF" offset="28.88%" />
        <stop stopColor="#FFF" stopOpacity="0" offset="77.96%" />
      </linearGradient>
      <linearGradient
        x1="-.658%"
        y1="49.851%"
        x2="98.752%"
        y2="49.851%"
        id="osmo_n">
        <stop stopColor="#FFF" offset="28.88%" />
        <stop stopColor="#FFF" stopOpacity="0" offset="77.96%" />
      </linearGradient>
      <linearGradient
        x1="-.109%"
        y1="49.812%"
        x2="99.306%"
        y2="49.812%"
        id="osmo_o">
        <stop stopColor="#FFF" offset="28.88%" />
        <stop stopColor="#FFF" stopOpacity="0" offset="77.96%" />
      </linearGradient>
      <radialGradient
        cx="94.881%"
        cy="41.12%"
        fx="94.881%"
        fy="41.12%"
        r="116.934%"
        gradientTransform="matrix(.95748 0 0 1 .04 0)"
        id="osmo_a">
        <stop stopColor="#FFEAFF" stopOpacity=".6" offset="0%" />
        <stop stopColor="#A087C9" offset="68.07%" />
        <stop stopColor="#10002F" offset="100%" />
      </radialGradient>
      <radialGradient
        cx="83.104%"
        cy="15.529%"
        fx="83.104%"
        fy="15.529%"
        r="97.809%"
        gradientTransform="matrix(1 0 0 .98202 0 .003)"
        id="osmo_b">
        <stop stopColor="#FFEAFF" stopOpacity=".6" offset="0%" />
        <stop stopColor="#A087C9" offset="68.07%" />
        <stop stopColor="#10002F" offset="100%" />
      </radialGradient>
    </defs>
    <g fillRule="nonzero" fill="none">
      <path
        d="M95.517 17.677c-1.016-3.92-4.285-7.84-10.168-12.204C80.627 1.997 75.616 0 71.62 0c-.8 0-1.525.074-2.252.222-1.816.37-3.414 1.701-4.43 3.698-1.235 2.367-1.526 5.547-.727 7.47.29.592.654 1.332 1.09 1.997-3.85 2.367-6.029 3.033-6.32 3.107C69.007 19.896 77.36 26.997 82.59 36.243l.072-.888c.218-2.44.944-5.252 1.961-8.136 1.017.296 2.034.444 3.051.444 2.687 0 5.012-1.11 6.464-3.107 1.453-1.997 2.034-4.66 1.38-6.879Z"
        fill="#5E12A0"
      />
      <path
        d="M80.842 25.074c6.61 1.85 9.297-3.328 8.426-6.805-.944-3.476-3.995-7.026-9.37-11.02-5.375-3.994-10.822-5.622-14.309-4.882-3.486.74-4.503 6.14-3.632 8.21.363.814 1.162 1.997 2.252 3.328-1.38.962-2.687 1.702-3.777 2.367 6.682 3.033 12.493 7.767 16.851 13.684.508-1.997 1.235-3.772 1.889-5.326.508.074 1.09.222 1.67.444Z"
        fill="url(#osmo_a)"
        transform="translate(4.216)"
      />
      <path
        d="M43 97.56c22.424 0 40.602-18.512 40.602-41.347S65.424 14.867 43 14.867c-22.424 0-40.603 18.511-40.603 41.346 0 22.835 18.179 41.346 40.603 41.346Z"
        fill="url(#osmo_b)"
        transform="translate(4.216)"
      />
      <path
        d="M90.142 14.867c-5.52-5.918-10.168-7.47-15.761-8.728-4.358-1.036-3.196-3.55 2.106-3.033-2.542-.887-4.939-1.11-6.682-.74-3.487.74-4.503 6.14-3.632 8.21.363.814 1.162 1.998 2.252 3.33a55.114 55.114 0 0 1-5.012 3.032c.654.296 1.453.665 2.397 1.183 2.47 1.331 5.157 3.55 5.157 3.55-4.068-3.55-3.196-5.177 2.397-9.171 1.743-1.258 4.94-1.11 7.917.444 2.978 1.553 6.465 5.473 6.465 5.473l-3.342 6.509.654.222c2.106.591 3.777.443 5.084-.074 1.526-.962 5.52-4.216 0-10.207Z"
        fill="#A98698"
        opacity=".6"
      />
      <path
        d="M74.308 9.69c1.453.591 3.341 1.626 5.665 3.18 2.76 1.849 5.158 3.92 6.683 5.547-2.542 3.402-4.213 8.062-5.23 11.317.509.74 1.09 1.479 1.598 2.219a60.76 60.76 0 0 1 2.542-7.323c.291.074.654.074 1.017.074.872 0 1.889-.148 2.688-.814.58-.443 1.235-1.257 1.162-2.736 0-1.405-1.09-3.18-3.341-5.326-1.598-1.553-3.777-3.254-5.956-4.807-6.247-4.216-10.605-5.4-12.566-3.403-1.307 1.332-1.162 2.959-.726 4.142-2.325 1.553-4.286 2.663-5.593 3.403.871.296 1.67.665 2.542 1.035 2.324-1.257 5.666-3.402 9.515-6.509Zm13.728 10.576c.218.37.29.74.29.962 0 .665-.217.887-.363 1.035-.29.222-.871.37-1.38.37.436-.887.945-1.627 1.453-2.367Zm-17.94-11.02c.217-.222.798-.37 1.743-.222-.727.591-1.453 1.11-2.18 1.627-.072-.518 0-1.036.436-1.406Z"
        fill="#5E12A0"
      />
      <path
        d="M47.215 12.426c-23.751 0-43 19.6-43 43.787 0 24.187 19.249 43.787 43 43.787 23.752 0 43-19.6 43-43.787 0-24.186-19.32-43.787-43-43.787Zm0 85.133c-22.444 0-40.602-18.49-40.602-41.346 0-22.855 18.158-41.346 40.602-41.346 22.444 0 40.603 18.491 40.603 41.346 0 22.855-18.231 41.346-40.603 41.346Z"
        fill="#5E12A0"
      />
      <path
        d="M43 97.56c22.424 0 40.602-18.512 40.602-41.347S65.424 14.867 43 14.867c-22.424 0-40.603 18.511-40.603 41.346 0 22.835 18.179 41.346 40.603 41.346Z"
        fill="url(#osmo_c)"
        opacity=".6"
        transform="translate(4.216)"
      />
      <path
        d="M46.924 92.53C24.771 88.904 9.736 67.676 13.367 45.117c1.598-9.985 6.537-18.49 13.51-24.63C16.71 26.479 9.155 36.908 7.121 49.63 3.56 72.19 18.597 93.417 40.678 97.041c12.348 2.071 24.26-1.849 33.048-9.541a40.103 40.103 0 0 1-26.802 5.03Z"
        fill="#A98698"
        opacity=".6"
      />
      <path
        d="M49.464 15.458c-10.242-1.7-20.192.666-28.327 5.917l-.29.296c3.122-1.923 7.698-3.624 7.698-3.624C16.778 25 13.147 32.914 13.147 32.914c4.576-9.024 18.013-15.385 28.545-15.828 10.532-.444 17.432 2.736 25.858 9.615 8.425 6.953 13.51 21.154 13.001 32.397-.436 11.242-6.246 20.34-6.246 20.34 3.995-5.252 6.392-9.098 7.917-13.018.29-1.183.581-2.367.726-3.624 3.632-22.485-11.33-43.713-33.484-47.338Z"
        fill="url(#osmo_d)"
        opacity=".6"
        transform="translate(4.216)"
      />
      <path
        d="M81.568 55.843c0 21.671-17.287 39.275-38.568 39.275-21.282 0-38.642-17.604-38.642-39.275h77.21Z"
        fill="url(#osmo_e)"
        transform="translate(4.216)"
      />
      <path
        d="M37.043 0c0 21.154-16.415 38.462-37.043 39.275h1.525c21.282 0 38.57-17.603 38.57-39.275h-3.052Z"
        opacity=".6"
        transform="translate(45.69 55.843)"
        fill="url(#osmo_f)"
      />
      <path
        d="M5.448 0H0c0 21.672 17.287 39.275 38.569 39.275.944 0 1.816 0 2.687-.074C21.282 37.722 5.448 20.71 5.448 0Z"
        opacity=".7"
        transform="translate(8.574 55.843)"
        fill="url(#osmo_g)"
      />
      <path
        d="M81.496 56.213c0-4.512-7.7-7.1-17.94-7.988-7.41-.592-14.89.148-23.462 2.81-7.408 2.22-14.09 1.85-18.957 1.258-10.823-1.258-16.779-1.406-16.779 3.92 0 7.692 15.399 17.308 38.496 13.98 11.695-1.702 17.723-5.178 24.624-7.545 7.48-2.515 14.018-2.441 14.018-6.435Z"
        fill="url(#osmo_h)"
        transform="translate(4.216)"
      />
      <path
        d="M59.854 37.574c3.61 0 6.537-2.98 6.537-6.657 0-3.676-2.927-6.657-6.537-6.657s-6.537 2.98-6.537 6.657 2.927 6.657 6.537 6.657ZM70.53 42.53c1.525 0 2.76-1.259 2.76-2.811s-1.235-2.81-2.76-2.81c-1.523 0-2.76 1.258-2.76 2.81s1.237 2.81 2.76 2.81Z"
        fill="#FFF"
      />
      <path
        d="M.81 8.128H.665C.229 8.054-.061 7.61.01 7.092.665 3.69 3.425.435 3.571.287c.29-.37.87-.37 1.161-.074.363.296.363.888.073 1.184-.073.074-2.615 3.106-3.196 6.065-.073.444-.436.666-.799.666Z"
        opacity=".6"
        transform="translate(79.599 17.464)"
        fill="url(#osmo_i)"
      />
      <path
        d="M44.533 87.056c1.123 0 2.033-.927 2.033-2.07 0-1.144-.91-2.072-2.033-2.072-1.124 0-2.034.928-2.034 2.072 0 1.143.91 2.07 2.034 2.07Z"
        fill="#FFF"
        opacity=".2"
      />
      <g
        opacity=".4"
        transform="translate(42.476 82.99)"
        fill="url(#osmo_j)">
        <path
          d="M.89 3.328A2.126 2.126 0 0 1 .89.37c.145-.148.29-.222.435-.37C1.035.074.817.222.6.444a2.125 2.125 0 0 0 0 2.958c.654.666 1.67.814 2.47.37a2.003 2.003 0 0 1-2.18-.444Z"
          opacity=".6"
        />
      </g>
      <path
        d="M45.254 84.393a.44.44 0 0 0 .436-.443.44.44 0 0 0-.436-.444.44.44 0 0 0-.436.444.44.44 0 0 0 .436.443Z"
        fill="#FFF"
        opacity=".3"
      />
      <path
        d="M55.137 86.02c1.124 0 2.034-.927 2.034-2.07 0-1.144-.91-2.071-2.034-2.071-1.123 0-2.033.927-2.033 2.07 0 1.144.91 2.072 2.033 2.072Z"
        fill="#FFF"
        opacity=".2"
      />
      <g
        opacity=".4"
        transform="translate(53.08 81.955)"
        fill="url(#osmo_k)">
        <path
          d="M.89 3.328A2.125 2.125 0 0 1 .89.37c.145-.148.29-.222.435-.37C1.035.074.817.222.6.444a2.125 2.125 0 0 0 0 2.958c.654.666 1.67.814 2.47.37a2.003 2.003 0 0 1-2.18-.444Z"
          opacity=".6"
        />
      </g>
      <path
        d="M55.859 83.358a.44.44 0 0 0 .436-.444.44.44 0 0 0-.436-.444.44.44 0 0 0-.436.444.44.44 0 0 0 .436.444Z"
        fill="#FFF"
        opacity=".3"
      />
      <path
        d="M49.903 90.828c.842 0 1.525-.695 1.525-1.553s-.683-1.553-1.525-1.553c-.843 0-1.526.695-1.526 1.553s.683 1.553 1.526 1.553Z"
        fill="#FFF"
        opacity=".2"
      />
      <g
        opacity=".4"
        transform="translate(48.314 87.798)"
        fill="url(#osmo_l)">
        <path
          d="M.717 2.44C.136 1.85.136.815.717.223.79.148.935.074 1.007 0 .79.074.645.222.5.37c-.581.592-.581 1.627 0 2.219.509.518 1.235.592 1.889.222a1.56 1.56 0 0 1-1.67-.37Z"
          opacity=".6"
        />
      </g>
      <path
        d="M50.411 88.758c.16 0 .29-.133.29-.296a.293.293 0 0 0-.29-.296c-.16 0-.29.132-.29.296 0 .163.13.296.29.296Z"
        fill="#FFF"
        opacity=".3"
      />
      <path
        d="M59.273 89.719c.842 0 1.525-.695 1.525-1.553s-.683-1.553-1.525-1.553c-.842 0-1.525.695-1.525 1.553s.683 1.553 1.525 1.553Z"
        fill="#FFF"
        opacity=".2"
      />
      <g
        opacity=".4"
        transform="translate(57.685 86.688)"
        fill="url(#osmo_m)">
        <path
          d="M.717 2.44C.136 1.85.136.814.717.223.79.148.935.074 1.007 0 .79.074.645.222.5.37c-.581.592-.581 1.627 0 2.219.509.518 1.235.591 1.889.222a1.56 1.56 0 0 1-1.67-.37Z"
          opacity=".6"
        />
      </g>
      <path
        d="M59.782 87.648c.16 0 .29-.132.29-.296a.293.293 0 0 0-.29-.296c-.16 0-.29.133-.29.296 0 .164.13.296.29.296Z"
        fill="#FFF"
        opacity=".3"
      />
      <path
        d="M35.884 86.317c1.846 0 3.342-1.524 3.342-3.403s-1.496-3.402-3.342-3.402c-1.845 0-3.34 1.523-3.34 3.402 0 1.88 1.495 3.403 3.34 3.403Z"
        fill="#FFF"
        opacity=".2"
      />
      <g
        opacity=".4"
        transform="translate(32.581 79.734)"
        fill="url(#osmo_n)">
        <path
          d="M1.416 5.325a3.437 3.437 0 0 1 0-4.807c.218-.222.436-.37.727-.518-.436.148-.8.444-1.162.74a3.437 3.437 0 0 0 0 4.807c1.09 1.11 2.76 1.332 4.067.518-1.235.518-2.687.296-3.632-.74Z"
          opacity=".6"
        />
      </g>
      <path
        d="M37.047 81.879a.733.733 0 0 0 .726-.74.733.733 0 0 0-.726-.74.733.733 0 0 0-.726.74c0 .409.325.74.726.74Z"
        fill="#FFF"
        opacity=".3"
      />
      <path
        d="M65.74 77.959c1.844 0 3.34-1.524 3.34-3.403s-1.496-3.402-3.34-3.402c-1.846 0-3.342 1.523-3.342 3.402 0 1.88 1.496 3.403 3.341 3.403Z"
        fill="#FFF"
        opacity=".2"
      />
      <g
        opacity=".4"
        transform="translate(62.36 71.376)"
        fill="url(#osmo_o)">
        <path
          d="M1.416 5.325a3.437 3.437 0 0 1 0-4.807c.218-.222.436-.37.727-.518-.436.148-.8.444-1.162.74a3.437 3.437 0 0 0 0 4.808c1.089 1.109 2.76 1.33 4.067.517-1.235.518-2.615.296-3.632-.74Z"
          opacity=".6"
        />
      </g>
      <path
        d="M66.9 73.52a.733.733 0 0 0 .726-.74.733.733 0 0 0-.727-.739.733.733 0 0 0-.726.74c0 .408.325.74.726.74Z"
        fill="#FFF"
        opacity=".3"
      />
    </g>
  </svg>
);

const IconDEMO = () => {
  const id = makeID(18);
  return (
    <svg
      className="icon-denom"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
          id={`demo_${id}`}>
          <stop stopColor="#FDFC47" offset="0%" />
          <stop stopColor="#24FE41" offset="100%" />
        </linearGradient>
      </defs>
      <path
        d="M97.222 27.778h-5.555c-1.541 0-2.778 1.237-2.778 2.621v13.89h-5.556V36.11a2.77 2.77 0 0 0-2.777-2.778h-8.334v-11.11h8.334a2.766 2.766 0 0 0 2.777-2.779V13.89a2.766 2.766 0 0 0-2.777-2.778H75a2.766 2.766 0 0 0-2.778 2.778v2.778H63.89a2.77 2.77 0 0 0-2.778 2.777v8.334H38.89v-8.334a2.77 2.77 0 0 0-2.778-2.777h-8.333v-2.778A2.766 2.766 0 0 0 25 11.11h-5.556a2.766 2.766 0 0 0-2.777 2.778v5.555a2.766 2.766 0 0 0 2.777 2.778h8.334v11.111h-8.334a2.77 2.77 0 0 0-2.777 2.778v8.333H11.11V30.556c0-1.541-1.237-2.622-2.778-2.622H2.778C1.237 27.934 0 29.171 0 30.556v22.222a2.77 2.77 0 0 0 2.778 2.778h8.333v13.888a2.77 2.77 0 0 0 2.778 2.778h8.333v13.89A2.77 2.77 0 0 0 25 88.888h16.667c1.54 0 2.777-1.237 2.777-2.622v-5.399a2.77 2.77 0 0 0-2.777-2.778h-8.334v-5.555h33.334v5.555h-8.334a2.77 2.77 0 0 0-2.777 2.778v5.4c0 1.54 1.237 2.62 2.777 2.62H75a2.77 2.77 0 0 0 2.778-2.777V72.222h8.333a2.77 2.77 0 0 0 2.778-2.778V55.556h8.333A2.77 2.77 0 0 0 100 52.778V30.556a2.764 2.764 0 0 0-2.778-2.778ZM38.89 61.11H27.778V44.444h11.11v16.667Zm33.333 0h-11.11V44.444h11.11v16.667Z"
        fill={`url(#demo_${id})`}
        fillRule="nonzero"
      />
    </svg>
  );
};

const IconEVMOS = () => (
  <svg
    className="icon-denom"
    viewBox="0 0 40 40"
    xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fillRule="evenodd">
      <circle fill="#ED4E33" cx="20" cy="20" r="20" />
      <path
        d="M16.448 10.738c-5.53 2.123-6.037 7.56-7.623 10.099-1.605 2.57-5.28 3.987-4.778 5.296.503 1.31 4.183-.097 7.095.739 2.877.825 6.891 4.527 12.422 2.404a9.902 9.902 0 0 0 5.795-5.944.459.459 0 0 0-.387-.614.454.454 0 0 0-.448.247 7.868 7.868 0 0 1-12.909 1.695 7.83 7.83 0 0 1-1.214-1.833 7.829 7.829 0 0 1-.25-.573 7.94 7.94 0 0 1-.198-.594 89.942 89.942 0 0 1 5.755-2.43 90.208 90.208 0 0 1 5.8-2.013 65.829 65.829 0 0 1 3.208-.902l.207-.052a.299.299 0 0 1 .35.183l.002.002c.031.084.059.168.089.252.191.54.334 1.088.429 1.636.041.24.304.37.518.255.794-.427 1.52-.842 2.17-1.242 2.418-1.49 3.759-2.753 3.484-3.469-.275-.716-2.116-.757-4.91-.246a44.275 44.275 0 0 0-3.49.796c-.893.237-1.835.508-2.815.812a93.405 93.405 0 0 0-5.8 2.016 94.307 94.307 0 0 0-5.321 2.227 7.868 7.868 0 0 1 10.727-7.377.454.454 0 0 0 .5-.117.459.459 0 0 0-.124-.715 9.907 9.907 0 0 0-8.284-.538Z"
        fill="#FFF"
        fillRule="nonzero"
      />
    </g>
  </svg>
);
const IconAXL = () => (
  <svg
    className="icon-denom"
    viewBox="0 0 300 300"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg">
    <rect
      id="Rectangle"
      fill="#000000"
      x="0"
      y="0"
      width="300"
      height="300"></rect>
    <path
      d="M161.686172,134.209181 L223.075503,73.1593001 L199.785536,50 L150.042609,99.4688104 L100.299682,50 L77.0111351,73.1593001 L138.399046,134.209181 C141.614589,137.406261 145.828599,139.005511 150.042609,139.005511 C154.256619,139.005511 158.470628,137.407681 161.686172,134.209181 Z M250.553914,199.427622 L200.810987,149.958811 L250.553914,100.488581 L227.265368,77.3292808 L165.878877,138.379161 C159.44921,144.774742 159.44921,155.142881 165.878877,161.538462 L227.265368,222.588342 L250.553914,199.429042 L250.553914,199.429042 L250.553914,199.427622 Z M149.957391,200.53119 L199.700318,250 L222.987445,226.8407 L161.600954,165.790819 C155.168447,159.395239 144.744915,159.395239 138.312408,165.790819 L76.9259175,226.8407 L100.214464,250 L149.957391,200.53119 L149.957391,200.53119 Z M134.121123,161.622259 C137.21026,158.550165 138.944438,154.385865 138.944438,150.042609 C138.944438,145.699352 137.21026,141.533633 134.121123,138.462959 L72.7346324,77.4130781 L49.4460857,100.573798 L99.1890126,150.042609 L49.4460857,199.512839 L72.7346324,222.67214 L134.122543,161.622259 L134.122543,161.622259 L134.121123,161.622259 Z"
      id="Shape"
      fill="#FFFFFF"
      fillRule="nonzero"></path>
  </svg>
);

const IconWAVAX = () => (
  <img
    className="icon-denom"
    src="https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/avalanche/images/avax.png"
    alt="wAVAX"
  />
);

const IconAQUA = () => (
  <svg
    className="icon-denom"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 446 446">
    <g fill="none" fillRule="evenodd">
      <circle
        cx="223"
        cy="223"
        r="214"
        fill="#262728"
        stroke="#27B8DA"
        stroke-width="18"
      />
      <path
        fill="#27B8DA"
        d="M167.51 182.722c1.742 4.336 3.543 8.083 4.667 12.023.377 1.325-.662 3.349-1.575 4.7-7.81 11.553-16.44 22.612-23.512 34.593-29.4 49.806 2.115 111.01 55.022 124.298 57.558 14.456 113.217-32.54 108.356-91.625-1.04-12.631-5.362-24.483-12.31-34.935-10.2-15.343-21.1-30.234-32.057-45.056-18.254-24.692-34.547-50.4-44.307-79.81-2.977-8.973-5.041-17.674-1.317-27.052 1.665-4.194 1.828-8.984 2.835-14.368 6.265 42.187 26.668 76.939 50.486 110.118 11.527 16.058 23.809 31.64 34.39 48.3 38.047 59.897-.35 132.596-62.271 147.039-58.267 13.59-116.213-27.71-122.182-87.452-1.598-15.991.93-31.097 7.303-45.668 8.888-20.323 22.918-37.235 36.472-55.105"
      />
      <path
        fill="#27B8DA"
        d="M178.53 207.972c7.196 11.232 7.211 11.243.287 20.733-8.293 11.366-15.283 23.224-17.21 37.602-4.23 31.567 19.09 63.137 50.718 68.237 38.032 6.133 71.665-21.172 73.138-59.702.538-14.096-4.21-26.93-12.363-38.214-10.993-15.217-22.955-29.74-33.82-45.042-13.699-19.296-24.9-39.896-31.812-62.805-2.626-8.702 2.062-14.541 4.861-22.782 1.223 4.57 2.08 7.953 3.034 11.309 6.915 24.324 19.62 45.704 34.126 66.072 10.89 15.292 22.58 30.016 33.43 45.336 10.551 14.9 16.026 31.403 14.86 50.057-2.026 32.396-26.857 61.318-58.767 67.685-43.268 8.633-83.398-19.306-89.786-62.887-2.934-20.018 2.66-38.202 14.006-54.684 4.768-6.927 9.921-13.59 15.298-20.915"
      />
      <path
        fill="#27B8DA"
        d="M192.176 230.09c2.799 3.939 5.235 6.716 6.809 9.917.594 1.207-.396 3.679-1.366 5.09-5.511 8.015-10.422 16.226-10.984 26.287-.841 15.066 7.558 29.017 21.279 35.345 13.826 6.376 30.057 3.586 41.056-7.057 10.626-10.283 14.565-26.39 8.023-39.876-4.511-9.302-10.735-17.914-17.063-26.167-15.282-19.928-30.353-39.95-41.708-62.477a104.967 104.967 0 0 1-3.141-6.776c-5.731-13.727-5.482-15.662 3.527-28.156 2.906 7.615 5.413 15.3 8.714 22.628 11.618 25.796 28 48.554 45.57 70.539 7.587 9.492 14.72 19.29 17.995 31.295 7.314 26.818-9.577 55.038-36.426 60.814-28.158 6.058-54.862-11.67-59.773-39.494-1.86-10.541-.583-20.623 4.28-30.002 3.785-7.293 8.466-14.121 13.208-21.91"
      />
      <path
        fill="#27B8DA"
        d="M183.154 160.923c7.985 27.53 24.725 49.627 41.099 71.963 6.86 9.357 14.02 18.603 19.779 28.627 6.04 10.52 3.813 21.504-4.136 29.203-7.886 7.638-19.918 8.871-29.42 3.017-8.945-5.512-13.452-16.747-10.158-26.827 1.62-4.959 4.339-9.56 7.155-15.597 3.082 4.201 5.932 7.084 7.42 10.552.709 1.652-1.076 4.453-1.904 6.67-3.168 8.48 2.178 16.455 10.855 16.115 7.315-.287 12.93-7.57 10.064-14.265-2.643-6.172-6.482-11.9-10.275-17.498-12.103-17.857-24.637-35.424-36.548-53.406-3.808-5.749-6.222-12.426-9.218-18.705-2.561-5.366-2.837-10.443 1.818-15.026 1.367-1.346 2.286-3.148 3.469-4.823"
      />
    </g>
  </svg>
);

const IconCMST = () => (
  <img
    className="icon-denom"
    src="https://raw.githubusercontent.com/cosmos/chain-registry/master/comdex/images/cmst.png"
    alt="CMST"
  />
);

const IconSEI = () => (
  <img
    className="icon-denom"
    src="https://raw.githubusercontent.com/cosmos/chain-registry/master/testnets/seitestnet2/images/sei.png"
    alt="SEI"
  />
);

const IconUSDC = () => (
  <svg
    className="icon-denom"
    xmlns="http://www.w3.org/2000/svg"
    data-name="86977684-12db-4850-8f30-233a7c267d11"
    viewBox="0 0 2000 2000">
    <path
      d="M1000 2000c554.17 0 1000-445.83 1000-1000S1554.17 0 1000 0 0 445.83 0 1000s445.83 1000 1000 1000z"
      fill="#2775ca"
    />
    <path
      d="M1275 1158.33c0-145.83-87.5-195.83-262.5-216.66-125-16.67-150-50-150-108.34s41.67-95.83 125-95.83c75 0 116.67 25 137.5 87.5 4.17 12.5 16.67 20.83 29.17 20.83h66.66c16.67 0 29.17-12.5 29.17-29.16v-4.17c-16.67-91.67-91.67-162.5-187.5-170.83v-100c0-16.67-12.5-29.17-33.33-33.34h-62.5c-16.67 0-29.17 12.5-33.34 33.34v95.83c-125 16.67-204.16 100-204.16 204.17 0 137.5 83.33 191.66 258.33 212.5 116.67 20.83 154.17 45.83 154.17 112.5s-58.34 112.5-137.5 112.5c-108.34 0-145.84-45.84-158.34-108.34-4.16-16.66-16.66-25-29.16-25h-70.84c-16.66 0-29.16 12.5-29.16 29.17v4.17c16.66 104.16 83.33 179.16 220.83 200v100c0 16.66 12.5 29.16 33.33 33.33h62.5c16.67 0 29.17-12.5 33.34-33.33v-100c125-20.84 208.33-108.34 208.33-220.84z"
      fill="#fff"
    />
    <path
      d="M787.5 1595.83c-325-116.66-491.67-479.16-370.83-800 62.5-175 200-308.33 370.83-370.83 16.67-8.33 25-20.83 25-41.67V325c0-16.67-8.33-29.17-25-33.33-4.17 0-12.5 0-16.67 4.16-395.83 125-612.5 545.84-487.5 941.67 75 233.33 254.17 412.5 487.5 487.5 16.67 8.33 33.34 0 37.5-16.67 4.17-4.16 4.17-8.33 4.17-16.66v-58.34c0-12.5-12.5-29.16-25-37.5zm441.67-1300c-16.67-8.33-33.34 0-37.5 16.67-4.17 4.17-4.17 8.33-4.17 16.67v58.33c0 16.67 12.5 33.33 25 41.67 325 116.66 491.67 479.16 370.83 800-62.5 175-200 308.33-370.83 370.83-16.67 8.33-25 20.83-25 41.67V1700c0 16.67 8.33 29.17 25 33.33 4.17 0 12.5 0 16.67-4.16 395.83-125 612.5-545.84 487.5-941.67-75-237.5-258.34-416.67-487.5-491.67z"
      fill="#fff"
    />
  </svg>
);

const IconETH = () => (
  <svg
    className="icon-denom"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fillRule="evenodd">
      <circle fill="#FFF" cx="49.938" cy="50.063" r="49.938" />
      <path
        fill="#3C3C3B"
        fillRule="nonzero"
        d="M50.093 70v20l24.486-34.579z"
      />
      <path
        fill="#343434"
        fillRule="nonzero"
        d="m50.093 10 24.486 40.748-24.486 14.579-24.672-14.579"
      />
      <path
        d="M50.093 10v29.533L25.421 50.748m0 4.673L50.093 70v20"
        fill="#8C8C8C"
        fillRule="nonzero"
      />
      <path
        fill="#141414"
        fillRule="nonzero"
        d="M50.093 39.533v25.794l24.486-14.579"
      />
      <path
        fill="#393939"
        fillRule="nonzero"
        d="m25.421 50.748 24.672-11.215v25.794"
      />
    </g>
  </svg>
);

const IconAtom = () => (
  <svg
    className="icon-denom"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 2500 2500">
    <circle cx="1250" cy="1250" r="1250" fill="#2e3148" />
    <circle cx="1250" cy="1250" r="725.31" fill="#1b1e36" />
    <path
      d="M1252.57 159.47c-134.93 0-244.34 489.4-244.34 1093.11s109.41 1093.11 244.34 1093.11 244.34-489.4 244.34-1093.11S1387.5 159.47 1252.57 159.47ZM1269.44 2284c-15.43 20.58-30.86 5.14-30.86 5.14-62.14-72-93.21-205.76-93.21-205.76-108.69-349.79-82.82-1100.82-82.82-1100.82 51.08-596.24 144-737.09 175.62-768.36a19.29 19.29 0 0 1 24.74-2c45.88 32.51 84.36 168.47 84.36 168.47 113.63 421.81 103.34 817.9 103.34 817.9 10.29 344.65-56.94 730.45-56.94 730.45-51.75 293.2-124.23 354.98-124.23 354.98Z"
      fill="#6f7390"
    />
    <path
      d="M2200.72 708.59c-67.18-117.08-546.09 31.58-1070 332s-893.47 638.89-826.34 755.92 546.09-31.58 1070-332 893.47-638.89 826.34-755.92ZM366.36 1780.45c-25.72-3.24-19.91-24.38-19.91-24.38 31.55-89.71 131.95-183.23 131.95-183.23 249.43-268.36 913.79-619.65 913.79-619.65 542.54-252.42 711.06-241.77 753.81-230a19.29 19.29 0 0 1 14 20.58c-5.14 56-104.17 157-104.17 157-309.12 308.59-657.83 496.81-657.83 496.81-293.83 180.5-661.93 314.09-661.93 314.09-280.09 100.93-369.7 68.78-369.7 68.78Z"
      fill="#6f7390"
    />
    <path
      d="M2198.35 1800.41c67.7-116.77-300.93-456.79-823-759.47S374.43 587.76 306.79 704.73s300.93 456.79 823.3 759.47 1000.62 453.19 1068.26 336.21ZM351.65 749.85c-10-23.71 11.11-29.42 11.11-29.42C456.22 702.78 587.5 743 587.5 743c357.15 81.33 994 480.25 994 480.25 490.33 343.11 565.53 494.24 576.8 537.14a19.29 19.29 0 0 1-10.7 22.43c-51.13 23.41-188.07-11.47-188.07-11.47-422.07-113.17-759.62-320.52-759.62-320.52-303.29-163.58-603.19-415.28-603.19-415.28-227.88-191.87-245-285.44-245-285.44Z"
      fill="#6f7390"
    />
    <circle cx="1250" cy="1250" r="128.6" fill="#b7b9c8" />
    <ellipse
      cx="1777.26"
      cy="756.17"
      rx="74.59"
      ry="77.16"
      fill="#b7b9c8"
    />
    <ellipse
      cx="552.98"
      cy="1018.52"
      rx="74.59"
      ry="77.16"
      fill="#b7b9c8"
    />
    <ellipse
      cx="1098.25"
      cy="1965.02"
      rx="74.59"
      ry="77.16"
      fill="#b7b9c8"
    />
  </svg>
);

const IconSCRT = () => (
  <svg
    className="icon-denom"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 122 122">
    <circle
      cx="61"
      cy="61"
      r="59"
      fill="#1b1b1b"
      stroke="#fff"
      strokeWidth="4"
    />
    <path
      d="M78.3 43.7c.8.8 2.1.7 2.7-.2.6-.7.5-1.8-.2-2.4-6.6-6.3-12.5-9.5-22.3-9-10.3.5-19.4 5.9-18.8 17.3.5 10.1 10.3 13.8 18.9 17.1 6.6 2.5 12.4 4.7 12.7 9.4.3 5.2-5 8.3-9.6 8.6-8.7.5-13.8-2.6-19.5-8.1-.7-.7-1.8-.7-2.5-.1-.8.7-.8 1.9-.1 2.7 6.4 6.4 13 9.6 22.6 9.1 9.6-.7 21.4-6.1 20.8-17.5-.5-9.9-9.9-13.6-18.4-16.8-7-2.7-13.5-5.2-13.8-10.9-.2-4.1 4.7-7.1 8.2-7.3 8.5-.4 13.8 2.6 19.3 8.1zm1.1 27.1c0 4.4-2.4 8.2-6 10.4l-.2-.1c1.3-1.8 1.5-4.1 1.5-6.3 0-6.5-7.1-9-14.6-11.7-8.3-3-17-6.1-17-14.9 0-4 1.8-8.3 5.3-10.3l.1.2c-.9 1.9-1.3 4-1.3 6.1 0 7.2 7.9 10.1 15.9 13.1 8.2 3 16.3 6 16.3 13.5z"
      fillRule="evenodd"
      clipRule="evenodd"
      fill="#fff"
    />
    <path
      d="M60.5 108c26.2 0 47.5-21.3 47.5-47.5S86.7 13 60.5 13 13 34.3 13 60.5 34.3 108 60.5 108z"
      fill="none"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const IconWFTM = () => (
  <svg
    className="icon-denom"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 96 96">
    <circle
      cx="48"
      cy="48"
      r="48"
      fillRule="evenodd"
      clipRule="evenodd"
      fill="#1969ff"
    />
    <path
      d="M45.1 15.3c1.6-.9 4.1-.9 5.7 0L67.3 24c1 .5 1.5 1.3 1.6 2.1v43.7c0 .9-.6 1.7-1.6 2.3l-16.5 8.7c-1.6.9-4.1.9-5.7 0L28.6 72c-1.1-.6-1.6-1.4-1.6-2.3V26c.1-.8.6-1.5 1.6-2.1l16.5-8.6zm21.2 35-15.5 8.2c-1.6.9-4.1.9-5.7 0l-15.5-8.2v19.3l15.5 8.1c.9.5 1.9 1 2.8 1h.1c.9 0 1.8-.5 2.7-.9l15.6-8.3V50.3zM24.4 68.8c0 1.7.2 2.8.6 3.6.3.6.8 1.1 1.7 1.7.2.1.4.3.7.4l.3.2.9.6-1.3 2.2-1-.6-.2-.1c-.3-.2-.5-.3-.8-.5-2.5-1.7-3.4-3.5-3.4-7.4v-.1h2.5zm22.3-30.1c-.1 0-.2.1-.3.1l-16.5 8.7 16.5 8.7c.1.1.2.1.3.1V38.7zm2.6 0v17.8c.1 0 .2-.1.3-.1l16.5-8.7L49.6 39c-.1-.2-.2-.2-.3-.3zm17-9.5L51.5 37l14.8 7.8V29.2zm-36.7 0v15.6L44.4 37l-14.8-7.8zm20-11.6c-.9-.5-2.4-.5-3.3 0l-16.5 8.7L46.3 35c.9.5 2.4.5 3.3 0l16.5-8.7-16.5-8.7zm19.1.9 1 .6.2.1c.3.2.5.3.8.5 2.5 1.7 3.4 3.5 3.4 7.4v.1h-2.6c0-1.7-.2-2.8-.6-3.6-.3-.6-.8-1.1-1.7-1.7-.2-.1-.4-.3-.7-.4l-.3-.2-.9-.6 1.4-2.2z"
      fill="#fff"
    />
  </svg>
);

const IconWMatic = () => (
  <svg
    className="icon-denom"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256">
    <g fill="none" fillRule="evenodd">
      <circle
        cx="128"
        cy="128"
        r="128"
        fill="#FFF"
        fillRule="nonzero"
      />
      <path
        fill="#2BBDF7"
        d="m107.816 116.065 20.137 44.651 29.966-17.274.023-.009v-34.576z"
      />
      <path
        fill="#2891F9"
        d="m196.707 82.933-18.7-7.045-19.989-1.615v107.445l29.988 17.283 23.67-48.44-14.928-46.836z"
      />
      <path
        fill="#2BBDF7"
        d="m194.829 74.31-6.946 17.279h-.009v107.433l29.993-17.279V74.31z"
      />
      <path
        fill="#2B6DEF"
        d="m188.007 57-29.993 17.292 29.993 17.288L218 74.292z"
      />
      <path
        fill="#2891F9"
        d="M127.97 126.132v-.009L97.982 92.567 38 74.274v107.433l29.984 17.288 8.569-59.454 21.428 3.892v-.015l29.993 17.283v-34.569z"
      />
      <path
        fill="#2B6DEF"
        d="M68 57 38 74.288l89.961 51.876 13.594-7.834 16.394-9.458z"
      />
      <path
        fill="#2BBDF7"
        d="M68.012 126.131v72.858l29.993-17.283v-38.287z"
      />
    </g>
  </svg>
);

const IconDot = () => (
  <svg
    className="icon-denom"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1000 1000">
    <g fill="#E6007A" fillRule="nonzero">
      <ellipse cx="500.241" cy="104.879" rx="180.329" ry="104.879" />
      <path d="M248.943 354.935c49.796-86.25 49.472-179.663-.725-208.644-50.197-28.982-131.257 17.444-181.053 103.694-49.797 86.25-49.473 179.664.724 208.645 50.197 28.98 131.257-17.445 181.054-103.695ZM933.239 750.009c49.796-86.25 49.5-179.648-.663-208.61-50.163-28.96-131.196 17.481-180.992 103.731-49.797 86.25-49.5 179.647.663 208.609 50.162 28.961 131.195-17.48 180.992-103.73ZM248.243 853.714c50.197-28.98 50.521-122.394.725-208.644S118.111 512.394 67.914 541.375c-50.196 28.981-50.52 122.395-.724 208.645 49.796 86.25 130.857 132.675 181.053 103.694ZM932.619 458.652c50.162-28.961 50.46-122.359.663-208.609-49.797-86.25-130.83-132.691-180.992-103.73-50.163 28.962-50.46 122.359-.664 208.61 49.797 86.25 130.83 132.69 180.993 103.73Z" />
      <ellipse cx="500.241" cy="895.121" rx="180.329" ry="104.879" />
    </g>
  </svg>
);

const IconAUSD = () => (
  <svg
    className="icon-denom"
    width="128"
    height="128"
    viewBox="0 0 128 128"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M64 128C99.3462 128 128 99.3462 128 64C128 28.6538 99.3462 0 64 0C28.6538 0 0 28.6538 0 64C0 99.3462 28.6538 128 64 128Z"
      fill="#E40C5B"
    />
    <path
      d="M64.0008 120.655C95.2903 120.655 120.656 95.2896 120.656 64C120.656 32.7104 95.2903 7.34525 64.0008 7.34525C32.7112 7.34525 7.34601 32.7104 7.34601 64C7.34601 95.2896 32.7112 120.655 64.0008 120.655Z"
      stroke="white"
      strokeWidth="2"
    />
    <path
      d="M52.2777 83.4153V98.182C52.2777 99.8552 51.9225 101.307 51.2122 102.536C50.502 103.755 49.483 104.685 48.1552 105.325C46.8275 105.965 45.2577 106.286 43.446 106.286C40.708 106.286 38.5515 105.573 36.9767 104.147C35.4017 102.722 34.599 100.77 34.568 98.2903V83.4153H40.0185V98.3988C40.0802 100.868 41.2227 102.102 43.446 102.102C44.568 102.102 45.4172 101.792 45.9937 101.173C46.57 100.553 46.8582 99.5455 46.8582 98.151V83.4153H52.2777Z"
      fill="white"
    />
    <path
      d="M67.2697 99.9793C67.2697 99.184 66.9867 98.564 66.4205 98.12C65.8647 97.6758 64.8817 97.216 63.4715 96.7408C62.0615 96.2658 60.9085 95.806 60.013 95.3618C57.1 93.926 55.6435 91.953 55.6435 89.4428C55.6435 88.1928 56.0037 87.0928 56.7242 86.1423C57.4552 85.1815 58.4845 84.4378 59.8122 83.911C61.1402 83.3738 62.6327 83.1053 64.29 83.1053C65.906 83.1053 67.3522 83.3945 68.6285 83.973C69.9152 84.5515 70.9137 85.378 71.6237 86.4523C72.334 87.5163 72.6892 88.7353 72.6892 90.109H67.2852C67.2852 89.1898 67.0022 88.477 66.436 87.9708C65.8802 87.4645 65.1237 87.2115 64.1665 87.2115C63.1987 87.2115 62.432 87.4285 61.8657 87.8623C61.31 88.2858 61.032 88.828 61.032 89.4893C61.032 90.0678 61.341 90.5945 61.9585 91.0698C62.576 91.5345 63.662 92.02 65.2162 92.5263C66.7705 93.022 68.047 93.5593 69.0455 94.1378C71.4745 95.5425 72.6892 97.4795 72.6892 99.9483C72.6892 101.921 71.948 103.471 70.4657 104.597C68.9837 105.723 66.9507 106.286 64.367 106.286C62.5452 106.286 60.8932 105.961 59.411 105.31C57.939 104.649 56.8272 103.75 56.076 102.614C55.3347 101.467 54.9642 100.15 54.9642 98.6623H60.399C60.399 99.8708 60.7077 100.765 61.3255 101.343C61.9532 101.911 62.9672 102.195 64.367 102.195C65.2627 102.195 65.9677 102.004 66.4825 101.622C67.0072 101.229 67.2697 100.682 67.2697 99.9793Z"
      fill="white"
    />
    <path
      d="M75.4685 105.976V83.4153H82.7098C84.6963 83.4153 86.4823 83.8697 88.0673 84.7787C89.6525 85.6775 90.8878 86.9533 91.773 88.606C92.6685 90.2485 93.1213 92.0925 93.1318 94.1377V95.176C93.1318 97.2418 92.6943 99.096 91.8193 100.739C90.9545 102.371 89.7298 103.652 88.1445 104.581C86.5698 105.501 84.8095 105.965 82.864 105.976H75.4685ZM80.8878 87.6143V101.792H82.7715C84.3258 101.792 85.5198 101.239 86.3535 100.134C87.1873 99.0187 87.6043 97.3658 87.6043 95.176V94.1998C87.6043 92.02 87.1873 90.3775 86.3535 89.2722C85.5198 88.167 84.3053 87.6143 82.7098 87.6143H80.8878Z"
      fill="white"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M63.9535 57.4943C61.7287 57.492 59.508 57.6782 57.3145 58.0513L60.6195 52.313C61.7337 52.2375 62.848 52.1997 63.9535 52.1997C66.5532 52.2015 69.1487 52.41 71.7155 52.8235L58.9222 30.5548L37.6135 67.6338L34.568 62.3332L58.8732 20.0237L58.9222 20.1107L58.9712 20.0266L88.3047 71.086H82.2142L75.3585 59.1538C71.6587 58.0398 67.8157 57.4798 63.9535 57.4915V57.4943ZM90.1897 67.7207L61.7915 18.2859H67.8822L93.235 62.4202L90.1897 67.7207ZM62.0052 42.6785L50.3432 62.986C54.5172 61.7212 59.4275 61.1555 64.0602 61.1555C64.4357 61.1555 64.811 61.1555 65.1862 61.17C67.817 61.2325 70.4385 61.5062 73.026 61.988L76.9172 68.7623C72.7997 67.238 68.4482 66.4525 64.0602 66.4413C57.6672 66.4185 51.3692 67.998 45.7362 71.0368L45.823 70.883L45.7045 71.086H39.6137L58.98 37.378L62.0052 42.6785Z"
      fill="white"
    />
  </svg>
);

const IconLocal = () => {
  const id = makeID(18);

  return (
    <svg
      className="icon-denom"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12Z"
        fill="#161721"
      />
      <path
        d="M18.6947 12C18.6947 15.6974 15.6974 18.6947 12 18.6947C8.30261 18.6947 5.3053 15.6974 5.3053 12C5.3053 8.30267 8.30261 5.30536 12 5.30536C15.6974 5.30536 18.6947 8.30267 18.6947 12Z"
        fill={`url(#${id})`}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.2916 13.1703C22.2442 13.5868 21.8443 13.8577 21.4323 13.78C21.0204 13.7022 20.7529 13.3052 20.795 12.8881C20.8997 11.8507 20.8203 10.8009 20.5583 9.78752C20.2964 8.77417 19.857 7.81738 19.2626 6.96072C19.0236 6.61628 19.0652 6.13939 19.3879 5.87173C19.7106 5.60406 20.1917 5.64717 20.435 5.98858C21.1696 7.01936 21.7103 8.1779 22.0282 9.40753C22.3461 10.6371 22.4346 11.9126 22.2916 13.1703Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.9301 3.50764C18.2738 3.74767 18.3215 4.22832 18.057 4.55355C17.7924 4.87879 17.316 4.92497 16.9692 4.68929C16.4611 4.3439 15.9183 4.05242 15.3497 3.8196C14.9618 3.66073 14.7371 3.23803 14.8621 2.83786C14.9871 2.43768 15.4141 2.21199 15.8041 2.36596C16.5548 2.66239 17.2683 3.04555 17.9301 3.50764Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.3397 1.64767C12.7587 1.66143 13.0609 2.03831 13.0165 2.45519C12.9721 2.87208 12.5978 3.1706 12.1787 3.16212C10.4854 3.12785 8.81732 3.581 7.37418 4.46729C7.01693 4.68669 6.54308 4.61856 6.29385 4.28144C6.04462 3.94432 6.11454 3.46637 6.469 3.24249C8.22189 2.13534 10.2676 1.57962 12.3397 1.64767Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.86616 5.58706C4.12573 5.25784 4.60834 5.23809 4.91767 5.52107C5.22701 5.80405 5.24545 6.2824 4.99004 6.61486C4.43632 7.33565 3.99704 8.1376 3.68777 8.9923C3.54512 9.38652 3.1321 9.62853 2.72709 9.52022C2.32208 9.41191 2.07888 8.99459 2.21656 8.59859C2.59503 7.50999 3.15259 6.49211 3.86616 5.58706Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.64383 12.1879C1.63622 11.7687 1.99722 11.4478 2.41583 11.4709C2.83443 11.494 3.15163 11.8525 3.16451 12.2716C3.18081 12.8021 3.24486 13.33 3.35588 13.849C3.44357 14.259 3.22129 14.683 2.82036 14.8055C2.41942 14.928 1.99216 14.7027 1.89932 14.2939C1.7423 13.6025 1.65668 12.8968 1.64383 12.1879Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.24666 17.5376C3.02253 17.1833 3.16442 16.7216 3.53418 16.524C3.90394 16.3264 4.36119 16.4681 4.58976 16.8196C5.60082 18.3742 7.07961 19.5774 8.82203 20.2487C10.5645 20.92 12.4682 21.02 14.261 20.5457C14.6663 20.4384 15.1004 20.6401 15.242 21.0347C15.3836 21.4293 15.1791 21.8669 14.7751 21.9792C12.6379 22.5736 10.3587 22.4677 8.27621 21.6654C6.19371 20.863 4.43261 19.4124 3.24666 17.5376Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.965 20.4679C17.6223 20.7093 17.1541 20.5905 16.9384 20.231C16.7227 19.8715 16.8416 19.4078 17.1813 19.1621C18.3068 18.3478 19.2247 17.2796 19.8603 16.0443C20.0521 15.6716 20.4926 15.4842 20.8805 15.6434C21.2683 15.8025 21.4563 16.2475 21.2692 16.6227C20.5034 18.1582 19.3678 19.4797 17.965 20.4679Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id={id}
          x1="6.11328"
          y1="6.03639"
          x2="18.0406"
          y2="17.0788"
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#FBA367" />
          <stop offset="1" stopColor="#EF6100" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const IconStrd = () => (
  <svg
    className="icon-denom"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 500 500">
    <g fill="none" fillRule="evenodd">
      <path
        fill="#E50571"
        d="M250 500c138.071 0 250-111.929 250-250S388.071 0 250 0 0 111.929 0 250s111.929 250 250 250Z"
      />
      <path
        fill="#FFF"
        fillRule="nonzero"
        d="M257.924 376.245c-31.154 0-56.688-6.919-76.602-20.76-18.288-12.711-29.94-30.427-34.954-53.144-.766-3.472 1.396-6.854 4.754-7.746l43.104-11.439c3.719-.985 7.451 1.448 8.49 5.244 2.253 8.235 5.399 14.945 9.441 20.126 5.458 6.591 12.043 11.369 19.752 14.335 8.03 2.637 16.702 3.954 26.015 3.954 14.133 0 24.572-2.472 31.317-7.415 6.744-5.272 10.118-11.698 10.118-19.276 0-7.579-3.213-13.346-9.637-17.302-6.424-4.283-16.702-7.744-30.833-10.381l-13.489-2.47c-16.704-3.295-31.959-7.745-45.77-13.345-13.812-5.933-24.892-14.007-33.243-24.222-8.35-10.215-12.525-23.398-12.525-39.544 0-24.386 8.671-43.004 26.015-55.857 17.345-13.181 40.147-19.771 68.412-19.771 26.659 0 48.82 6.096 66.485 18.288 15.724 10.853 26.613 24.707 32.665 41.564 1.259 3.502-.754 7.261-4.23 8.358l-43.109 13.61c-3.761 1.187-7.657-1.222-8.933-5.042-2.932-8.769-7.591-15.249-13.971-19.439-7.709-5.273-17.344-7.909-28.907-7.909-11.563 0-20.396 2.142-26.498 6.426-6.102 3.954-9.154 9.556-9.154 16.807 0 7.908 3.213 13.84 9.637 17.794 6.422 3.624 15.093 6.426 26.015 8.402l13.489 2.472c17.987 3.295 34.207 7.743 48.661 13.345 14.774 5.274 26.337 13.018 34.687 23.233 8.672 9.887 13.009 23.398 13.009 40.535 0 25.702-9.155 45.639-27.463 59.809-17.985 13.841-42.235 20.76-72.748 20.76Z"
      />
    </g>
  </svg>
);

const IconAvax = () => (
  <svg
    className="icon-denom"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1503 1504"
    fill="none">
    <rect x="287" y="258" width="928" height="844" fill="white" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1502.5 752C1502.5 1166.77 1166.27 1503 751.5 1503C336.734 1503 0.5 1166.77 0.5 752C0.5 337.234 336.734 1 751.5 1C1166.27 1 1502.5 337.234 1502.5 752ZM538.688 1050.86H392.94C362.314 1050.86 347.186 1050.86 337.962 1044.96C327.999 1038.5 321.911 1027.8 321.173 1015.99C320.619 1005.11 328.184 991.822 343.312 965.255L703.182 330.935C718.495 303.999 726.243 290.531 736.021 285.55C746.537 280.2 759.083 280.2 769.599 285.55C779.377 290.531 787.126 303.999 802.438 330.935L876.42 460.079L876.797 460.738C893.336 489.635 901.723 504.289 905.385 519.669C909.443 536.458 909.443 554.169 905.385 570.958C901.695 586.455 893.393 601.215 876.604 630.549L687.573 964.702L687.084 965.558C670.436 994.693 661.999 1009.46 650.306 1020.6C637.576 1032.78 622.263 1041.63 605.474 1046.62C590.161 1050.86 573.004 1050.86 538.688 1050.86ZM906.75 1050.86H1115.59C1146.4 1050.86 1161.9 1050.86 1171.13 1044.78C1181.09 1038.32 1187.36 1027.43 1187.92 1015.63C1188.45 1005.1 1181.05 992.33 1166.55 967.307C1166.05 966.455 1165.55 965.588 1165.04 964.706L1060.43 785.75L1059.24 783.735C1044.54 758.877 1037.12 746.324 1027.59 741.472C1017.08 736.121 1004.71 736.121 994.199 741.472C984.605 746.453 976.857 759.552 961.544 785.934L857.306 964.891L856.949 965.507C841.69 991.847 834.064 1005.01 834.614 1015.81C835.352 1027.62 841.44 1038.5 851.402 1044.96C860.443 1050.86 875.94 1050.86 906.75 1050.86Z"
      fill="#E84142"
    />
  </svg>
);

const IconMars = () => (
  <svg
    className="icon-denom"
    xmlns="http://www.w3.org/2000/svg"
    fillRule="evenodd"
    clipRule="evenodd"
    viewBox="0 0 24 24">
    <path
      fill="url(#mars_a)"
      fillRule="nonzero"
      d="M12.985.812c.964 0 1.294.116 1.944.343.162.056.344.12.561.19 4.457 1.45 7.76 5.726 7.76 10.66 0 .824-.117 1.716-.287 2.501-.767 3.116-2.75 5.763-5.42 7.298-1.33.764-2.873 1.327-4.475 1.435-.268.018-1.138.01-1.729.004l-.489-.004C5.061 22.419.75 18.142.75 12.005c0-1.558.297-3.118.903-4.551.629-1.486 1.709-2.755 2.833-3.854.99-.966 2.214-1.5 3.42-2.026.175-.076.349-.152.522-.229.622-.277 1.041-.337 1.568-.413.218-.032.454-.066.731-.12.487-.093.999-.062 1.507-.031.252.016.504.031.751.031Z"
    />
    <path
      fill="none"
      stroke="#fff"
      d="M12.985.812c.964 0 1.294.116 1.944.343.162.056.344.12.561.19 4.457 1.45 7.76 5.726 7.76 10.66 0 .824-.117 1.716-.287 2.501-.767 3.116-2.75 5.763-5.42 7.298-1.33.764-2.873 1.327-4.475 1.435-.268.018-1.138.01-1.729.004l-.489-.004C5.061 22.419.75 18.142.75 12.005c0-1.558.297-3.118.903-4.551.629-1.486 1.709-2.755 2.833-3.854.99-.966 2.214-1.5 3.42-2.026.175-.076.349-.152.522-.229.622-.277 1.041-.337 1.568-.413.218-.032.454-.066.731-.12.487-.093.999-.062 1.507-.031.252.016.504.031.751.031Z"
    />
    <path
      fill="#fff"
      d="m11.999.166 3.657.58 3.299 1.68 2.618 2.618 1.681 3.298.58 3.657-.58 3.657-1.681 3.299-2.618 2.618-3.299 1.681-3.657.58-3.656-.58-3.299-1.681-2.618-2.618-1.68-3.299-.58-3.657.58-3.656 1.68-3.299 2.618-2.618L8.343.746l3.656-.58Zm-3.45 1.215L5.436 2.966l-2.469 2.47-1.586 3.113-.547 3.45.547 3.451 1.586 3.112 2.469 2.47 3.113 1.587 3.45.547 3.451-.547 3.112-1.587 2.47-2.47 1.587-3.112.547-3.451-.547-3.45-1.587-3.113-2.47-2.47-3.112-1.585-3.451-.547-3.45.547Z"
    />
    <path
      fill="#fff"
      d="M11.915 3.928a.165.165 0 0 1 .226.057l2.597 4.358a.165.165 0 1 1-.283.169l-2.598-4.358a.165.165 0 0 1 .058-.226Z"
    />
    <path
      fill="#fff"
      d="m11.999 3.904 5.361.58-.035.328-5.326-.576-5.325.576-.035-.328 5.36-.58ZM9.237 8.426c0-.092.074-.165.165-.165h5.194a.165.165 0 0 1 0 .33H9.402a.165.165 0 0 1-.165-.165Z"
    />
    <path
      fill="#fff"
      d="M12.083 3.928a.165.165 0 0 1 .057.226L9.544 8.512a.165.165 0 1 1-.283-.169l2.596-4.358a.164.164 0 0 1 .226-.057Z"
    />
    <path
      fill="#fff"
      d="m8.392.803 3.607 3.05 3.607-3.05 1.884 3.77-.295.148-1.696-3.395-3.5 2.959-3.5-2.959-1.695 3.395-.295-.148L8.392.803Z"
    />
    <path
      fill="#fff"
      d="M5.143 2.563a.165.165 0 0 1 .231.036l6.625 9.12 6.626-9.12a.165.165 0 0 1 .267.194l-6.759 9.304a.165.165 0 0 1-.267 0L5.107 2.793a.164.164 0 0 1 .036-.23Z"
    />
    <path
      fill="#fff"
      d="M9.525 8.314c.04.044.053.106.035.162l-1.568 4.827 4.089 2.971 4.646 1.992a.165.165 0 0 1-.13.303l-4.663-1.999a.202.202 0 0 1-.032-.018l-4.201-3.053a.164.164 0 0 1-.06-.184l1.515-4.664-4.663 1.058a.165.165 0 1 1-.073-.322l4.947-1.122a.162.162 0 0 1 .158.049Z"
    />
    <path
      fill="#fff"
      d="M4.347 9.426a.165.165 0 0 1 .233.016l3.342 3.817a.166.166 0 0 1-.015.233.166.166 0 0 1-.233-.015L4.332 9.659a.166.166 0 0 1 .015-.233Z"
    />
    <path
      fill="#fff"
      d="M6.931 4.439 4.635 9.553l.026.063-.058.036-1.069 5.099 3.901 3.533 4.643 2.664 3.364 1.748 1.093-4.452 4.57.337-.624-3.744.326-.054.692 4.158-4.71-.348-1.127 4.589-3.745-1.946-4.677-2.683-4.002-3.625-3.004-2.957L4.25 9.483 2.464 5.109l4.467-.67ZM4.215 9.893.765 12.03l2.489 2.45.961-4.587Zm.248-.762 1.919-4.276-3.454.518 1.535 3.758Z"
    />
    <path
      fill="#fff"
      d="M7.814 13.202c.09.009.157.089.149.18l-.461 5.051a.165.165 0 1 1-.328-.03l.46-5.051a.166.166 0 0 1 .18-.15Z"
    />
    <path
      fill="#fff"
      d="M12.151 16.353a.165.165 0 0 1-.086.216l-4.662 2a.165.165 0 1 1-.13-.304l4.662-1.999a.164.164 0 0 1 .216.087Z"
    />
    <path
      fill="#fff"
      d="m2.893 18.581.624-3.744-.326-.054-.692 4.158 4.712-.347 1.125 4.588 3.739-1.942-.152-.293-3.367 1.749-1.091-4.452-4.572.337Z"
    />
    <path
      fill="#fff"
      d="M12.097 11.865a.164.164 0 0 1 .068.133V23.5a.165.165 0 0 1-.33 0V12.226l-10.72 3.483a.164.164 0 0 1-.207-.106.165.165 0 0 1 .105-.208l10.936-3.553a.163.163 0 0 1 .148.023ZM17.212 4.547a.164.164 0 0 1 .156-.063l3.959.594a.163.163 0 0 1 .128.225l-1.706 4.18 3.838 2.378a.164.164 0 0 1 .029.257l-2.854 2.808-.006.006h-.001a.002.002 0 0 1-.002.002l-3.98 3.607a.164.164 0 0 1-.171.031.164.164 0 0 1-.104-.138l-.459-5.034-1.599-4.922a.165.165 0 0 1 .193-.212l4.625 1.049-2.065-4.6a.164.164 0 0 1 .019-.168Zm2.025 5.102-4.394-.997 1.426 4.388 2.968-3.391Zm-2.865 3.773.425 4.652 3.667-3.323-1.014-4.844-3.078 3.515Zm3.412-3.529.96 4.587 2.49-2.45-3.45-2.137Zm-.248-.763 1.534-3.757-3.453-.518 1.919 4.275Z"
    />
    <path
      fill="#fff"
      d="M11.842 11.947a.164.164 0 0 1 .208-.105l10.937 3.553a.165.165 0 0 1-.102.314l-10.937-3.554a.165.165 0 0 1-.106-.208Z"
    />
    <path
      fill="#fff"
      d="M16.335 13.27a.164.164 0 0 1-.037.23l-4.202 3.052a.165.165 0 0 1-.194-.267l4.202-3.052a.166.166 0 0 1 .231.037ZM16.58 18.276a.166.166 0 0 1 .216.046l2.096 2.886a.165.165 0 1 1-.267.194l-2.009-2.766-4.535 2.601a.165.165 0 0 1-.164-.286l4.663-2.675ZM11.999.335c.091 0 .165.074.165.165v3.568a.165.165 0 0 1-.33 0V.5c0-.091.074-.165.165-.165ZM23.093 8.396a.166.166 0 0 1-.106.208l-3.393 1.102a.164.164 0 1 1-.102-.313l3.393-1.103a.166.166 0 0 1 .208.106ZM7.435 18.286c.074.054.09.157.036.23l-2.097 2.886a.165.165 0 1 1-.267-.194l2.097-2.886a.166.166 0 0 1 .231-.036ZM.908 8.396a.164.164 0 0 1 .207-.106l3.393 1.103a.165.165 0 1 1-.102.313L1.013 8.604a.164.164 0 0 1-.105-.208Z"
    />
    <defs>
      <linearGradient
        id="mars_a"
        x1="0"
        x2="1"
        y1="0"
        y2="0"
        gradientTransform="scale(-20.976) rotate(44.864 .49 -1.582)"
        gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#ef4136" />
        <stop offset=".01" stopColor="#ef4136" />
        <stop offset=".32" stopColor="#df5153" />
        <stop offset="1" stopColor="#ac0b1b" />
      </linearGradient>
    </defs>
  </svg>
);

const IconTAO = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon-denom"
    width="84"
    height="84"
    viewBox="0 0 84 84">
    <g fill="none" fillRule="evenodd">
      <circle cx="42" cy="42" r="42" fill="#FFF" />
      <path
        fill="#000"
        fillRule="nonzero"
        d="M45.4 51.314V37.256c0-3.513-2.898-6.374-6.41-6.374v22.466c0 4.47 3.79 5.947 6.132 5.947 1.942 0 3.038-.334 4.358-1.264-3.698-.39-4.08-2.62-4.08-6.717Z"
      />
      <path
        fill="#000"
        fillRule="nonzero"
        d="M31.844 25C28.62 25 26 27.667 26 30.89h26.156C55.38 30.89 58 28.225 58 25H31.844Z"
      />
    </g>
  </svg>
);

const IconROAR = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 580 580"
    className="icon-denom">
    <g fill="none" fillRule="evenodd">
      <circle cx="289.99" cy="289.99" r="289.99" fill="#F5F411" />
      <path
        fill="#000"
        d="M290 579.979C129.876 579.979.011 450.113.011 289.989S129.876 0 290 0c160.125 0 289.989 129.865 289.989 289.99S450.125 579.98 290 579.98m0-567.37c-153.19 0-277.381 124.19-277.381 277.38S136.81 567.371 290 567.371c153.19 0 277.381-124.191 277.381-277.381C567.381 136.8 443.19 12.608 290 12.608"
      />
      <path
        fill="#000"
        d="M274.709 286.49a.42.42 0 0 0-.114.518c.346.719 7.731 15.816 14.079 19.575l-.098 23.019c-.401.012-.806.016-1.198.028-1.265.082-2.507.169-3.717.247-2.396.244-4.647.535-6.595.818-1.937.322-3.583.608-4.753.844-1.21.248-1.894.405-1.894.405-.487.102-.97.318-1.386.636a3.495 3.495 0 0 0-.676 4.895 3.504 3.504 0 0 0 4.899.679l.023-.023s.126-.091.365-.28c.201-.137.472-.376.884-.643a24.518 24.518 0 0 1 3.803-1.976c.833-.323 1.728-.727 2.718-.998.982-.267 2.027-.625 3.135-.813 1.108-.177 2.247-.452 3.429-.55 1.163-.071 2.338-.142 3.52-.208 1.241.082 2.475.16 3.693.239 1.198.102 2.282.397 3.378.574 1.088.196 2.133.569 3.119.836.986.295 1.878.704 2.702 1.034a23.69 23.69 0 0 1 3.795 2.007c.864.58 1.206.923 1.183.903a3.406 3.406 0 1 0 3.02-6.108s-.192-.06-.557-.15c-.323-.074-.79-.172-1.391-.298a194.27 194.27 0 0 0-4.741-.88 136.544 136.544 0 0 0-6.604-.876c-1.225-.09-2.475-.192-3.751-.283-.197-.007-.385-.02-.57-.023l.09-23.41c6.262-4.23 13.341-18.367 13.679-19.07a.437.437 0 0 0-.114-.523c-3.744-3.048-8.497-4.945-13.737-5.495-7.264-.758-14.417 1.194-19.618 5.35M273.063 251.804c-.02.46-.13.918-.24 1.41a14.7 14.7 0 0 0-.157.71l-.094.334c-.181.617-.357 1.198-.577 1.744l-.103.26c-.239.586-.467 1.132-.746 1.654-.228.49-.487.942-.738 1.375l-.15.262a25.18 25.18 0 0 1-1.599 2.322c-.208.267-.365.457-.467.57l-.224.26a1.715 1.715 0 0 0 .047 2.298c.279.29.652.478 1.061.518a1.72 1.72 0 0 0 1.355-.464l.232-.224c.161-.165.397-.389.656-.668.632-.668 1.371-1.57 2.078-2.526l.169-.25c.33-.46.699-.99 1.025-1.545.409-.627.754-1.308 1.124-2.026l.066-.13c.381-.755.688-1.555 1.053-2.478.075-.268.161-.535.248-.806.192-.601.4-1.218.487-1.858l.275-1.39a23.7 23.7 0 0 0 .082-.905l.043-.513c.004-.154.016-.308.032-.457.027-.305.059-.625.031-.942-.023-.433-.035-.852-.063-1.32-.004-.763-.145-1.462-.275-2.133l-.161-.797a6.854 6.854 0 0 0-.196-.869c-.118-.362-.24-.714-.35-1.056-.082-.216-.153-.428-.22-.628-.145-.445-.279-.862-.467-1.215l-1.237-2.466a1.943 1.943 0 0 0-.114-.194 2.03 2.03 0 0 0-.421-.518c-1.434-2.012-4.682-3.46-8.697-3.876a21.71 21.71 0 0 0-2.223-.123c-.57-.004-1.175.023-1.858.075l-12.673-.052-.019.41c-.008.118-.099 2.934 3.606 7.994l.243.305.016-.007c1.548 1.827 4.655 3.13 8.414 3.52.727.082 1.473.125 2.22.125a22.068 22.068 0 0 0 4.042-.358v.017l.573-.126s.727-.161 1.619-.066c1.551.156 2.62.923 3.154 2.163.028.126.047.251.059.413.039.236.071.468.11.704l.047.349c.036.192.032.38.032.581-.008.15-.008.294.004.412v.42c.004.22.007.448 0 .645l-.134 1.136ZM307.856 249.887l.02.345c.023.35.043.7.094 1.084l.242 1.34c.096.663.291 1.292.493 1.901.082.26.153.523.25.873.315.805.637 1.637 1.01 2.4l.052.098c.365.73.718 1.421 1.11 2.043.33.58.685 1.087 1.025 1.575l.173.259c.677.938 1.4 1.842 2.048 2.534.267.286.495.519.66.683.149.142.231.224.231.224.267.264.632.429 1.005.471.469.048.943-.101 1.298-.404.707-.618.784-1.693.144-2.447l-.189-.224a7.123 7.123 0 0 1-.466-.575 23.685 23.685 0 0 1-1.563-2.325l-.154-.259c-.248-.435-.507-.892-.747-1.406-.262-.51-.494-1.077-.738-1.678l-.082-.22c-.22-.55-.385-1.12-.563-1.735l-.09-.307c-.039-.251-.098-.502-.153-.755-.101-.49-.209-.95-.228-1.445l-.113-1.089c-.017-.227 0-.447 0-.67l.007-.393c.012-.145.012-.296.012-.436 0-.204 0-.401.043-.68.055-.33.099-.645.154-.999.012-.128.043-.254.03-.281.964-2.233 3.144-2.35 4.35-2.225.29.032.455.076.478.076l2.392.55-.31-.197c.817.103 1.681.154 2.53.157 4.644.02 8.764-1.36 10.662-3.543l.02.016.243-.319c3.748-5.02 3.68-7.844 3.668-7.963l-.007-.407-12.68-.052a23.927 23.927 0 0 0-1.85-.095c-4.935-.014-9.236 1.518-10.91 3.85a2.558 2.558 0 0 0-.58.758l-1.262 2.451c-.2.358-.334.774-.478 1.21-.075.21-.147.417-.233.648l-.368 1.053c-.084.26-.139.535-.194.826l-.172.84c-.134.673-.28 1.368-.29 2.106l-.084 1.332c-.022.333 0 .655.033.974.002.15.019.29.026.452"
      />
      <path
        fill="#000"
        d="M418.974 174.397c-7.118-8.65-14.487-14.672-19.967-18.482L412.846 160c.522.153 1.1-.047 1.422-.495a1.295 1.295 0 0 0-.031-1.493c-24.018-32.47-80.808-40.08-94.997-41.427 2.023-1.536 6.15-4.1 14.342-7.589.562-.236.884-.833.754-1.434-.126-.593-.676-1.04-1.253-1.018-15.697-.066-36.454 8.737-40.63 11.255-4.14-2.553-39.978-11.502-55.675-11.56-.61 0-1.131.42-1.261 1.012a1.282 1.282 0 0 0 .743 1.438c8.178 3.56 12.29 6.168 14.287 7.707-14.197 1.218-60.963 10.827-85.267 43.097a1.286 1.286 0 0 0-.031 1.493c.31.456.88.656 1.402.507l13.879-3.968c-5.512 3.76-7.892 7.197-15.077 15.788-12.578 15.041-26.614 58.943-22.034 98.524a1.273 1.273 0 0 0 1.093 1.116c.553.043 1.139-.244 1.359-.782l6.662-16.228c-.9 25.451.97 90.012 58.437 134.142a1.26 1.26 0 0 0 1.35.134c.44-.228.716-.68.7-1.17l-.196-11.028c5.539 11.714 18.62 22.47 32.274 33.705 17.575 14.456 35.755 26.885 42.158 46.07 1.567 4.698 2.357 9.534 2.333 14.362v.027c0 .66.495 1.218 1.15 1.277.045.006.084.006.123.006.707 0 1.285-.568 1.285-1.27a44.68 44.68 0 0 1 2.247-13.75c6.383-19.417 24.92-31.858 42.833-46.322C351 401.01 371.764 382.782 377.4 371.108l-.28 11.042a1.24 1.24 0 0 0 .689 1.167c.444.232.97.192 1.355-.11 57.844-43.63 52.847-118.268 52.163-143.727l6.525 16.283c.212.542.766.864 1.35.793a1.286 1.286 0 0 0 1.105-1.11c4.926-39.539-8.89-65.898-21.334-81.049M204.276 198.3s3.72.322 5.873 1.34c-5.194 1.933-5.712 10.296-5.712 10.296-11.918-12.02-16.762-26.539-10.818-32.432 5.943-5.888 19.825-1.143 30.36 9.797 0 .004-15.956 1.73-19.703 11m127.452 90.125 26.229 29.046c-.134 30.534 3.5 46.636-65.743 46.341l-.012-.008c-37.598-.157-53.652-4.98-60.464-14.228a20.692 20.692 0 0 1-2.55-4.568c-2.934-7.303-2.376-16.688-2.325-28.095l26.469-28.814s-35.398-24.269-35.16-78.903c0 0 33.506-15.108 74.764-14.932 41.25.178 74.633 15.573 74.633 15.573-.247 54.634-35.841 78.588-35.841 78.588m47.425-78.596s-.443-8.367-5.617-10.339c2.157-1.002 7.42 1.422 7.42 1.422-3.672-9.302-21.137-13.883-21.137-13.883 10.618-10.85 24.543-15.473 30.432-9.538 5.888 5.948.923 20.423-11.098 32.338"
      />
    </g>
  </svg>
);

const IconAmpKUJI = () => (
  <svg
    className="icon-denom"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100">
    <g fill="none" fillRule="evenodd">
      <circle fill="#22242F" cx="50" cy="50" r="50"></circle>
      <path
        d="M50 2c26.51 0 48 21.49 48 48S76.51 98 50 98 2 76.51 2 50 23.49 2 50 2Zm0 3.388C25.362 5.388 5.388 25.362 5.388 50S25.362 94.612 50 94.612 94.612 74.638 94.612 50 74.638 5.388 50 5.388Z"
        fill="#4f7cbb"
        fillRule="nonzero"></path>
      <path
        d="M80.25 31.083v-4.36H66.44c-.742-2.817-1.483-5.3-2.292-7.58l-4.648.805a78.586 78.586 0 0 1 2.358 6.775h-14.62v4.36H80.25Zm-35.37 32.4V35.645h-6.805c1.415-2.08 2.83-4.629 4.244-7.715v-3.22H31.203a74.322 74.322 0 0 0 1.684-4.091l-4.312-1.342c-2.021 6.574-5.188 11.873-9.432 15.965l1.01 4.763c.876-.805 1.752-1.61 2.56-2.482v25.96H44.88ZM33.426 35.645h-9.028a55.368 55.368 0 0 0 4.918-7.11h8.49c-1.483 2.682-2.898 5.097-4.38 7.11Zm27.758 45.212c3.369 0 5.12-1.878 5.12-5.568V56.171h10.713v-19.05H50.808v19.05h10.78V74.15c0 1.677-.673 2.55-2.02 2.55-1.55 0-3.168-.135-4.784-.336l.943 4.494h5.457ZM31.876 47.585h-4.985v-7.983h4.985v7.983Zm8.826 0h-4.918v-7.983h4.918v7.983Zm31.733 4.36H55.39V41.414h17.045v10.531Zm-31.733 7.513h-4.918v-7.982h4.918v7.982Zm-8.826 0h-4.985v-7.982h4.985v7.982Zm45.41 18.313 3.571-2.482c-1.819-4.293-4.38-9.257-7.748-14.959l-3.57 2.147c3.233 5.568 5.86 10.666 7.747 15.294Zm-28.23 1.14c2.965-4.628 5.525-10.128 7.681-16.434l-3.907-1.878c-2.089 6.037-4.582 11.27-7.411 15.697l3.638 2.616Zm-5.591-4.56 3.301-.806c-.943-3.22-1.886-6.037-2.964-8.452l-3.167.94a80.48 80.48 0 0 1 2.83 8.317Zm-7.142 3.89 3.504-.402c-.405-5.099-1.146-9.123-2.224-12.075l-3.368.402c1.078 2.818 1.751 6.843 2.088 12.075Zm-12.868 1.811c1.415-3.958 2.29-8.452 2.695-13.55l-3.638-.47c-.337 4.83-1.28 9.123-2.763 12.88l3.706 1.14Zm5.66-.805 3.503-.402c-.135-5.3-.472-9.526-.944-12.611l-3.234.402c.337 2.952.54 7.178.674 12.611Z"
        fill="#4f7cbb"
        fillRule="nonzero"></path>
    </g>
  </svg>
);

const IconAmpWHALE = () => (
  <svg
    className="icon-denom"
    viewBox="0 0 559 559"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M279.5 559C433.864 559 559 433.864 559 279.5C559 125.136 433.864 0 279.5 0C125.136 0 0 125.136 0 279.5C0 433.864 125.136 559 279.5 559Z"
      fill="#4f7cbb"
    />
    <path
      d="M541 279.477C541 404.772 452.852 509.489 335.177 535L333.47 527.149C315.741 530.974 297.656 532.902 279.519 532.902C152.682 532.902 44.6478 438.228 28.2269 312.681C26.8003 301.671 26.0868 290.58 26.0907 279.477H18C18 135.085 135.07 18 279.5 18V26.027C419.286 26.027 532.947 139.716 532.947 279.452L541 279.477Z"
      fill="#191919"
    />
    <path
      d="M413.956 479L405 465.614C505.772 397.65 534.105 261.426 468.83 158.69L482.372 150C552.352 260.129 521.995 406.15 413.956 479Z"
      fill="#4f7cbb"
    />
    <path
      d="M80.4196 414C61.8446 386.718 49.1294 355.927 43.0673 323.547C37.0052 291.167 37.7263 257.894 45.1856 225.803C52.645 193.713 66.6825 163.494 86.4223 137.031C106.162 110.569 131.18 88.4313 159.916 72L168 85.9396C98.4285 125.797 55.2098 200.055 55.2098 279.738C55.1279 324.396 68.5834 368.044 93.8247 404.999L80.4196 414Z"
      fill="#4f7cbb"
    />
    <path
      d="M187.856 468C83.3655 416.975 40.3032 291.414 91.6783 187.584C95.5324 179.796 99.8697 172.254 104.665 165L118.185 173.834C97.2812 205.361 86.1704 242.301 86.2359 280.055C86.2359 354.302 127.914 420.774 195 453.587L187.856 468Z"
      fill="#4f7cbb"
    />
    <path
      d="M482.172 333L466.639 328.911C470.828 312.836 472.944 296.288 472.938 279.672C472.938 172.94 386.386 86.1077 280 86.1077V70C395.419 70.0063 489 163.878 489 279.672C489.004 297.668 486.71 315.59 482.172 333Z"
      fill="#4f7cbb"
    />
    <path
      d="M437.369 202.856C399.252 260.987 365.311 243.372 324.771 235.498C284.231 227.625 261.835 270.596 261.835 270.596C261.835 270.596 261.88 270.451 261.905 270.382C261.135 271.79 260.384 273.21 259.665 274.65C258.366 277.175 257.192 279.821 256.069 282.529C256.195 279.585 256.644 276.663 257.407 273.816C258.144 270.949 259.104 268.143 260.277 265.425C261.737 262.039 263.507 258.794 265.564 255.734C271.873 215.086 238.317 199.447 195.941 174.975C148.746 147.725 169.867 118 169.867 118C169.867 118 90.0685 200.962 143.314 279.404C196.559 357.846 263.911 380.026 193.702 498.105C193.702 498.105 241.402 525.822 318.147 512.266C298.085 426.514 303.151 394.2 334.922 365.081L331.458 366.344C330.197 366.767 328.935 367.076 327.673 367.417L325.781 367.916C325.15 368.067 324.519 368.156 323.85 368.276C322.588 368.503 321.276 368.718 319.989 368.907C318.702 369.097 317.377 369.097 316.084 369.172C315.453 369.172 314.784 369.235 314.135 369.248C313.485 369.261 312.829 369.198 312.179 369.147C310.879 369.065 309.586 368.97 308.305 368.812C309.567 368.421 310.829 368.099 312.04 367.783C312.671 367.619 313.27 367.48 313.882 367.335L315.705 366.773C316.91 366.413 318.115 366.072 319.32 365.738C320.525 365.403 321.686 364.911 322.866 364.525C323.459 364.33 324.052 364.159 324.632 363.938L326.38 363.269C327.528 362.802 328.714 362.442 329.85 361.943L333.282 360.51C334.436 360.055 335.54 359.487 336.676 358.982C341.18 356.911 345.626 354.663 350.012 352.239L353.167 350.484C368.244 342.907 381.556 334.302 393.801 323.335C469.083 256.037 437.369 202.856 437.369 202.856Z"
      fill="white"
    />
  </svg>
);

const IconUNI = () => (
  <svg
    className="icon-denom"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 200">
    <g fill="#FF007A" fillRule="evenodd">
      <path
        fillRule="nonzero"
        d="M72.9 45.627c-2.199-.313-2.303-.418-1.257-.522 1.99-.313 6.596.104 9.84.834 7.538 1.773 14.343 6.362 21.566 14.391l1.884 2.19 2.722-.417c11.62-1.877 23.554-.417 33.499 4.171 2.722 1.252 7.014 3.754 7.537 4.38.21.209.524 1.564.733 2.92.733 4.901.419 8.551-1.152 11.367-.837 1.564-.837 1.981-.314 3.337.42 1.042 1.675 1.772 2.827 1.772 2.512 0 5.13-3.962 6.386-9.49l.523-2.19.942 1.044c5.34 5.944 9.527 14.182 10.155 20.022L169 101l-.942-1.356c-1.57-2.398-3.036-3.962-5.025-5.318-3.56-2.398-7.328-3.128-17.273-3.65-9.003-.521-14.132-1.251-19.157-2.92-8.584-2.815-12.981-6.465-23.135-19.918-4.502-5.944-7.328-9.176-10.155-11.888-6.176-5.944-12.353-9.072-20.413-10.323Z"
      />
      <path
        fillRule="nonzero"
        d="M149.174 58.106c.195-4.097.683-6.793 1.755-9.273.39-.97.78-1.833.878-1.833.098 0-.097.755-.39 1.617-.78 2.373-.878 5.715-.39 9.49.683 4.852.975 5.499 5.657 10.782 2.146 2.48 4.682 5.607 5.658 6.901L164 78.162l-1.658-1.725c-2.049-2.156-6.73-6.254-7.803-6.793-.683-.431-.78-.431-1.269.108-.39.431-.487 1.078-.487 4.205-.098 4.852-.683 7.872-2.146 10.999-.78 1.617-.878 1.293-.195-.54.487-1.401.585-2.048.585-6.685 0-9.381-.975-11.645-6.925-15.42-1.464-.97-4-2.372-5.463-3.126-1.56-.755-2.73-1.402-2.633-1.402.195-.216 5.95 1.617 8.193 2.696 3.414 1.51 4 1.617 4.39 1.51.292-.324.487-1.187.585-3.883ZM77.628 72.84c-4.361-5.613-7.165-14.323-6.542-20.808L71.294 50l1.038.194c1.87.29 5.088 1.451 6.646 2.322C83.13 54.84 85 58.033 86.766 65.97c.519 2.323 1.246 5.033 1.557 5.904.52 1.452 2.492 4.84 4.153 6.969 1.143 1.548.416 2.322-2.18 2.129-3.946-.387-9.241-3.775-12.668-8.13ZM143.363 119.857C123.147 111.545 116 104.377 116 92.221c0-1.766.102-3.221.102-3.221.102 0 .817.623 1.736 1.35 4.084 3.325 8.678 4.78 21.441 6.65 7.454 1.143 11.742 1.974 15.622 3.325 12.354 4.156 20.012 12.675 21.85 24.207.51 3.325.204 9.663-.613 12.987-.715 2.598-2.757 7.377-3.267 7.481-.103 0-.307-.52-.307-1.35-.204-4.364-2.348-8.52-5.922-11.74-4.288-3.741-9.801-6.546-23.279-12.053ZM129.614 122.875c-.205-1.546-.718-3.504-1.026-4.329l-.513-1.546.924 1.134c1.333 1.546 2.36 3.401 3.283 5.978.718 1.958.718 2.577.718 5.772 0 3.092-.103 3.814-.718 5.566-1.026 2.783-2.257 4.741-4.31 6.906-3.693 3.814-8.515 5.875-15.39 6.803-1.23.103-4.719.412-7.797.618-7.695.413-12.825 1.237-17.442 2.886-.615.207-1.231.413-1.334.31-.205-.207 2.976-2.062 5.54-3.299 3.592-1.752 7.285-2.68 15.39-4.123 4.002-.618 8.106-1.443 9.132-1.855 10.157-3.195 15.185-11.132 13.543-20.82Z"
      />
      <path
        fillRule="nonzero"
        d="M141.514 138.67c-2.578-5.856-3.174-11.404-1.785-16.643.198-.513.397-1.027.595-1.027.198 0 .793.308 1.388.72 1.19.82 3.67 2.26 10.017 5.855 8.033 4.52 12.595 8.012 15.769 12.019 2.776 3.493 4.462 7.5 5.256 12.43.496 2.774.198 9.451-.496 12.225-2.182 8.732-7.14 15.717-14.38 19.724-1.091.616-1.984 1.027-2.083 1.027-.1 0 .298-1.027.893-2.26 2.38-5.24 2.677-10.273.892-15.923-1.09-3.493-3.372-7.705-7.934-14.793-5.454-8.218-6.744-10.376-8.132-13.355ZM62.154 169.932c7.588-6.496 16.92-11.106 25.535-12.573 3.691-.628 9.844-.419 13.229.524 5.435 1.467 10.357 4.61 12.92 8.486 2.462 3.772 3.59 7.02 4.718 14.249.41 2.829.923 5.762 1.026 6.39.82 3.772 2.46 6.706 4.512 8.277 3.179 2.41 8.717 2.515 14.152.42.923-.315 1.743-.63 1.743-.524.205.21-2.564 2.095-4.41 3.038-2.563 1.362-4.614 1.781-7.383 1.781-4.922 0-9.127-2.62-12.511-7.858-.718-1.047-2.154-4.086-3.384-6.914-3.59-8.487-5.436-11.001-9.64-13.83-3.692-2.41-8.41-2.933-11.998-1.152-4.718 2.305-5.948 8.486-2.667 12.258 1.333 1.571 3.795 2.828 5.846 3.143 3.794.524 7.076-2.515 7.076-6.391 0-2.515-.923-3.981-3.385-5.134-3.281-1.467-6.87.21-6.768 3.458 0 1.362.615 2.2 1.949 2.828.82.42.82.42.205.315-2.974-.629-3.692-4.4-1.334-6.81 2.872-2.934 8.922-1.677 10.973 2.41.82 1.676.923 5.028.205 7.124-1.743 4.61-6.665 7.02-11.69 5.657-3.384-.943-4.82-1.886-8.922-6.181-7.179-7.544-9.948-9.01-20.203-10.582L60 172.027l2.154-2.095Z"
      />
      <path d="M7.48 4.445C31.302 33.698 68.004 79.179 69.845 81.66c1.533 2.067.92 4.031-1.636 5.478-1.431.827-4.396 1.654-5.828 1.654-1.635 0-3.578-.827-4.907-2.17-.92-.93-4.907-6.823-13.904-20.984-6.85-10.854-12.677-19.847-12.779-19.95-.409-.207-.409-.207 12.064 22.327 7.872 14.162 10.428 19.227 10.428 19.847 0 1.344-.41 2.067-2.045 3.928-2.76 3.1-3.987 6.615-4.907 13.954-1.023 8.166-3.783 13.955-11.655 23.775-4.6 5.788-5.316 6.822-6.44 9.2-1.432 2.894-1.841 4.547-2.046 8.269-.204 3.928.205 6.408 1.33 10.13 1.022 3.307 2.146 5.478 4.907 9.716 2.351 3.721 3.782 6.512 3.782 7.546 0 .827.205.827 3.885 0 8.793-2.068 16.051-5.582 20.038-9.923 2.454-2.688 3.067-4.135 3.067-7.856 0-2.378-.102-2.895-.715-4.342-1.023-2.274-2.965-4.134-7.157-7.029-5.52-3.824-7.872-6.925-8.485-11.06-.511-3.514.102-5.892 3.17-12.404 3.168-6.719 3.986-9.51 4.497-16.332.307-4.341.818-6.099 2.045-7.442 1.33-1.447 2.454-1.964 5.623-2.378 5.214-.723 8.588-2.067 11.246-4.651 2.351-2.17 3.374-4.342 3.476-7.546L77 81.04l-1.329-1.448C70.866 74.011 4.311 0 4.005 0 3.902 0 5.538 1.964 7.48 4.445Zm31.387 146.987c1.124-1.964.51-4.444-1.33-5.685-1.738-1.137-4.396-.62-4.396.93 0 .414.205.827.818 1.034.92.517 1.023 1.034.307 2.17-.716 1.138-.716 2.172.204 2.895 1.432 1.137 3.374.517 4.397-1.344ZM81.501 96.275c-2.784.787-5.452 3.71-6.264 6.632-.465 1.798-.233 5.058.58 6.07C77.093 110.55 78.253 111 81.5 111c6.38 0 11.833-2.698 12.413-5.958.58-2.697-1.856-6.407-5.22-8.093-1.74-.899-5.337-1.236-7.193-.674Zm7.425 5.62c.928-1.349.58-2.81-1.16-3.822-3.133-1.91-7.889-.337-7.889 2.586 0 1.46 2.436 3.035 4.756 3.035 1.509 0 3.597-.9 4.293-1.799Z" />
    </g>
  </svg>
);

const IconHans = () => (
  <img
    className="icon-denom"
    src="https://raw.githubusercontent.com/Team-Kujira/assets/main/cbimage-2.png"
    alt="HANS"
  />
);

const IconNBTC = () => (
  <svg
    className="icon-denom"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 751 751"
    fill="none">
    <path
      fill="url(#nbtcgrad)"
      d="M739.336 466.587C689.25 667.48 485.78 789.74 284.864 739.643 84.03 689.558-38.231 486.076 11.878 285.195 61.94 84.279 265.41-37.993 466.268 12.092c200.904 50.086 323.153 253.591 273.068 454.495Z"
    />
    <path
      fill="#fff"
      d="M540.938 322.446c7.464-49.898-30.527-76.722-82.476-94.616l16.851-67.593-41.144-10.254-16.406 65.812c-10.816-2.696-21.926-5.238-32.965-7.758l16.524-66.246-41.121-10.253-16.863 67.569c-8.953-2.039-17.742-4.054-26.273-6.175l.047-.211-56.742-14.168-10.945 43.945s30.527 6.996 29.882 7.429c16.664 4.16 19.676 15.187 19.172 23.93l-19.195 77.003c1.148.293 2.637.715 4.277 1.371-1.371-.34-2.836-.715-4.347-1.078l-26.906 107.87c-2.039 5.062-7.207 12.656-18.855 9.773.41.598-29.906-7.465-29.906-7.465l-20.426 47.098 53.542 13.347c9.961 2.496 19.723 5.109 29.332 7.57l-17.027 68.367 41.097 10.254 16.863-67.64a1568.388 1568.388 0 0 0 32.789 8.508l-16.804 67.323 41.144 10.254 17.027-68.238c70.159 13.277 122.917 7.922 145.123-55.534 17.895-51.094-.89-80.566-37.804-99.784 26.882-6.2 47.132-23.883 52.535-60.41Zm-94.007 131.823c-12.715 51.093-98.742 23.472-126.632 16.546l22.594-90.573c27.89 6.961 117.327 20.742 104.038 74.027Zm12.726-132.561c-11.601 46.476-83.202 22.863-106.429 17.074l20.485-82.148c23.226 5.789 98.026 16.594 85.944 65.074Z"
    />
    <defs>
      <linearGradient
        id="nbtcgrad"
        x1="1584.28"
        x2="-76.801"
        y1="-175.357"
        y2="601.409"
        gradientUnits="userSpaceOnUse">
        <stop stopColor="#F0C9BD" />
        <stop offset="1" stopColor="#5C00F5" />
      </linearGradient>
    </defs>
  </svg>
);

const IconNSTK = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon-denom"
    viewBox="0 0 500 500">
    <defs>
      <linearGradient
        id="nstk_a"
        x1="36.513%"
        x2="51.386%"
        y1="52.298%"
        y2="47.554%">
        <stop offset="0%" stopColor="#571614" />
        <stop offset="100%" stopColor="#E53935" />
      </linearGradient>
      <linearGradient
        id="nstk_b"
        x1="20.355%"
        x2="109.885%"
        y1="31.489%"
        y2="31.489%">
        <stop offset="0%" stopColor="#FFF" stopOpacity=".35" />
        <stop offset="100%" stopColor="#FFF" stopOpacity=".85" />
      </linearGradient>
    </defs>
    <g fill="none" fillRule="evenodd">
      <path
        fill="url(#nstk_a)"
        d="M172.426.221c-18.127-.283-27.42-.244-32.075-.158-4.654-.086-13.95-.125-32.075.158-31.913.496-76.363 50.094-91.181 62.494C2.279 75.115 0 83.547 0 121.737c0 38.191 6.269 123.004 20.827 170.67 37.433 122.55 77.19 166.602 94.856 189.912 8.501 11.216 15.543 15.534 20.569 17.006.577.244 1.982.715 4.099.67 2.115.045 3.52-.426 4.097-.67 5.026-1.472 12.07-5.79 20.569-17.006 17.666-23.31 57.422-67.361 94.856-189.912 14.56-47.666 20.829-132.479 20.829-170.67 0-38.19-2.28-46.622-17.097-59.022C248.788 50.315 204.337.717 172.425.22Z"
        transform="translate(110)"
      />
      <path
        fill="url(#nstk_b)"
        d="M174.137 447.368c51.654-90.464 81.259-187.706 88.816-291.725 4.43-30.186.928-70.304-6.303-77.086-7.23-6.782-53.07-54.954-63.774-56.841-24.028-4.236-23.491 12.4-29.078 33.113-5.586 20.713-19.854 46.422-12.72 59.575 7.134 13.152 22.585 146.074 14.86 191.799-5.151 30.483-2.418 77.538 8.199 141.165Z"
        transform="translate(110)"
      />
    </g>
  </svg>
);

const IconFUZN = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon-denom"
    viewBox="0 0 183 182"
    fill="none">
    <path
      fill="#FFB83B"
      d="M160.087 140.134a8.542 8.542 0 0 0 8.542-8.542 8.542 8.542 0 1 0-8.542 8.542Z"
    />
    <path
      fill="#FF637B"
      d="M132.932 140.134a8.542 8.542 0 0 0 8.542-8.542 8.542 8.542 0 1 0-17.085 0 8.542 8.542 0 0 0 8.543 8.542ZM104.912 181.19a8.542 8.542 0 1 0 0-17.085 8.542 8.542 0 0 0-8.542 8.543 8.542 8.542 0 0 0 8.542 8.542Z"
    />
    <path
      fill="#E82FCE"
      d="M90.939 160.658a8.543 8.543 0 1 0-.001-17.085 8.543 8.543 0 0 0 0 17.085Z"
    />
    <path
      fill="#FF637B"
      d="M132.859 140.134a8.542 8.542 0 0 0 8.542-8.542 8.542 8.542 0 1 0-8.542 8.542Z"
    />
    <path
      fill="#7232CE"
      d="M76.965 140.134a8.543 8.543 0 1 0 0-17.085 8.543 8.543 0 0 0 0 17.085Z"
    />
    <path
      fill="#E82FCE"
      d="M104.912 140.134a8.542 8.542 0 1 0 0-17.085 8.542 8.542 0 0 0-8.542 8.543 8.542 8.542 0 0 0 8.542 8.542Z"
    />
    <path
      fill="#FFB83B"
      d="M49.665 167.262a8.543 8.543 0 1 0 0-17.085 8.543 8.543 0 0 0 0 17.085Z"
    />
    <path
      fill="#FF637B"
      d="M49.665 140.116a8.543 8.543 0 1 0 0-17.085 8.543 8.543 0 0 0 0 17.085ZM8.609 112.087a8.542 8.542 0 1 0 0-17.084 8.542 8.542 0 0 0 0 17.084Z"
    />
    <path
      fill="#E82FCE"
      d="M29.132 98.123a8.542 8.542 0 1 0 0-17.085 8.542 8.542 0 0 0 0 17.085Z"
    />
    <path
      fill="#FF637B"
      d="M49.665 140.034a8.543 8.543 0 1 0 0-17.085 8.543 8.543 0 0 0 0 17.085Z"
    />
    <path
      fill="#7232CE"
      d="M49.665 84.15a8.542 8.542 0 1 0 0-17.085 8.542 8.542 0 0 0 0 17.085Z"
    />
    <path
      fill="#E82FCE"
      d="M49.665 112.087a8.542 8.542 0 1 0 0-17.084 8.542 8.542 0 0 0 0 17.084Z"
    />
    <path
      fill="#FFB83B"
      d="M22.573 58.14a8.542 8.542 0 1 0 0-17.084 8.542 8.542 0 0 0 0 17.085Z"
    />
    <path
      fill="#FF637B"
      d="M49.728 58.14a8.542 8.542 0 1 0 0-17.084 8.542 8.542 0 0 0 0 17.085ZM77.748 17.085a8.542 8.542 0 1 0 0-17.085 8.542 8.542 0 0 0 0 17.085Z"
    />
    <path
      fill="#E82FCE"
      d="M91.721 37.608a8.542 8.542 0 0 0 8.542-8.542 8.542 8.542 0 1 0-17.084 0 8.542 8.542 0 0 0 8.542 8.542Z"
    />
    <path
      fill="#FF637B"
      d="M49.801 58.14a8.542 8.542 0 1 0 0-17.084 8.542 8.542 0 0 0 0 17.085Z"
    />
    <path
      fill="#7232CE"
      d="M105.695 58.14a8.543 8.543 0 1 0-.001-17.085 8.543 8.543 0 0 0 .001 17.086Z"
    />
    <path
      fill="#E82FCE"
      d="M77.748 58.14a8.542 8.542 0 1 0 0-17.084 8.542 8.542 0 0 0 0 17.085Z"
    />
    <path
      fill="#FFB83B"
      d="M133.005 31.003a8.543 8.543 0 1 0-.001-17.085 8.543 8.543 0 0 0 .001 17.085Z"
    />
    <path
      fill="#FF637B"
      d="M133.005 58.15a8.543 8.543 0 1 0-.001-17.085 8.543 8.543 0 0 0 .001 17.085ZM174.051 86.178a8.543 8.543 0 1 0 0-17.085 8.543 8.543 0 0 0 0 17.085Z"
    />
    <path
      fill="#E82FCE"
      d="M153.528 100.152a8.542 8.542 0 0 0 8.542-8.543 8.542 8.542 0 1 0-17.084 0 8.542 8.542 0 0 0 8.542 8.543Z"
    />
    <path
      fill="#FF637B"
      d="M133.005 58.231a8.543 8.543 0 1 0-.001-17.085 8.543 8.543 0 0 0 .001 17.085Z"
    />
    <path
      fill="#7232CE"
      d="M133.005 114.125a8.542 8.542 0 0 0 0-17.085 8.543 8.543 0 1 0 0 17.085Z"
    />
    <path
      fill="#E82FCE"
      d="M133.005 86.178a8.543 8.543 0 1 0-.001-17.085 8.543 8.543 0 0 0 .001 17.085Z"
    />
  </svg>
);

const IconRFUZN = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 182.528 181.19">
    <path
      fill="#BFBFBF"
      d="M160.02 140.134a8.542 8.542 0 0 0 8.543-8.542 8.542 8.542 0 1 0-8.542 8.542Z"
    />
    <path
      fill="#FF637B"
      d="M132.866 140.134a8.542 8.542 0 0 0 8.542-8.542 8.542 8.542 0 1 0-17.085 0 8.542 8.542 0 0 0 8.543 8.542Z"
    />
    <path
      fill="#949494"
      d="M104.846 181.19a8.542 8.542 0 1 0 0-17.085 8.542 8.542 0 0 0-8.542 8.543 8.542 8.542 0 0 0 8.542 8.542Z"
    />
    <path
      fill="#787878"
      d="M90.872 160.658a8.543 8.543 0 1 0 0-17.085 8.543 8.543 0 0 0 0 17.085Z"
    />
    <path
      fill="#949494"
      d="M132.793 140.134a8.542 8.542 0 0 0 8.542-8.542 8.542 8.542 0 1 0-8.542 8.542Z"
    />
    <path
      fill="#575757"
      d="M76.9 140.134a8.543 8.543 0 1 0 0-17.085 8.543 8.543 0 0 0 0 17.085Z"
    />
    <path
      fill="#787878"
      d="M104.846 140.134a8.542 8.542 0 1 0 0-17.085 8.542 8.542 0 0 0-8.542 8.543 8.542 8.542 0 0 0 8.542 8.542Z"
    />
    <path
      fill="#BFBFBF"
      d="M49.598 167.262a8.543 8.543 0 1 0 0-17.085 8.543 8.543 0 0 0 0 17.085Z"
    />
    <path
      fill="#FF637B"
      d="M49.598 140.116a8.543 8.543 0 1 0 0-17.085 8.543 8.543 0 0 0 0 17.085Z"
    />
    <path
      fill="#949494"
      d="M8.542 112.087a8.542 8.542 0 1 0 0-17.084 8.542 8.542 0 0 0 0 17.084Z"
    />
    <path
      fill="#787878"
      d="M29.066 98.123a8.542 8.542 0 1 0 0-17.085 8.542 8.542 0 0 0 0 17.085Z"
    />
    <path
      fill="#949494"
      d="M49.598 140.034a8.543 8.543 0 1 0 0-17.085 8.543 8.543 0 0 0 0 17.085Z"
    />
    <path
      fill="#575757"
      d="M49.598 84.15a8.542 8.542 0 1 0 0-17.085 8.542 8.542 0 0 0 0 17.085Z"
    />
    <path
      fill="#787878"
      d="M49.598 112.087a8.542 8.542 0 1 0 0-17.084 8.542 8.542 0 0 0 0 17.084Z"
    />
    <path
      fill="#BFBFBF"
      d="M22.507 58.14a8.542 8.542 0 1 0 0-17.084 8.542 8.542 0 0 0 0 17.085Z"
    />
    <path
      fill="#FF637B"
      d="M49.662 58.14a8.542 8.542 0 1 0 0-17.084 8.542 8.542 0 0 0 0 17.085Z"
    />
    <path
      fill="#949494"
      d="M77.681 17.085a8.542 8.542 0 1 0 0-17.085 8.542 8.542 0 0 0 0 17.085Z"
    />
    <path
      fill="#787878"
      d="M91.655 37.608a8.542 8.542 0 0 0 8.542-8.542 8.542 8.542 0 1 0-17.085 0 8.542 8.542 0 0 0 8.543 8.542Z"
    />
    <path
      fill="#949494"
      d="M49.735 58.14a8.542 8.542 0 1 0 0-17.084 8.542 8.542 0 0 0 0 17.085Z"
    />
    <path
      fill="#575757"
      d="M105.629 58.14a8.543 8.543 0 1 0-.002-17.085 8.543 8.543 0 0 0 .002 17.086Z"
    />
    <path
      fill="#787878"
      d="M77.681 58.14a8.542 8.542 0 1 0 0-17.084 8.542 8.542 0 0 0 0 17.085Z"
    />
    <path
      fill="#BFBFBF"
      d="M132.939 31.003a8.543 8.543 0 1 0-.001-17.085 8.543 8.543 0 0 0 0 17.085Z"
    />
    <path
      fill="#FF637B"
      d="M132.939 58.15a8.543 8.543 0 1 0-.002-17.085 8.543 8.543 0 0 0 .002 17.085Z"
    />
    <path
      fill="#949494"
      d="M173.985 86.178a8.543 8.543 0 1 0 0-17.085 8.543 8.543 0 0 0 0 17.085Z"
    />
    <path
      fill="#787878"
      d="M153.462 100.152a8.542 8.542 0 0 0 8.542-8.543 8.542 8.542 0 1 0-17.084 0 8.542 8.542 0 0 0 8.542 8.543Z"
    />
    <path
      fill="#949494"
      d="M132.939 58.231a8.543 8.543 0 1 0-.001-17.085 8.543 8.543 0 0 0 0 17.085Z"
    />
    <path
      fill="#575757"
      d="M132.939 114.125a8.542 8.542 0 0 0 0-17.085 8.543 8.543 0 1 0 0 17.085Z"
    />
    <path
      fill="#787878"
      d="M132.939 86.178a8.543 8.543 0 1 0-.001-17.085 8.543 8.543 0 0 0 0 17.085Z"
    />
  </svg>
);
