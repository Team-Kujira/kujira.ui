import { Coin } from "cosmjs-types/cosmos/base/v1beta1/coin";
import { Denom, LOCALNET, TESTNET } from "kujira.js";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ReactTooltip from "react-tooltip";
import * as i18n from "../i18n";
import { IconDenom, IconSonar, IconStation } from "../icons";
import { IconCopy } from "../icons/IconCopy";
import { IconKado } from "../icons/IconKado";
import { IconKeplr } from "../icons/IconKeplr";
import { IconLeap } from "../icons/IconLeap";
import { IconManta } from "../icons/IconManta";
import { IconWallet } from "../icons/IconWallet";
import { IconWarning } from "../icons/IconWarning";
import { useNetwork } from "../providers/network";
import { Adapter, IWallet, useWallet } from "../providers/wallet";
import { coinSort } from "../utils";
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
      {network === LOCALNET && (
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
          KUJIRA LOCAL
        </div>
      )}
    </>
  );
};

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

  if (account) {
    return (
      <>
        <NetworkWarning />
        <div className="md-button md-button--grey md-button--outline md-button--wallet">
          {a === Adapter.Sonar && <Sonar />}
          {a === Adapter.Leap && <IconLeap />}
          {a === Adapter.Xfi && "XDEFI"}
          {a === Adapter.Station && <Station />}
          {a === Adapter.Keplr && <Keplr />}
          {a === Adapter.CW3 && <IconManta />}
          {a === Adapter.ReadOnly && <ReadOnly />}
          <span className="desktop color-white">
            {account.address.substr(0, 6)}...
            {account.address.substr(-6)}
          </span>
          <span className="mobile color-white">
            {account.address.substr(0, 3)}...
            {account.address.substr(-3)}
          </span>
        </div>
        <div className="wallet__popup">
          <span className="address mb-2">
            {account.address.substr(0, 16)}...
            {account.address.substr(-16)}
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
                      href="https://blue.kujira.app/wallet">
                      View all
                    </a>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="md-flex jc-e mb-1 pr-1">
            <button
              className="transparent md-flex ai-c jc-e mr-0 ml-a pointer"
              onClick={() => setShowKado(true)}>
              <IconKado />
              <span className="fs-12 color-white ml-1 fw-600">
                Fund with Kado
              </span>
            </button>
          </div>

          <div className="md-flex jc-e mb-1 pr-1">
            <a
              className="transparent md-flex ai-c jc-e mr-0 ml-a pointer"
              href="https://app.localmoney.io/">
              <IconDenom denom={"local"} />
              <span className="fs-12 color-white ml-1 fw-600">
                Fund with Local Money
              </span>
            </a>
          </div>
          {a === Adapter.CW3 ? (
            <i18n.button
              className="md-button md-button--grey md-button--outline disconnect"
              onClick={() => {
                disconnect();
              }}>
              Disconnect from SQUAD
            </i18n.button>
          ) : (
            <>
              <i18n.button
                className="md-button md-button--grey md-button--outline disconnect"
                onClick={() => {
                  disconnect();
                }}>
                Disconnect Wallet
              </i18n.button>
              {/* <br />
              <button
                className="md-button md-button--outline"
                onClick={() => {
                  connect && connect(Adapter.CW3);
                }}>
                <IconManta />
              </button> */}
            </>
          )}
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
        <div className="wallet__connections">
          <button
            className="transparent block pointer"
            onClick={() => {
              connect && connect(Adapter.Sonar);
            }}>
            <IconSonar />
          </button>

          <hr className="hr my-2" />

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
            XDEFI
          </button>

          <hr className="hr my-2" />
          <button
            className="transparent block pointer color-white fw-600 fs-12 p-2"
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

export const ReadOnly = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
    <path
      fill="#60FBD0"
      d="M160 256C160 185.3 217.3 128 288 128C358.7 128 416 185.3 416 256C416 326.7 358.7 384 288 384C217.3 384 160 326.7 160 256zM288 336C332.2 336 368 300.2 368 256C368 211.8 332.2 176 288 176C287.3 176 286.7 176 285.1 176C287.3 181.1 288 186.5 288 192C288 227.3 259.3 256 224 256C218.5 256 213.1 255.3 208 253.1C208 254.7 208 255.3 208 255.1C208 300.2 243.8 336 288 336L288 336zM95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6V112.6zM288 80C222.8 80 169.2 109.6 128.1 147.7C89.6 183.5 63.02 225.1 49.44 256C63.02 286 89.6 328.5 128.1 364.3C169.2 402.4 222.8 432 288 432C353.2 432 406.8 402.4 447.9 364.3C486.4 328.5 512.1 286 526.6 256C512.1 225.1 486.4 183.5 447.9 147.7C406.8 109.6 353.2 80 288 80V80z"
    />
  </svg>
);

export const Leap = () => <p>Leap</p>;
