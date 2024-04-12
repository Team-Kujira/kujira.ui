import { getSnaps } from "@leapwallet/cosmos-snap-provider";
import clsx from "clsx";
import { Coin } from "cosmjs-types/cosmos/base/v1beta1/coin";
import { Denom, POND, TESTNET } from "kujira.js";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ReactTooltip from "react-tooltip";
import IconMetamask from "../assets/metamask.png";
import IconMetamaskConnected from "../assets/metamask_connected.png";
import IconMetamaskDisabled from "../assets/metamask_disabled.png";
import { useLocalStorage } from "../hooks";
import * as i18n from "../i18n";
import {
  IconAngleRight,
  IconDenom,
  IconSonar,
  IconStation,
  IconXDefi,
} from "../icons";
import { IconCopy } from "../icons/IconCopy";
import { IconKado } from "../icons/IconKado";
import { IconKeplr } from "../icons/IconKeplr";
import { IconLeap } from "../icons/IconLeap";
import { IconWallet } from "../icons/IconWallet";
import { IconWarning } from "../icons/IconWarning";
import { useNetwork } from "../providers/network";
import { Adapter, IWallet, useWallet } from "../providers/wallet";
import { appLink, coinSort } from "../utils";
import KadoModal from "./KadoModal";

export const NetworkWarning = () => {
  const [{ network }] = useNetwork();

  return (
    <>
      {network === TESTNET && (
        <div className="warning md-flex ai-c jc-c">
          <IconWarning className="mr-1" />
          KUJIRA TESTNET
        </div>
      )}
      {network === POND && (
        <div className="warning md-flex ai-c jc-c">
          <svg
            height="1em"
            className="block mr-q1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512">
            <path
              fill="currentColor"
              d="M160 442.5C149.1 446.1 139.2 448 128 448C74.98 448 32 405 32 352V48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H232C245.3 0 256 10.75 256 24C256 37.25 245.3 48 232 48H224V309.9L175 389.4C165.2 405.4 160 423.8 160 442.5zM80 160H176V48H80V160zM80 208V352C80 378.5 101.5 400 128 400C154.5 400 176 378.5 176 352V208H80zM520 0C533.3 0 544 10.75 544 24C544 37.25 533.3 48 520 48H512V217.2L629.1 408.9C636.5 419.6 640 431.8 640 444.4C640 481.7 609.7 512 572.4 512H259.6C222.3 512 191.1 481.7 191.1 444.4C191.1 431.8 195.5 419.6 202 408.9L319.1 217.2V48H311.1C298.7 48 287.1 37.25 287.1 24C287.1 10.75 298.7 0 311.1 0H520zM464 48H368V224C368 228.4 366.8 232.8 364.4 236.6L313.1 320H518.9L467.6 236.6C465.2 232.8 464 228.4 464 224V48zM240 444.4C240 455.2 248.8 464 259.6 464H572.4C583.2 464 592 455.2 592 444.4C592 440.7 590.1 437.2 589.1 434.1L548.4 368H283.6L242.9 434.1C241 437.2 240 440.7 240 444.4H240z"
            />
          </svg>
          KUJIRA POND
        </div>
      )}
    </>
  );
};

const IconManta = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={className}>
    <defs>
      <linearGradient
        id="mnta_grad"
        x1="0%"
        x2="100%"
        y1="15.682%"
        y2="15.682%">
        <stop offset="0%" stopColor="#C900FE" />
        <stop offset="100%" stopColor="#02FCBA" />
      </linearGradient>
    </defs>
    <path
      fill="url(#mnta_grad)"
      fillRule="evenodd"
      d="M9.935 2.008c.51.118-.987 1.037-.868 1.364.12.327.58.665.963.62.383-.044 1.127-1.38 1.335-.888.262.622-1.09 3.587.239 4.625 1.291 1.01 3.324 1.108 5.257.937 2.498-.222 4.897-1.832 6.51-2.073.855-.128 1.063 3.322-.83 5.439-.985 1.103-2.215 2.388-3.477 3.429-1.575 1.297-2.67 1.676-3.085 3.014-.533 1.721 1.018 1.934 2.538 1.61 1.496-.32 2.947-1.157 3.159-.953.287.276-1.133 1.278-3.655 1.79-3.481.707-8.972.335-13.81-5.261C.95 11.89-.28 6.025.051 4.54c.438-1.958 3.327 1.532 5.262.6.812-.392 1.491-.789 2.119-1.575.855-1.072 2.139-1.642 2.502-1.558Z"
    />
  </svg>
);

