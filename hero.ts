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
        background: "#DEDED1", // bg
        foreground: "#C00707", // accent
        content1: "#E9B63B", // CARD 1
        content2: "#00F7FF", // CARD 2
        content3: "#00F7FF", // sin ocupar
        content4: "#00F7FF", // sin ocupar
        divider: "#00F7FF", // sin ocupar
        focus: "#DEDED1", // focus click
        primary: {
          DEFAULT: "#C00707", // accent
          foreground: "#FBF3D1", // inside accent
        },
      },
    },
    dark: {
      colors: {
        background: "#0F0F0F", // bg
        foreground: "#C00707", // accent
        content1: "#0f172a", // CARD 1
        content2: "#1e293b", // CARD 2
        content3: "#334155", // sin ocupar
        content4: "#475569", // sin ocupar
        divider: "#334155", // sin ocupar
        focus: "#38bdf8", // focus click
        primary: {
          DEFAULT: "#C00707", // accent
          foreground: "#FBF3D1", // inside accent
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
