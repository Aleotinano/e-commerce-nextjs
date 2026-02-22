"use client";

import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";

export const Nav = () => {
  return (
    <nav className="sticky top-0 z-20 border-b border-divider bg-content1/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <p className="text-lg font-semibold">E-commerce</p>
        <ThemeSwitcher />
      </div>
    </nav>
  );
};
