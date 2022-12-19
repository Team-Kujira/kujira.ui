import clsx from "clsx";
import ReactDOM from "react-dom";
import { IconClose } from "../icons/IconClose";

export const Modal = ({
  show,
  close,
  title,
  children,
  confirm,
  large,
  backgroundClose = true,
  className,
}: {
  show: boolean;
  close: () => void;
  title?: string;
  children: React.ReactChild;
  confirm?: () => void;
  large?: boolean;
  backgroundClose?: boolean;
  className?: string;
}) => {
  const dest = document.getElementById("modal")!;

  return dest
    ? ReactDOM.createPortal(
        <>
          {show ? (
            <div
              className={clsx({
                modal: true,
                "modal--large": large,
                [`${className}`]: className,
              })}
              onClick={() => (backgroundClose ? close() : null)}>
              <div
                className="modal__window"
                onClick={(e) => {
                  e.stopPropagation();
                }}>
                {title && (
                  <div className="modal__header">
                    <h2>{title}</h2>
                    {!confirm && <IconClose onClick={close} />}
                  </div>
                )}
                {children}
                {confirm && (
                  <div className="modal__footer text-right mt-4">
                    <button
                      className="button--outline-blue"
                      onClick={close}>
                      Cancel
                    </button>
                    <button
                      className="button--gradient ml-1"
                      onClick={confirm}>
                      Confirm
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </>,
        dest
      )
    : null;
};
