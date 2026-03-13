"use client";

import Link from "next/link";
import { Navbar, NavbarBrand } from "@heroui/react";
import { useCart } from "@/context/useCart";
import { useAuth } from "@/context/useAuth";
import { store } from "@/config.store";
import { NavActions } from "@/components/nav/NavActions";

export const Nav = () => {
  const { cartCount, isCartOpen, toggleCart } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  const sharedProps = {
    cartCount,
    isCartOpen,
    toggleCart,
    isAuthenticated,
    user,
    logout,
  };

  return (
    <Navbar maxWidth="full" className="sticky top-0 z-30 " height="64px">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4">
        <NavbarBrand>
          <Link
            href="/"
            className="flex items-center gap-2 font-mono transition-opacity hover:opacity-75"
          >
            <img src={store.logo} alt="Logo" className="h-5 w-5" />
            <span className="text-lg font-semibold tracking-tight">
              {store.name}
            </span>
          </Link>
        </NavbarBrand>
        <NavActions {...sharedProps} />
        <NavActions {...sharedProps} compact />
      </div>
    </Navbar>
  );
};
