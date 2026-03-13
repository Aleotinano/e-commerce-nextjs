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
        background: "#F0F0E8",
        foreground: "#C00707",
        content1: "#E8E8DC",
        content2: "#F5F5F0",
        content3: "#0F0F0F",
        content4: "#1A1A1A",
        divider: "#666", // libre
        focus: "#C00707",
        primary: {
          DEFAULT: "#C00707",
          foreground: "#FFFFFF",
        },
      },
    },
    dark: {
      colors: {
        background: "#0F0F0F",
        foreground: "#C00707",
        content1: "#1A1A1A",
        content2: "#242424",
        content3: "#DEDED1",
        content4: "#DEDED1",
        divider: "#DEDED1",
        focus: "#38bdf8",
        primary: {
          DEFAULT: "#C00707",
          foreground: "#FBF3D1",
        },
      },
    },
  },
});