export function Wallet({
  adapter = useWallet,
}: {
  adapter?: () => Pick<
    IWallet,
    | "adapter"
    | "balance"
    | "account"
    | "connect"
    | "disconnect"
    | "balances"
    | "chainInfo"
  >;
}) {
  const {
    adapter: a,
    account,
    connect,
    disconnect,
    balances,
  } = adapter();
  const [showKado, setShowKado] = useState(false);
  const [showWalletSelect, setShowWalletSelect] = useState(false);
  const [{ chainInfo }] = useNetwork();
  const [snapsSupported, setSnapsSupported] = useLocalStorage(
    "snaps",
    ""
  );
  useEffect(() => {
    getSnaps()
      .then(() => {
        setSnapsSupported("y");
      })
      .catch(() => {
        setSnapsSupported("");
      });
  }, []);

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [showWalletSelect]);

  if (account) {
    return (
      <>
        {a !== Adapter.Sonar && (
          <a
            className="wallet__sonar"
            onClick={() => {
              disconnect();
              connect && connect(Adapter.Sonar);
            }}
            /* href={appLink("sonar")}
            target="_blank" */
          >
            Switch to <strong>Sonar</strong> by Kujira
            <IconAngleRight />
          </a>
        )}
        <NetworkWarning />
        <div className="md-button md-button--grey md-button--outline md-button--wallet">
          {a === Adapter.Sonar && <Sonar />}
          {a === Adapter.Leap && <Leap />}
          {a === Adapter.LeapSnap && (
            <img
              src={IconMetamaskConnected}
              width="1rem"
              className="mm"
              alt="MetaMask"
            />
          )}

          {a === Adapter.Xfi && <XDefi />}
          {a === Adapter.Station && <Station />}
          {a === Adapter.Keplr && <Keplr />}
          {a === Adapter.ReadOnly && <ReadOnly />}

          <span className="desktop color-white">
            {account.label ? (
              account.label
            ) : (
              <>
                {account.address.substr(0, 6)}...
                {account.address.substr(-6)}
              </>
            )}
          </span>

          <span className="mobile color-white">
            {account.label ? (
              account.label
            ) : (
              <>
                {account.address.substr(0, 3)}...
                {account.address.substr(-3)}
              </>
            )}
          </span>
        </div>

        <div className="wallet__popup">
          <span className="address mb-2">
            {account.label ? (
              <>
                {account.label} {account.address.substr(0, 16)}...
                {account.address.substr(-16)}
              </>
            ) : (
              <>
                {account.address.substr(0, 16)}...
                {account.address.substr(-16)}
              </>
            )}
            <div
              className="copy"
              onClick={() => {
                navigator.clipboard.writeText(account.address || "");
                toast.success(i18n.t("Copied address to clipboard"));
              }}>
              <IconCopy />
            </div>
          </span>
          <table className="balances">
            <tbody>
              {balances
                ?.sort(coinSort)
                .sort((a, b) => {
                  return chainInfo.feeCurrencies.find(
                    (c) => c.coinMinimalDenom === b.denom
                  )
                    ? 1
                    : -1;
                })
                .slice(0, 10)
                .map((b) => (
                  <Balance balance={b} key={b.denom} />
                ))}
              {balances.length > 5 && (
                <tr>
                  <td
                    className="text-right mono color-grey"
                    colSpan={2}>
                    + {balances.length - 5}
                  </td>
                  <td className="text-right mono">
                    <a
                      className="inline-link"
                      href={`${appLink("blue")}/wallet`}>
                      View all
                    </a>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {a === Adapter.DaoDao ? (
            <i18n.button
              className="md-button md-button--grey md-button--outline md-button--full disconnect"
              onClick={() => {
                disconnect();
              }}>
              Disconnect from DAO
            </i18n.button>
          ) : (
            <>
              <i18n.button
                className="md-button md-button--grey md-button--outline md-button--full disconnect"
                onClick={() => {
                  disconnect();
                }}>
                Disconnect Wallet
              </i18n.button>
            </>
          )}

          <div className="md-row mt-2 pad-tight wrap">
            <div className="col-4">
              <button
                className="md-flex dir-c pointer transparent ai-c"
                onClick={() => setShowKado(true)}>
                <IconKado />
                <span className="fs-11 color-white fw-600 text-center mt-q1">
                  Fund with Kado
                </span>
              </button>
            </div>
            <div className="col-4">
              <a
                className="md-flex dir-c pointer ai-c"
                href="https://app.localmoney.io/"
                target="_blank">
                <IconDenom denom={"local"} />
                <span className="fs-11 color-white fw-600 text-center mt-q1">
                  Fund with Local
                </span>
              </a>
            </div>
            {a !== Adapter.DaoDao && (
              <div className="col-4">
                <button
                  disabled
                  data-tip="Coming Soon..."
                  className="md-flex dir-c pointer transparent ai-c"
                  // onClick={() => {
                  //   connect && connect(Adapter.CW3);
                  // }}
                >
                  <IconManta className="w-3 block" />
                  <span className="fs-11 color-white fw-600 text-center mt-q1">
                    Connect DAO
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* <div className="md-flex jc-e mb-1 pr-1">
            <button
              className="transparent md-flex ai-c jc-e mr-0 ml-a pointer"
              onClick={() => setShowKado(true)}>
              <IconKado />
              <span className="fs-12 color-white ml-1 fw-600">
                Fund with Kado
              </span>
            </button>
          </div> */}

          {/* <div className="md-flex jc-e mb-1 pr-1">
            <a
              className="transparent md-flex ai-c jc-e mr-0 ml-a pointer"
              href="https://app.localmoney.io/">
              <IconDenom denom={"local"} />
              <span className="fs-12 color-white ml-1 fw-600">
                Fund with Local Money
              </span>
            </a>
          </div> */}
        </div>
        {showKado && <KadoModal onClose={() => setShowKado(false)} />}
      </>
    );
  }
  return (
    <>
      <button
        id="connect-wallet"
        onClick={() => setShowWalletSelect(!showWalletSelect)}
        className="md-button md-button--grey md-button--nowrap">
        <IconWallet />
        <i18n.span>Connect Wallet</i18n.span>
      </button>
      {/* <NetworkSelect onChange={(n) => connect && connect(n)} /> */}
      {showWalletSelect && (
        <div className="wallet__connections ai-c">
          <button
            className="transparent block pointer sonar"
            onClick={() => {
              connect && connect(Adapter.Sonar);
            }}>
            <IconSonar />
          </button>

          <hr className="hr my-q3" />
          <div className="md-flex w-full ai-c jc-c wrap">
            <button
              data-tip={
                snapsSupported
                  ? undefined
                  : "MetaMask Snap support coming soon"
              }
              className={clsx({
                "transparent block": true,
                pointer: !!snapsSupported,
              })}
              disabled={!snapsSupported}
              onClick={() => {
                connect && connect(Adapter.LeapSnap);
              }}>
              <img
                src={
                  !snapsSupported
                    ? IconMetamaskDisabled
                    : IconMetamask
                }
                width="1rem"
                className="mm"
                alt="MetaMask"
              />
            </button>

            <button
              className="transparent block pointer"
              onClick={() => {
                connect && connect(Adapter.Keplr);
              }}>
              <IconKeplr />
            </button>

            <button
              className="transparent block pointer"
              onClick={() => {
                connect && connect(Adapter.Leap);
              }}>
              <IconLeap />
            </button>

            <button
              className="transparent block pointer"
              onClick={() => {
                connect && connect(Adapter.Station);
              }}>
              <IconStation />
            </button>
            <button
              className="transparent block pointer"
              onClick={() => {
                connect && connect(Adapter.Xfi);
              }}>
              <IconXDefi />
            </button>
          </div>

          <hr className="hr my-q3" />
          <button
            className="transparent block pointer color-grey fw-600 fs-12 p-2 text-center mt-1"
            onClick={() => {
              connect && connect(Adapter.ReadOnly);
            }}>
            Read Only Connect
          </button>
        </div>
      )}
    </>
  );
}

const Balance: React.FC<{ balance: Coin }> = ({ balance }) => {
  const denom = Denom.from(balance.denom || "");
  const { feeDenom, setFeeDenom } = useWallet();
  const [{ chainInfo }] = useNetwork();
  const isSupported = chainInfo.feeCurrencies.find(
    (c) => c.coinMinimalDenom === balance.denom
  );
  const isSelected = feeDenom === balance.denom;
  useEffect(() => {
    ReactTooltip.rebuild();
  }, [feeDenom]);

  return (
    <tr>
      <td className="text-right mono">
        {(
          parseInt(balance.amount || "0") /
          10 ** denom.decimals
        ).toLocaleDecimal(3)}
      </td>
      <td className="text-left mono color-grey">{denom.symbol}</td>
      <td className="w-1">
        {isSelected ? (
          <svg
            className="color-teal"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="1em"
            height="1em">
            <path
              fill="currentColor"
              d="M32 64C32 28.65 60.65 0 96 0H256C291.3 0 320 28.65 320 64V256H328C376.6 256 416 295.4 416 344V376C416 389.3 426.7 400 440 400C453.3 400 464 389.3 464 376V221.1C436.4 214.9 416 189.8 416 160V96L384 64C375.2 55.16 375.2 40.84 384 32C392.8 23.16 407.2 23.16 416 32L493.3 109.3C505.3 121.3 512 137.5 512 154.5V376C512 415.8 479.8 448 440 448C400.2 448 368 415.8 368 376V344C368 321.9 350.1 303.1 328 303.1H320V448C337.7 448 352 462.3 352 480C352 497.7 337.7 512 320 512H32C14.33 512 0 497.7 0 480C0 462.3 14.33 448 32 448V64zM96 176C96 184.8 103.2 192 112 192H240C248.8 192 256 184.8 256 176V80C256 71.16 248.8 64 240 64H112C103.2 64 96 71.16 96 80V176z"
            />
          </svg>
        ) : isSupported ? (
          <button
            data-tip="Use for gas payment"
            className="transparent color-grey pointer"
            onClick={() =>
              balance.denom && setFeeDenom(balance.denom)
            }>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="1em"
              height="1em">
              <path
                fill="currentColor"
                d="M96 0H256C291.3 0 320 28.65 320 64V256H328C376.6 256 416 295.4 416 344V376C416 389.3 426.7 400 440 400C453.3 400 464 389.3 464 376V221.1C436.4 214.9 416 189.8 416 160V97.94L383 64.97C373.7 55.6 373.7 40.4 383 31.03C392.4 21.66 407.6 21.66 416.1 31.03L490.9 104.1C504.4 118.5 512 136.8 512 155.9V376C512 415.8 479.8 448 440 448C400.2 448 368 415.8 368 376V344C368 321.9 350.1 304 328 304H320V464H328C341.3 464 352 474.7 352 488C352 501.3 341.3 512 328 512H24C10.75 512 0 501.3 0 488C0 474.7 10.75 464 24 464H32V64C32 28.65 60.65 0 96 0zM256 48H96C87.16 48 80 55.16 80 64V192H272V64C272 55.16 264.8 48 256 48zM272 240H80V464H272V240z"
              />
            </svg>
          </button>
        ) : null}
      </td>
    </tr>
  );
};

export const Keplr = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 57 57">
    <g fill="#60fbd0" fillRule="evenodd">
      <path d="M54 33.32v-9.64c0-4.39-.002-7.547-.236-10.01-.232-2.436-.677-3.994-1.44-5.24a11.373 11.373 0 0 0-3.754-3.754c-1.246-.763-2.804-1.208-5.24-1.44C40.868 3.002 37.71 3 33.32 3h-9.64c-4.39 0-7.547.002-10.01.236-2.436.232-3.994.677-5.24 1.44A11.373 11.373 0 0 0 4.676 8.43c-.763 1.246-1.208 2.804-1.44 5.24C3.002 16.132 3 19.29 3 23.68v9.64c0 4.39.002 7.547.236 10.01.232 2.436.677 3.994 1.44 5.24a11.373 11.373 0 0 0 3.754 3.754c1.246.763 2.804 1.208 5.24 1.44 2.463.234 5.62.236 10.01.236h9.64c4.39 0 7.547-.002 10.01-.236 2.436-.232 3.994-.677 5.24-1.44a11.373 11.373 0 0 0 3.754-3.754c.763-1.246 1.208-2.804 1.44-5.24.234-2.463.236-5.62.236-10.01ZM50.402 2.036C47.079 0 42.556 0 33.509 0H23.491C14.444 0 9.92 0 6.598 2.036a13.818 13.818 0 0 0-4.562 4.562C0 9.921 0 14.444 0 23.491v10.018c0 9.047 0 13.57 2.036 16.893a13.818 13.818 0 0 0 4.562 4.562C9.921 57 14.444 57 23.491 57h10.018c9.047 0 13.57 0 16.893-2.036a13.818 13.818 0 0 0 4.562-4.562C57 47.079 57 42.556 57 33.509V23.491c0-9.047 0-13.57-2.036-16.893a13.819 13.819 0 0 0-4.562-4.562Z" />
      <path
        fillRule="nonzero"
        d="M23.191 43.385V30.201l12.393 13.184h6.894v-.34L28.224 28.032l13.154-14.247v-.17h-6.936L23.191 26.203V13.615h-5.583v29.77z"
      />
    </g>
  </svg>
);

export const Sonar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 73 73">
    <path
      fill="#60FBD0"
      fillRule="nonzero"
      d="M36.583 72.84A36.337 36.337 0 0 1 2.415 48.893 36.347 36.347 0 0 1 13.283 8.607 36.334 36.334 0 0 1 54.86 5.094a36.341 36.341 0 0 1 17.474 37.89 4.543 4.543 0 0 1-8.938-1.614 27.255 27.255 0 1 0-22.41 22.022l.47-.081a4.54 4.54 0 0 1 5.398 3.64 4.542 4.542 0 0 1-3.785 5.298c-1.872.34-3.768.534-5.67.58l-.816.011Zm.001-18.171a18.168 18.168 0 0 1-18.17-18.17 18.168 18.168 0 0 1 18.17-18.17 18.168 18.168 0 0 1 18.17 18.17 18.168 18.168 0 0 1-18.17 18.17Zm0-9.085A9.088 9.088 0 0 0 45.67 36.5a9.088 9.088 0 0 0-9.085-9.085 9.088 9.088 0 0 0-9.085 9.085 9.088 9.088 0 0 0 9.085 9.085ZM60.433 64.89a4.543 4.543 0 1 1-.001-9.085 4.543 4.543 0 0 1 0 9.085Z"
    />
  </svg>
);

