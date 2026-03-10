"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { useTheme } from "next-themes";
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";
import { useCart } from "@/context/useCart";
import { useAuth } from "@/context/useAuth";
import { store } from "@/config.store";

const ThemeSwitcher = dynamic(
  () =>
    import("@/components/theme/ThemeSwitcher").then((mod) => mod.ThemeSwitcher),
  { ssr: false }
);

function getInitials(value?: string) {
  const source = value?.trim();
  if (!source) return "U";
  return source
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

const CartIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className={className}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 4h2l2 10h10l2-7H7m2 11a1 1 0 1 0 0.001 0M17 18a1 1 0 1 0 0.001 0"
    />
  </svg>
);

export const Nav = () => {
  const { cartCount, isCartOpen, toggleCart } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const { resolvedTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const logoSrc =
    resolvedTheme === "light" && store.logo_black
      ? store.logo_black
      : store.logo;

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <Navbar
        maxWidth="full"
        className="sticky top-0 z-30 backdrop-blur-md"
        height="64px"
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4">
          {/* Brand */}
          <NavbarBrand>
            <Link
              href="/"
              className="flex items-center gap-2 text-base font-semibold tracking-tight font-mono transition-opacity hover:opacity-75"
              onClick={closeMobileMenu}
            >
              <img src={logoSrc} alt="Logo" className="h-5 w-5" />
              <span className="text-lg font-semibold tracking-tight ">
                {store.name}
              </span>
            </Link>
          </NavbarBrand>

          {/* Desktop actions */}
          <NavbarContent justify="end" className="hidden sm:flex gap-2">
            {/* Cart */}
            <NavbarItem>
              <Button
                variant="light"
                className="size-10 min-w-fit items-center gap-2 text-medium"
                aria-controls="cart-drawer"
                aria-expanded={isCartOpen}
                aria-label={isCartOpen ? "Cerrar carrito" : "Abrir carrito"}
                onPress={toggleCart}
                startContent={<CartIcon className="size-4 shrink-0" />}
              >
                {cartCount > 0 && (
                  <Badge content={cartCount} color="primary" size="sm">
                    <span className="sr-only">
                      {cartCount} items en carrito
                    </span>
                  </Badge>
                )}
              </Button>
            </NavbarItem>

            {/* Theme */}
            <NavbarItem>
              <ThemeSwitcher />
            </NavbarItem>

            {/* Auth */}
            {!isAuthenticated ? (
              <>
                <NavbarItem>
                  <Button
                    as={Link}
                    href="/login"
                    variant="light"
                    size="sm"
                    className="h-10 px-4 text-sm font-medium"
                  >
                    Iniciar sesión
                  </Button>
                </NavbarItem>
                <NavbarItem>
                  <Button
                    as={Link}
                    href="/register"
                    color="primary"
                    variant="solid"
                    size="sm"
                    className="h-10 px-4 text-sm font-medium"
                  >
                    Registrarse
                  </Button>
                </NavbarItem>
              </>
            ) : (
              <NavbarItem>
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <Button
                      variant="bordered"
                      size="sm"
                      className="h-10 min-w-10 gap-2 px-2 sm:px-3"
                    >
                      <Avatar
                        name={user?.username ?? "User"}
                        size="sm"
                        showFallback
                        classNames={{ base: "w-6 h-6 text-tiny shrink-0" }}
                        getInitials={() => getInitials(user?.username)}
                      />
                      <span className="hidden text-sm font-medium sm:inline">
                        {user?.username ?? "Usuario"}
                      </span>
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="User actions">
                    <DropdownItem
                      key="profile"
                      isReadOnly
                      className="opacity-60 text-xs cursor-default"
                    >
                      {user?.email ?? "Sin email"}
                    </DropdownItem>
                    <DropdownItem
                      key="logout"
                      color="danger"
                      className="text-sm font-medium"
                      onPress={logout}
                    >
                      Cerrar sesión
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavbarItem>
            )}
          </NavbarContent>

          {/* Mobile: cart + burger */}
          <div className="flex items-center gap-1 sm:hidden">
            {/* Cart icon mobile */}
            <Button
              variant="light"
              isIconOnly
              className="relative h-10 w-10"
              aria-controls="cart-drawer"
              aria-expanded={isCartOpen}
              aria-label={isCartOpen ? "Cerrar carrito" : "Abrir carrito"}
              onPress={toggleCart}
            >
              {cartCount > 0 ? (
                <Badge content={cartCount} color="primary" size="sm">
                  <CartIcon className="h-5 w-5" />
                </Badge>
              ) : (
                <CartIcon className="h-5 w-5" />
              )}
            </Button>

            {/* Theme switcher mobile */}
            <ThemeSwitcher />

            {/* Burger */}
            <Button
              variant="light"
              isIconOnly
              className="h-10 w-10"
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileMenuOpen}
              onPress={() => setMobileMenuOpen((prev) => !prev)}
            >
              <span className="sr-only">
                {mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              </span>
              {/* Animated burger → X */}
              <span className="flex h-5 w-5 flex-col items-center justify-center gap-[5px]">
                <span
                  className={`block h-[1.5px] w-5 rounded-full bg-current transition-all duration-200 ${
                    mobileMenuOpen ? "translate-y-[6.5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-[1.5px] w-5 rounded-full bg-current transition-all duration-200 ${
                    mobileMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-[1.5px] w-5 rounded-full bg-current transition-all duration-200 ${
                    mobileMenuOpen ? "-translate-y-[6.5px] -rotate-45" : ""
                  }`}
                />
              </span>
            </Button>
          </div>
        </div>
      </Navbar>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-20 sm:hidden transition-all duration-200 ${
          mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-200 ${
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMobileMenu}
          aria-hidden="true"
        />

        {/* Panel */}
        <nav
          className={`absolute right-0 top-16 h-[calc(100vh-64px)] w-72 border-l border-divider bg-content1 shadow-xl transition-transform duration-200 ease-out flex flex-col ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          aria-label="Menú de navegación"
        >
          <div className="flex flex-col gap-1 p-4 flex-1">
            {isAuthenticated && (
              <div className="flex items-center gap-3 rounded-xl border border-divider px-3 py-3 mb-2 bg-content2/60">
                <Avatar
                  name={user?.username ?? "User"}
                  size="sm"
                  showFallback
                  getInitials={() => getInitials(user?.username)}
                />
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">
                    {user?.username ?? "Usuario"}
                  </p>
                  <p className="text-xs text-default-400 truncate">
                    {user?.email ?? "Sin email"}
                  </p>
                </div>
              </div>
            )}

            {!isAuthenticated ? (
              <div className="flex flex-col gap-2 mt-2">
                <Button
                  as={Link}
                  href="/login"
                  variant="bordered"
                  className="h-11 w-full text-sm font-medium"
                  onPress={closeMobileMenu}
                >
                  Iniciar sesión
                </Button>
                <Button
                  as={Link}
                  href="/register"
                  color="primary"
                  variant="solid"
                  className="h-11 w-full text-sm font-medium"
                  onPress={closeMobileMenu}
                >
                  Registrarse
                </Button>
              </div>
            ) : (
              <Button
                variant="flat"
                color="danger"
                className="mt-2 h-11 w-full justify-start text-sm font-medium"
                onPress={() => {
                  logout();
                  closeMobileMenu();
                }}
              >
                Cerrar sesión
              </Button>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};
