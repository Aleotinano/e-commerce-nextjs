"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { Sun, Moon } from "lucide-react";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-10 w-10" />;

  const isDark = theme === "dark";

  return (
    <Button
      variant="light"
      isIconOnly
      className="h-10 w-10 text-default-600 hover:text-default-900"
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      onPress={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? (
        <Moon size={16} strokeWidth={1.8} />
      ) : (
        <Sun size={16} strokeWidth={1.8} />
      )}
    </Button>
  );
};