export const Station = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 91">
    <path
      fill="#60FBD0"
      fillRule="nonzero"
      d="m13.855 64.817 21.403 11.434-13.624 13.926a.63.63 0 0 1-.738.182h-.06L.376 79.892a.714.714 0 0 1-.23-1.062l13.71-14.013Zm9.94-51.098.283.137 11.9 6.097c.172.06.344.125.513.195l-.087.026.161.082a12.293 12.293 0 0 1 8.344.57l.391.18 8.518 4.284 25.118 12.728c4.488 2.291 6.878 7.2 6.843 12.677l-.006.322 4.488 2.161-.05.1.146.07c2.735 1.379 3.158 5.904 1.017 10.139-2.142 4.234-6.05 6.545-8.784 5.166a3.647 3.647 0 0 1-.83-.576l-3.779-1.915c-4.273 3.41-9.652 4.485-14.18 2.355l-.339-.166-13.651-6.904-10.297 10.127L18.05 60.13l10.016-9.81a11.942 11.942 0 0 1-3.894-5.04l-.142-.365-12.28-6.279a.325.325 0 0 0-.154-.102l-.04-.007c-5.542-2.795-7.2-10.647-3.75-17.41 3.39-6.65 10.485-9.942 15.99-7.397Zm36.13 5.599L81.343 30.75l-5.746 5.573L53.818 25.29l6.108-5.972ZM78.786.002l.1.016.1.033L99.59 10.517a.723.723 0 0 1 .35.943.508.508 0 0 1-.072.119L85.421 26.282 63.97 14.86 78.246.232a.63.63 0 0 1 .54-.23Z"
    />
  </svg>
);

