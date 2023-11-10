import { useNetwork } from "../providers/network";

export const RPCWarning = () => {
  const [{ rpcs, rpc }] = useNetwork();
  const connected = rpcs.find((a) => a.endpoint === rpc);

  if (!connected) return null;
  const { latestBlockTime, connectedTime } = connected;
  const diff = connectedTime.getTime() - latestBlockTime.getTime();

  if (diff < 15000) return;
  return (
    <div className="rpc-warning">
      <svg
        height="1em"
        className="block mr-q1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512">
        <path
          fill="currentColor"
          d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"
        />
      </svg>
      Selected RPC lagging by {(diff / 1000).toFixed(0)} seconds.{" "}
      <a
        onClick={() => {
          window.scrollTo(0, document.body.scrollHeight);
          let element: HTMLElement = document.querySelectorAll(
            ".footer .rpc .select"
          )[1] as HTMLElement;
          element.click();
        }}>
        Change RPC in the footer.
      </a>
    </div>
  );
};
