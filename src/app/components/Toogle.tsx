import React, { useEffect, useState } from "react";
import {
  Switch,
  useSwitch,
  VisuallyHidden,
  SwitchProps,
} from "@nextui-org/react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";

const ThemeSwitch = (props: SwitchProps) => {
  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
    isPressed,
  } = useSwitch(props);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isPressed) {
      setTheme(theme === "light" ? "dark" : "light");
    }
  }, [isPressed]);

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-2">
      <Component {...getBaseProps()}>
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>
        <div
          {...getWrapperProps()}
          className={slots.wrapper({
            class: [
              "w-8 h-8",
              "flex items-center justify-center",
              "rounded-lg bg-transparent text-white border dark:bg-transparent",
            ],
          })}
        >
          {theme === "light" ? (
            <SunIcon className="text-yellow-400 dark:bg-transparent  bg-transparent" />
          ) : (
            <MoonIcon />
          )}
        </div>
      </Component>
    </div>
  );
};

export default function Toogle() {
  return <ThemeSwitch />;
}
