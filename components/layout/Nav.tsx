"use client";

import dynamic from "next/dynamic";
import { useCart } from "@/context/useCart";

const ThemeSwitcher = dynamic(
  () =>
    import("@/components/theme/ThemeSwitcher").then(
      (mod) => mod.ThemeSwitcher
    ),
  { ssr: false }
);

export const Nav = () => {
  const { cartCount, isCartOpen, toggleCart } = useCart();

  return (
    <nav className="sticky top-0 z-30 border-b border-divider bg-content1/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <p className="text-lg font-semibold">E-commerce</p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-controls="cart-drawer"
            aria-expanded={isCartOpen}
            aria-label={isCartOpen ? "Cerrar carrito" : "Abrir carrito"}
            className="relative inline-flex h-11 items-center gap-2 rounded-small border border-divider bg-content1 px-3 text-sm font-medium transition-colors hover:bg-content2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            onClick={toggleCart}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4h2l2 10h10l2-7H7m2 11a1 1 0 1 0 0.001 0M17 18a1 1 0 1 0 0.001 0"
              />
            </svg>
            <span className="hidden sm:inline">Carrito</span>

            {cartCount > 0 ? (
              <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-amber-500 px-1 text-xs font-semibold text-black">
                {cartCount}
              </span>
            ) : null}
          </button>

          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
};
