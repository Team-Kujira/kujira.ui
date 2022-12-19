import { useEffect, useRef, useState } from "react";
//import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { IconArrow } from "../icons/IconArrow";

type OptionType<T> = {
  label: string;
  value: T;
};

export type SelectProps<T> = {
  options: OptionType<T>[];
  selected: OptionType<T>;
  onChange?: (e: any) => void;
  dark?: boolean;
  className?: string;
};

export function Select<T>({
  options,
  selected,
  onChange,
  dark = false,
  className,
}: SelectProps<T>) {
  const node = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
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

  const handleChange = (e: T) => {
    if (onChange) onChange(e);
  };

  return (
    <div
      ref={node}
      className={clsx({
        select: true,
        //"ml-1": true,
        "select--dark": dark,
        "select--open": open,
        [`${className}`]: className,
      })}
      onClick={() => setOpen(!open)}>
      {selected.label}
      <IconArrow />
      {/* <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ scale: 0, y: -20, opacity: 0 }}
            animate={{
              scale: 1,
              y: 0,
              opacity: 1,
              transition: { duration: 0.1 },
            }}
            exit={{
              scale: 0,
              y: -20,
              opacity: 0,
              transition: { duration: 0.1 },
            }}>
            {options.map((m) => (
              <li
                onClick={() => handleChange(m.value)}
                key={m.label}
                className={m === selected ? "current" : ""}>
                {m.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence> */}

      {open && (
        <ul>
          {options.map((m) => (
            <li
              onClick={() => handleChange(m.value)}
              key={m.label}
              className={m === selected ? "current" : ""}>
              {m.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
