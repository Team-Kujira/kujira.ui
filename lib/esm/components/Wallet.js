import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import KadoModal from "./KadoModal";
import { TESTNET, MAINNET, LOCALNET, NETWORKS, Denom, } from "kujira.js";
import { useWallet } from "../providers/wallet";
import { useNetwork } from "../hooks/useNetwork";
import { IconWarning } from "../icons/IconWarning";
import { IconCopy } from "../icons/IconCopy";
import { IconKado } from "../icons/IconKado";
import { IconWallet } from "../icons/IconWallet";
import { Select } from "./Select";
import * as i18n from "../i18n";
const names = {
    [TESTNET]: "Testnet",
    [MAINNET]: "Mainnet",
    [LOCALNET]: "Local",
};
export const NetworkSelect = ({ onChange, }) => {
    const [{ network }] = useNetwork();
    /* const [showList, setShowList] = useState(false);
  
    return (
      <>
        <Network onClick={() => setShowList(!showList)} />
        {showList && (
          <ul className="wallet__network-select">
            <li
              onClick={() => onChange(MAINNET)}
              className={names[network] === MAINNET ? "current" : ""}>
              Mainnet
            </li>
            <li
              onClick={() => onChange(TESTNET)}
              className={names[network] === TESTNET ? "current" : ""}>
              Mainnet
            </li>
            <li
              onClick={() => onChange(LOCALNET)}
              className={names[network] === LOCALNET ? "current" : ""}>
              Local
            </li>
          </ul>
        )}
      </>
    ); */
    return (_jsx(_Fragment, { children: Object.entries(NETWORKS).length > 1 && (_jsx(Select, { className: "w-full condensed select--light select--tight mb-1", selected: {
                label: names[network],
                value: network,
            }, onChange: onChange, options: [
                { label: "Mainnet", value: MAINNET },
                { label: "Testnet", value: TESTNET },
                { label: "Local", value: LOCALNET },
            ] })) }));
};
export const NetworkWarning = () => {
    const [{ network }] = useNetwork();
    return (_jsxs(_Fragment, { children: [network === TESTNET && (_jsxs("div", Object.assign({ className: "warning md-flex ai-c jc-c" }, { children: [_jsx(IconWarning, { className: "mr-1" }), "KUJIRA TESTNET"] }))), network === LOCALNET && (_jsxs("div", Object.assign({ className: "warning md-flex ai-c jc-c" }, { children: [_jsx("svg", Object.assign({ height: "1em", className: "block mr-q1", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 512" }, { children: _jsx("path", { fill: "currentColor", d: "M160 442.5C149.1 446.1 139.2 448 128 448C74.98 448 32 405 32 352V48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H232C245.3 0 256 10.75 256 24C256 37.25 245.3 48 232 48H224V309.9L175 389.4C165.2 405.4 160 423.8 160 442.5zM80 160H176V48H80V160zM80 208V352C80 378.5 101.5 400 128 400C154.5 400 176 378.5 176 352V208H80zM520 0C533.3 0 544 10.75 544 24C544 37.25 533.3 48 520 48H512V217.2L629.1 408.9C636.5 419.6 640 431.8 640 444.4C640 481.7 609.7 512 572.4 512H259.6C222.3 512 191.1 481.7 191.1 444.4C191.1 431.8 195.5 419.6 202 408.9L319.1 217.2V48H311.1C298.7 48 287.1 37.25 287.1 24C287.1 10.75 298.7 0 311.1 0H520zM464 48H368V224C368 228.4 366.8 232.8 364.4 236.6L313.1 320H518.9L467.6 236.6C465.2 232.8 464 228.4 464 224V48zM240 444.4C240 455.2 248.8 464 259.6 464H572.4C583.2 464 592 455.2 592 444.4C592 440.7 590.1 437.2 589.1 434.1L548.4 368H283.6L242.9 434.1C241 437.2 240 440.7 240 444.4H240z" }) })), "KUJIRA LOCAL"] })))] }));
};
export function Wallet({ adapter = useWallet, }) {
    const { account, connect, disconnect, balances, chainInfo } = adapter();
    const [showKado, setShowKado] = useState(false);
    if (account) {
        return (_jsxs(_Fragment, { children: [_jsx(NetworkWarning, {}), _jsxs("div", Object.assign({ className: "md-button md-button--grey md-button--outline" }, { children: [account ? _jsx(KujiConnected, {}) : _jsx(KujiUnconnected, {}), _jsxs("span", Object.assign({ className: "desktop color-white" }, { children: [account.address.substr(0, 6), "...", account.address.substr(-6)] })), _jsxs("span", Object.assign({ className: "mobile color-white" }, { children: [account.address.substr(0, 3), "...", account.address.substr(-3)] }))] })), _jsxs("div", Object.assign({ className: "wallet__popup" }, { children: [Object.keys(NETWORKS).includes(chainInfo.chainId) && (_jsx(NetworkSelect, { onChange: (n) => connect && connect(n) })), _jsxs("small", Object.assign({ className: "network" }, { children: ["Network: ", chainInfo.chainId] })), _jsxs("span", Object.assign({ className: "address mb-2" }, { children: [account.address.substr(0, 16), "...", account.address.substr(-16), _jsx("div", Object.assign({ className: "copy", onClick: () => {
                                        navigator.clipboard.writeText(account.address || "");
                                        toast.success(i18n.t("Copied address to clipboard"));
                                    } }, { children: _jsx(IconCopy, {}) }))] })), _jsx("table", Object.assign({ className: "balances" }, { children: _jsx("tbody", { children: balances === null || balances === void 0 ? void 0 : balances.map((b) => (_jsx(Balance, { balance: b }, b.denom))) }) })), _jsx("div", Object.assign({ className: "md-flex jc-e mb-1 pr-1" }, { children: _jsxs("button", Object.assign({ className: "transparent md-flex ai-c jc-e mr-0 ml-a pointer", onClick: () => setShowKado(true) }, { children: [_jsx(IconKado, {}), _jsx("span", Object.assign({ className: "fs-12 color-white ml-1 fw-600" }, { children: "Fund with Kado" }))] })) })), _jsx(i18n.button, Object.assign({ className: "md-button md-button--grey md-button--outline disconnect", onClick: () => {
                                disconnect();
                            } }, { children: "Disconnect Wallet" }))] })), showKado && _jsx(KadoModal, { onClose: () => setShowKado(false) })] }));
    }
    return (_jsx(_Fragment, { children: _jsxs("button", Object.assign({ onClick: () => connect && connect(), className: "md-button md-button--grey md-button--nowrap" }, { children: [_jsx(IconWallet, {}), _jsx(i18n.span, { children: "Connect Wallet" })] })) }));
}
const Balance = ({ balance }) => {
    const denom = Denom.from(balance.denom || "");
    const { feeDenom, setFeeDenom } = useWallet();
    const [{ chainInfo }] = useNetwork();
    const isSupported = chainInfo.feeCurrencies.find((c) => c.coinMinimalDenom === balance.denom);
    const isSelected = feeDenom === balance.denom;
    useEffect(() => {
        ReactTooltip.rebuild();
    }, [feeDenom]);
    return (_jsxs("tr", { children: [_jsx("td", Object.assign({ className: "text-right mono" }, { children: (parseInt(balance.amount || "0") /
                    Math.pow(10, denom.decimals)).toLocaleDecimal(3) })), _jsx("td", Object.assign({ className: "text-left mono color-grey" }, { children: denom.symbol })), _jsx("td", Object.assign({ className: "w-1" }, { children: isSelected ? (_jsx("svg", Object.assign({ className: "color-teal", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512", width: "1em", height: "1em" }, { children: _jsx("path", { fill: "currentColor", d: "M32 64C32 28.65 60.65 0 96 0H256C291.3 0 320 28.65 320 64V256H328C376.6 256 416 295.4 416 344V376C416 389.3 426.7 400 440 400C453.3 400 464 389.3 464 376V221.1C436.4 214.9 416 189.8 416 160V96L384 64C375.2 55.16 375.2 40.84 384 32C392.8 23.16 407.2 23.16 416 32L493.3 109.3C505.3 121.3 512 137.5 512 154.5V376C512 415.8 479.8 448 440 448C400.2 448 368 415.8 368 376V344C368 321.9 350.1 303.1 328 303.1H320V448C337.7 448 352 462.3 352 480C352 497.7 337.7 512 320 512H32C14.33 512 0 497.7 0 480C0 462.3 14.33 448 32 448V64zM96 176C96 184.8 103.2 192 112 192H240C248.8 192 256 184.8 256 176V80C256 71.16 248.8 64 240 64H112C103.2 64 96 71.16 96 80V176z" }) }))) : isSupported ? (_jsx("button", Object.assign({ "data-tip": "Use for gas payment", className: "transparent color-grey pointer", onClick: () => balance.denom && setFeeDenom(balance.denom) }, { children: _jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512", width: "1em", height: "1em" }, { children: _jsx("path", { fill: "currentColor", d: "M96 0H256C291.3 0 320 28.65 320 64V256H328C376.6 256 416 295.4 416 344V376C416 389.3 426.7 400 440 400C453.3 400 464 389.3 464 376V221.1C436.4 214.9 416 189.8 416 160V97.94L383 64.97C373.7 55.6 373.7 40.4 383 31.03C392.4 21.66 407.6 21.66 416.1 31.03L490.9 104.1C504.4 118.5 512 136.8 512 155.9V376C512 415.8 479.8 448 440 448C400.2 448 368 415.8 368 376V344C368 321.9 350.1 304 328 304H320V464H328C341.3 464 352 474.7 352 488C352 501.3 341.3 512 328 512H24C10.75 512 0 501.3 0 488C0 474.7 10.75 464 24 464H32V64C32 28.65 60.65 0 96 0zM256 48H96C87.16 48 80 55.16 80 64V192H272V64C272 55.16 264.8 48 256 48zM272 240H80V464H272V240z" }) })) }))) : null }))] }));
};
export const KujiUnconnected = () => (_jsx("svg", Object.assign({ viewBox: "0 0 512 512", xmlns: "http://www.w3.org/2000/svg" }, { children: _jsxs("g", Object.assign({ fill: "#607d8b", fillRule: "evenodd" }, { children: [_jsx("path", { d: "M256 0c141.385 0 256 114.615 256 256S397.385 512 256 512 0 397.385 0 256 114.615 0 256 0Zm0 44C138.916 44 44 138.916 44 256s94.916 212 212 212 212-94.916 212-212S373.084 44 256 44Z", fillRule: "nonzero" }), _jsx("path", { d: "M281.047 101c40.52 0 77.576 14.83 106.036 39.36l-.963 2.305.595.44.385.29.648.498.44.352.169.14.329.28.313.277c1.322 1.2 2.18 2.374 2.18 3.66 0 60.494-38.122 76.974-80.455 91.04l-2.623.867-1.316.432-4.122 1.347-4.135 1.348-2.302.753-2.285.752-2.341.776-2.34.784-1.56.528-1.556.532-.778.268-1.554.54c-.259.09-.517.18-.776.272l-1.55.548-1.546.554-1.543.562c-15.156 5.553-29.754 12.145-42.233 21.69-62.374 47.708-37.968 94.897-13.43 107.068l-.03.172c1.731-10.218 4.563-17.734 8.497-22.547l.215-.261.443-.527c.15-.177.303-.354.459-.532l.473-.536c.16-.18.323-.359.488-.539l.5-.541c.17-.181.34-.362.514-.543l.524-.544.266-.272.54-.543.273-.271.553-.542.561-.539c.188-.179.378-.357.568-.535l.574-.532.579-.527.583-.522.293-.258.588-.512.295-.253.591-.5.592-.492.591-.482.296-.238.59-.466.293-.229.586-.449.582-.436c.194-.144.386-.285.578-.423l.572-.409.566-.394.28-.19.555-.37c3.854-2.53 7.08-3.813 8.315-2.631 1.077 1.031 1.058 2.43.59 4.169l-.1.352-.11.362-.12.37-.127.38-.278.785-.605 1.676-.156.441-.23.677-.291.89-.266.84-.103.344-.152.522-.097.353-.094.359-.09.363-.086.368-.081.373-.076.379-.069.385-.063.39c-.02.132-.038.264-.056.397l-.048.404c-.364 3.323.071 7.322 2.553 12.583l.533 1.114.366.78.179.385.348.763.17.378.33.747.16.37.312.73c.102.242.202.481.3.72l.288.709.276.698c.09.23.178.46.264.687l.252.677.121.334.234.66.113.327.215.644.104.318.197.627c.064.208.126.414.186.618l.174.606.161.595.15.585c.263 1.062.466 2.069.608 3.022l.07.514c.044.34.08.671.108.996l.035.482c.146 2.382-.16 4.358-.916 5.929 13.237-1.96 24.46 1.282 33.667 9.724l.303.28c5.003 4.672 10.095 6.873 14.258 8.323l.686.235.993.33 1.849.602.572.19.548.188c4.373 1.527 6.242 2.989 3.041 8.718a.225.225 0 0 1-.03.041l-.047.044-.064.048-.08.052-.153.082-.19.09-.227.095-.173.067-.188.07-.314.108-.35.112-.387.117-.278.08-.447.122-.483.125-.518.127-.555.13-.59.13-.624.13-.66.132-.695.13-.73.13-.763.13-.528.084-.544.084-.558.083-.574.082-.588.08-.911.117-.944.114-.978.109-.67.07-.685.068-.699.065A164.089 164.089 0 0 1 281.047 426c-89.746 0-162.5-72.754-162.5-162.5 0-17.075 2.634-33.535 7.517-48.995-4.679.182-9.288.933-13.615 1.888l-.993.223-.493.114-.977.233-.965.237-.479.12-.947.243-.934.245-.92.246-.907.246-1.332.367-4.57 1.279-1.15.315-.744.198-.723.189-.702.177-.68.165-.52.12-.506.112-.49.102-.478.093-.462.083c-2.425.414-4.21.376-5.162-.445-4.919-4.24 1.744-45.007 58.685-47.966a163.367 163.367 0 0 1 26.42-30.448c-10.044-3.434-18.982-3.104-25.986-2.328l-.922.105-.452.055-.887.11-.863.111-2.441.322-.763.097-.736.09c-.12.014-.24.028-.358.04l-.697.075c-3.982.4-6.572.177-7.379-2.234-7.129-21.293 44.225-37.7 90.865-26.945 18.356-7.191 38.34-11.139 59.246-11.139Z" })] })) })));
/* export const KujiConnected = () => (
  <svg
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    className="completed">
    <path
      d="M256 0c141.385 0 256 114.615 256 256S397.385 512 256 512 0 397.385 0 256 114.615 0 256 0Zm25.047 101.297c-20.906 0-40.89 3.948-59.246 11.138-46.64-10.755-97.994 5.653-90.865 26.946.637 1.903 2.385 2.443 5.053 2.39l.546-.02c.093-.003.187-.008.282-.014l.581-.04.606-.052.311-.03 1.055-.115.736-.09.763-.097 3.304-.433 1.34-.165.921-.105.905-.097.925-.09.946-.082c.477-.039.962-.074 1.455-.105l.994-.055c6.023-.295 13.068.126 20.761 2.757A163.367 163.367 0 0 0 146 173.386c-56.941 2.959-63.604 43.725-58.685 47.966.91.785 2.583.854 4.85.496l.312-.051.462-.083.477-.093.491-.102.506-.112.52-.12.68-.165.702-.177.723-.189.743-.198 1.152-.315 4.569-1.279 1.332-.367.906-.247.92-.245.935-.245 1.426-.363.965-.237.977-.233.493-.114.993-.224c4.327-.954 8.936-1.705 13.615-1.887-4.883 15.46-7.517 31.92-7.517 48.995 0 89.746 72.754 162.5 162.5 162.5 6.03 0 11.983-.329 17.842-.969l1.463-.166.7-.066.684-.067.67-.07.978-.11.944-.113.91-.117.59-.08.573-.082.558-.083 1.072-.169.764-.129.729-.13.695-.13.66-.132.625-.13.59-.13.554-.13.518-.127.483-.125.447-.122.278-.08.387-.117.35-.112.314-.109.188-.069.173-.067.227-.095.19-.09.152-.083.081-.05.064-.049.047-.044.03-.04c2.633-4.714 1.836-6.539-.964-7.888l-.339-.157a14.542 14.542 0 0 0-.176-.077l-.365-.152-.383-.149-.399-.148-.415-.148-.548-.188-.572-.19-1.85-.602-.992-.33-.686-.235-.767-.273c-3.883-1.406-8.484-3.52-13.036-7.632l-.758-.698c-9.208-8.442-20.43-11.684-33.667-9.724.71-1.473 1.022-3.302.938-5.487l-.022-.442-.035-.482-.048-.493-.06-.503-.07-.514a31.263 31.263 0 0 0-.457-2.392l-.151-.63-.15-.585-.161-.595-.174-.607-.186-.617-.3-.946-.216-.644-.113-.326-.294-.827-.313-.844-.264-.687-.276-.698-.288-.71-.3-.72-.472-1.1-.415-.935-.612-1.338-.366-.779-.533-1.114c-2.407-5.102-2.89-9.017-2.584-12.28l.03-.303.05-.404.055-.397.063-.39.07-.385.075-.38.08-.373.086-.368.09-.363.095-.358.097-.353.152-.522.103-.343.266-.842.29-.889.231-.677.156-.44.605-1.677.278-.786.128-.38.12-.37.11-.36.099-.353c.468-1.74.487-3.138-.59-4.17-.844-.806-2.616-.464-4.882.64l-.493.248c-.167.087-.336.177-.507.27l-.521.293-.533.313c-.09.054-.18.108-.27.164l-.55.342-.278.179-.281.182-.835.561-.566.394-.572.409-.578.423-.582.436-.586.449-.294.229-.885.704-.591.482-.592.491-.738.627-1.029.897-.583.521-.58.528-.858.799-.844.807-.826.813-.806.815-.524.544-.513.543-.501.541-.488.539-.473.536-.46.532-.442.527-.215.261c-3.846 4.706-6.64 11.996-8.38 21.87l-.088.503-.735-.374c-24.036-12.61-47.114-58.52 12.321-105.261l1.845-1.431c12.196-9.328 26.414-15.836 41.2-21.31l1.033-.38 1.543-.562 1.547-.554 1.55-.548 2.718-.946 1.946-.666 1.558-.528 2.34-.784 2.342-.776 4.587-1.505 9.573-3.127 2.623-.867 1.269-.423 2.529-.85c40.788-13.821 76.657-31.088 76.657-89.767 0-1.215-.765-2.33-1.964-3.46l-.216-.2-.313-.278-.329-.279-.17-.14-.44-.352-.647-.499-.385-.289-.595-.44.963-2.306c-28.46-24.529-65.516-39.36-106.036-39.36Z"
      fill="#60fbd0"
      fillRule="nonzero"
    />
  </svg>
); */
export const KujiConnected = () => (_jsxs("svg", Object.assign({ viewBox: "0 0 81 80", xmlns: "http://www.w3.org/2000/svg", className: "completed" }, { children: [_jsx("defs", { children: _jsx("clipPath", Object.assign({ id: "a" }, { children: _jsx("path", { d: "M40 0c22.091 0 40 17.909 40 40S62.091 80 40 80 0 62.091 0 40 17.909 0 40 0Zm22.764 29.148H40.681V45.2h9.083v15.148c0 1.413-.567 2.148-1.703 2.148-1.306 0-2.668-.113-4.03-.283L44.825 66h4.599c2.838 0 4.314-1.583 4.314-4.691V45.2h9.026V29.148Zm-45.926 24.36c-.283 4.07-1.078 7.688-2.327 10.853l3.122.96c1.192-3.334 1.93-7.121 2.27-11.417l-3.065-.395Zm7.721.17-2.725.34c.284 2.486.454 6.047.568 10.625l2.952-.339c-.114-4.465-.398-8.026-.795-10.626Zm17.825-4.748c-1.76 5.087-3.86 9.496-6.244 13.227l3.065 2.204c2.498-3.9 4.655-8.535 6.472-13.848l-3.293-1.583Zm-12.83 4.353-2.838.339c.908 2.374 1.476 5.765 1.76 10.174l2.952-.34c-.34-4.295-.965-7.686-1.873-10.173Zm29.918-4.579-3.01 1.809c2.726 4.691 4.94 8.987 6.53 12.887L66 61.309c-1.533-3.618-3.69-7.8-6.528-12.605Zm-24.695 4.013-2.668.792a67.812 67.812 0 0 1 2.384 7.008l2.782-.678c-.795-2.713-1.59-5.087-2.498-7.122Zm-12.83-38.604c-1.702 5.54-4.37 10.004-7.947 13.452l.852 4.013c.738-.678 1.476-1.356 2.157-2.091v21.874h18.677V27.904h-5.734c1.192-1.752 2.384-3.9 3.576-6.5v-2.713h-9.366c.51-1.13.965-2.26 1.419-3.448l-3.633-1.13Zm10.219 27.13v6.727h-4.144v-6.727h4.144Zm-7.437 0v6.727h-4.2v-6.727h4.2Zm34.175-8.478v8.874H44.54v-8.874h14.363ZM24.729 31.24v6.726h-4.2V31.24h4.2Zm7.437 0v6.726h-4.144V31.24h4.144Zm-2.441-9.326c-1.249 2.26-2.441 4.296-3.69 5.991h-7.607a46.652 46.652 0 0 0 4.144-5.991h7.153ZM51.92 14l-3.917.678a66.216 66.216 0 0 1 1.987 5.709H37.672v3.674H65.49v-3.674H53.852c-.625-2.374-1.25-4.465-1.93-6.387Z" }) })) }), _jsx("g", Object.assign({ clipPath: "url(#a)", transform: "translate(.669)" }, { children: _jsx("path", { fill: "#60fbd0", d: "M0 0h80v80H0V0z" }) }))] })));
export const Network = ({ onClick }) => (_jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512", className: "wallet__network", onClick: onClick }, { children: _jsx("path", { fill: "currentColor", d: "M373.3 361.2C398.7 374.6 416 401.3 416 432C416 476.2 380.2 512 336 512C291.8 512 255.1 476.2 255.1 432C255.1 420.5 258.4 409.6 262.7 399.8L121.6 276.3C109.5 283.7 95.25 288 80 288C35.82 288 0 252.2 0 208C0 163.8 35.82 128 80 128C104.1 128 127.3 139.4 141.9 157.4L320.2 86.06C320.1 84.06 320 82.04 320 80C320 35.82 355.8 0 400 0C444.2 0 480 35.82 480 80C480 120.8 449.4 154.5 409.1 159.4L373.3 361.2zM400 48C382.3 48 368 62.33 368 80C368 97.67 382.3 112 400 112C417.7 112 432 97.67 432 80C432 62.33 417.7 48 400 48zM159.8 201.9C159.9 203.9 159.1 205.1 159.1 208C159.1 219.5 157.6 230.4 153.3 240.2L294.4 363.7C303.8 357.9 314.5 354 326 352.6L362.7 150.8C353.2 145.8 344.8 138.9 338.1 130.6L159.8 201.9zM336 400C318.3 400 304 414.3 304 432C304 449.7 318.3 464 336 464C353.7 464 368 449.7 368 432C368 414.3 353.7 400 336 400zM79.1 240C97.67 240 111.1 225.7 111.1 208C111.1 190.3 97.67 176 79.1 176C62.33 176 47.1 190.3 47.1 208C47.1 225.7 62.33 240 79.1 240z" }) })));
