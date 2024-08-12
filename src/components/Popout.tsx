import clsx from "clsx";
import { GradientButton } from "kujira-core/src/components";
import { AngleLeft, Ellipsis } from "kujira.ui/src/icons/Icons";
import { FC, useEffect, useRef, useState } from "react";

function getParentOffset(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const p = el.closest(".relative")?.getBoundingClientRect();
  return {
    left: rect.left - (p?.left || 0),
    top: rect.top - (p?.top || 0),
    right: (p?.right || 0) - rect.right,
    bottom: (p?.bottom || 0) - rect.bottom,
  };
}

export const Popout: FC<{
  children?: React.ReactNode;
  className?: string;
  buttonClassName?: string;
}> = ({ children, className, buttonClassName }) => {
  const [open, setOpen] = useState(false);
  const node = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      const nav = node.current?.querySelector("nav");
      if (node.current && nav) {
        const p = getParentOffset(node?.current);
        nav.style.bottom = p.bottom + "px";
        nav.style.right =
          p.right + node.current.offsetWidth + 4 + "px";
      }
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleClickOutside = (e: any) => {
    const ref = node.current;
    if (ref) {
      if (ref.contains(e.target)) {
        return;
      }
    }
    e.stopPropagation();
    e.stopImmediatePropagation();
    setOpen(false);
    return false;
  };

  return (
    <div
      ref={node}
      className={clsx({
        popout: true,
        "popout--open": open,
        [`${className}`]: className,
      })}>
      <GradientButton
        onClick={() => setOpen(true)}
        className={clsx({
          "md-button--grey md-button--small": !buttonClassName,
          [`${buttonClassName}`]: buttonClassName,
        })}>
        {!open ? <Ellipsis /> : <AngleLeft />}
      </GradientButton>
      {children}
    </div>
  );
};