export const Leap = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 805 877.708">
    <g fill="#60FBD0" fillRule="nonzero">
      <path d="M575.435 0c58.54 0 106.078 48.513 106.078 108.252 0 19.646-5.107 37.888-13.947 53.725 8.447 18.443 12.965 38.09 12.965 58.536 0 12.576-1.733 24.866-5.041 36.758 6.391 7.924 12.028 16.166 16.85 24.68l.679 1.212 1.124-1.038A256.572 256.572 0 0 1 724.1 258.48c127.883-86.2 26.716 210.49 26.716 210.49l26.519 17.241c8.84 5.813 5.108 20.848-4.911 20.848H622.343c-10.629 0-19.292-8.883-20.885-20.108-52.11 19.186-118.806 27.904-191.667 27.904-70.215 0-135.049-8.096-186.682-25.851-2.55 10.236-11.759 18.055-22.821 18.055H34.295c-11.198 0-15.323-15.035-5.5-20.848l29.27-17.24-.293-.784C51.574 451.513-49.664 174.865 87.53 258.48c12.845 7.826 24.49 16.278 35.047 25.18l1.163.985.647-1.183c5.243-9.499 11.496-18.664 18.67-27.435a136.55 136.55 0 0 1-4.704-35.514c0-20.447 4.518-40.093 12.965-58.536-8.839-15.837-13.947-34.079-13.947-53.725C137.371 48.513 184.91 0 243.449 0c32.806 0 62.272 15.436 81.916 39.492 26.52-6.214 54.808-9.422 84.077-9.422 29.27 0 57.558 3.408 84.077 9.422C512.967 15.436 542.433 0 575.435 0ZM234.9 36.166c-35.802 0-64.826 29.618-64.826 66.154s29.024 66.154 64.826 66.154c35.802 0 64.825-29.618 64.825-66.154S270.702 36.166 234.9 36.166Zm345.898 0c-35.802 0-64.825 29.618-64.825 66.154s29.023 66.154 64.825 66.154c35.802 0 64.826-29.618 64.826-66.154S616.6 36.166 580.798 36.166ZM235.017 89.94c6.509 0 11.786 5.385 11.786 12.028 0 6.643-5.277 12.028-11.786 12.028-6.51 0-11.787-5.385-11.787-12.028 0-6.643 5.277-12.028 11.787-12.028Zm345.572 0c6.51 0 11.787 5.385 11.787 12.028 0 6.643-5.277 12.028-11.787 12.028-6.509 0-11.786-5.385-11.786-12.028 0-6.643 5.277-12.028 11.786-12.028ZM0 567.708h805v310H0z" />
    </g>
  </svg>
);

