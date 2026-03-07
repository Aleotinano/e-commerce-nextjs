import { heroui } from "@heroui/react";

export default heroui({
  addCommonColors: true,
  themes: {
    light: {
      layout: {
        radius: {
          small: "6px",
          medium: "10px",
          large: "14px",
        },
      },
      colors: {
        background: "#f8fafc",
        foreground: "#0f172a",
        content1: "#ffffff",
        content2: "#f1f5f9",
        content3: "#e2e8f0",
        content4: "#cbd5e1",
        divider: "#cbd5e1",
        focus: "#0ea5e9",
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          DEFAULT: "#0284c7",
          foreground: "#ffffff",
        },
      },
    },
    dark: {
      colors: {
        background: "#666",
        foreground: "#e2e8f0",
        content1: "#0f172a",
        content2: "#1e293b",
        content3: "#334155",
        content4: "#475569",
        divider: "#334155",
        focus: "#38bdf8",
        primary: {
          DEFAULT: "#38bdf8",
          foreground: "#082f49",
        },
      },
    },
    // ocean: {
    //   extend: "light",
    //   colors: {
    //     background: "#f0f9ff",
    //     foreground: "#082f49",
    //     content1: "#e0f2fe",
    //     content2: "#bae6fd",
    //     primary: {
    //       DEFAULT: "#0369a1",
    //       foreground: "#e0f2fe",
    //     },
    //   },
    // },
  },
});
