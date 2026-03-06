"use client";

import { useTheme } from "next-themes";
import { Button, ButtonGroup } from "@heroui/react";

const themeOptions = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
  { id: "ocean", label: "Ocean" },
] as const;

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const activeTheme = theme ?? "light";

  return (
    <ButtonGroup aria-label="Theme options" size="sm" variant="flat">
      {themeOptions.map((option) => (
        <Button
          key={option.id}
          className="capitalize"
          color={activeTheme === option.id ? "primary" : "default"}
          onPress={() => setTheme(option.id)}
        >
          {option.label}
        </Button>
      ))}
    </ButtonGroup>
  );
};