export const ReadOnly = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
    <path
      fill="#60FBD0"
      d="M160 256C160 185.3 217.3 128 288 128C358.7 128 416 185.3 416 256C416 326.7 358.7 384 288 384C217.3 384 160 326.7 160 256zM288 336C332.2 336 368 300.2 368 256C368 211.8 332.2 176 288 176C287.3 176 286.7 176 285.1 176C287.3 181.1 288 186.5 288 192C288 227.3 259.3 256 224 256C218.5 256 213.1 255.3 208 253.1C208 254.7 208 255.3 208 255.1C208 300.2 243.8 336 288 336L288 336zM95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6V112.6zM288 80C222.8 80 169.2 109.6 128.1 147.7C89.6 183.5 63.02 225.1 49.44 256C63.02 286 89.6 328.5 128.1 364.3C169.2 402.4 222.8 432 288 432C353.2 432 406.8 402.4 447.9 364.3C486.4 328.5 512.1 286 526.6 256C512.1 225.1 486.4 183.5 447.9 147.7C406.8 109.6 353.2 80 288 80V80z"
    />
  </svg>
);

export const XDefi = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 590.031 594.223">
    <g fill="#60FBD0" fillRule="nonzero">
      <path d="M353.8 333.56c-45.642 28.112-106.734 42.59-168.606 39.497-52.021-2.53-94.686-21.083-120.484-51.584-22.679-27.268-31.467-63.25-25.514-104.644a135.018 135.018 0 0 1 12.261-39.637l.85-1.757c21.414-40.88 53.193-75.527 92.209-100.53 39.017-25.004 83.927-39.502 130.31-42.07 46.384-2.566 92.641 6.888 134.222 27.43 41.58 20.544 77.049 51.47 102.916 89.733 25.868 38.264 41.242 82.547 44.61 128.492 3.368 45.944-5.386 91.966-25.401 133.537-20.015 41.57-50.601 77.258-88.748 103.548-38.147 26.29-82.54 42.278-128.81 46.39l2.835 32.258c51.95-4.59 101.797-22.518 144.633-52.022 42.836-29.504 77.181-69.565 99.653-116.236 22.471-46.671 32.294-98.342 28.5-149.923-3.794-51.58-21.074-101.291-50.137-144.235-29.063-42.944-68.907-77.64-115.607-100.667C376.792 8.112 324.848-2.455 272.777.48c-52.071 2.935-102.473 19.27-146.24 47.398-43.767 28.128-79.39 67.077-103.358 113.009l-1.134 2.32A166.663 166.663 0 0 0 6.878 212.4c-7.087 50.46 3.898 95.368 32.601 129.945 31.397 37.809 82.496 60.298 143.801 63.25 74.629 3.725 148.833-16.445 201.491-53.552L353.8 333.56Z" />
      <path d="M416.235 370.244c-29.695 25.58-98.725 71.965-213.256 78.29-128.208 7.027-181.646-34.296-182.142-34.718l-10.348 12.65 10.419-12.44L0 438.907c2.268 1.897 53.509 42.939 173.851 42.939 9.851 0 20.199 0 30.971-.843 138.415-7.66 214.461-67.537 240.967-93.118l-29.554-17.64Z" />
      <path d="M471.806 403.7a238.273 238.273 0 0 1-63.786 57.629c-86.748 55.52-197.096 62.688-274.348 58.823l-1.63 32.398c12.97.633 25.444.914 37.563.914 217.862 0 305.886-98.39 330.479-133.53l-28.349-16.514M463.511 281.032c14.442 0 26.15-11.61 26.15-25.93 0-14.321-11.708-25.931-26.15-25.931-14.442 0-26.15 11.61-26.15 25.93 0 14.322 11.708 25.93 26.15 25.93Z" />
    </g>
  </svg>
);
