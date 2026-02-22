"use client";

import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AuthProvider } from "@/context/Auth";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      storageKey="ecommerce-ui-theme"
      themes={["light", "dark", "ocean"]}
      disableTransitionOnChange
    >
      <AuthProvider>
        <HeroUIProvider>{children}</HeroUIProvider>
      </AuthProvider>
    </NextThemesProvider>
  );
}
