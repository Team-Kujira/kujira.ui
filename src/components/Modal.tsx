import clsx from "clsx";
import { FC, PropsWithChildren } from "react";
import ReactDOM from "react-dom";
import { IconClose } from "../icons/IconClose";

export type ModalProps = PropsWithChildren<{
  show: boolean;
  close: () => void;
  title?: string;
  confirm?: () => void;
  large?: boolean;
  backgroundClose?: boolean;
  className?: string;
}>;

export const Modal: FC<ModalProps> = ({
  show,
  close,
  title,
  confirm,
  large,
  backgroundClose = true,
  className,
  children,
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
                      className="md-button md-button--grey"
                      onClick={close}>
                      Cancel
                    </button>
                    <button
                      className="md-button ml-1"
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
