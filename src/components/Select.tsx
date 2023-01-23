import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { IconArrow } from "../icons/IconArrow";

type OptionType<T> = {
  label: string;
  value: T;
  status?: string;
};

export type SelectProps<T> = {
  options: OptionType<T>[];
  selected: OptionType<T>;
  onChange?: (e: any) => void;
  dark?: boolean;
  className?: string;
  allowCustomInput?: boolean;
  onCustomChange?: (e: any) => void;
};

export function Select<T>({
  options,
  selected,
  onChange,
  dark = false,
  className,
  allowCustomInput,
  onCustomChange,
}: SelectProps<T>) {
  const node = useRef<HTMLDivElement>(null);
  const drop = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [top, setTop] = useState(false);
  const [custom, setCustom] = useState("");

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      const ref = drop.current;
      if (ref) {
        const box = ref.getBoundingClientRect();
        if (
          box.bottom >
          (window.innerHeight ||
            document.documentElement.clientHeight)
        ) {
          setTop(true);
        }
      }
    } else {
      if (custom !== "") {
      }
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    const ref = node.current;
    if (ref) {
      const box = ref.getBoundingClientRect();
      if (
        box.bottom >
        (window.innerHeight ||
          document.documentElement.clientHeight) -
          100
      ) {
        setTop(true);
      }
    }
  }, []);

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

  const handleChange = (e: T) => {
    setCustom("");
    if (onChange) onChange(e);
  };

  return (
    <div
      ref={node}
      className={clsx({
        select: true,
        "select--dark": dark,
        "select--open": open,
        "select--top": top,
        [`${className}`]: className,
      })}
      onClick={() => setOpen(!open)}>
      {open && allowCustomInput ? (
        <input
          autoFocus
          type="text"
          value={custom}
          onChange={(e) => setCustom(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && onCustomChange) {
              onCustomChange(custom);
              setOpen(false);
            }
          }}
        />
      ) : (
        <>
          {selected.status && <b className={selected.status} />}
          {selected.label}
        </>
      )}
      <div className="select__space" />
      <IconArrow />
      {open && (
        <ul ref={drop}>
          {options.map((m) => (
            <li
              onClick={() => handleChange(m.value)}
              key={m.label}
              className={m.value === selected.value ? "current" : ""}>
              {m.status && <b className={m.status} />}
              {m.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
