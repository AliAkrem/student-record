"use client";
import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
  rem,
} from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import cx from "clsx";
import classes from "./colorSchemeButton.module.css";

export function ColorSchemeButton() {


  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <ActionIcon
      onClick={() =>
        setColorScheme(computedColorScheme === "light" ? "dark" : "light")
      }
      variant="light"
      size="30"
      aria-label="Toggle color scheme"
    >
      <IconSun   color="yellow" className={cx(classes.icon, classes.light)} stroke={1.5} />
      <IconMoon    className={cx(classes.icon, classes.dark)} stroke={1.5} />
    </ActionIcon>
  );
}
