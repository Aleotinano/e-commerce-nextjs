"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
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

export const Nav = () => {
  const { cartCount, isCartOpen, toggleCart } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <Navbar
      maxWidth="full"
      className="sticky top-0 z-30 border-b border-divider bg-content1/80 backdrop-blur-md"
      height="64px"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4">
        <NavbarBrand>
          <Link href="/" className="text-lg font-semibold">
            E-commerce
          </Link>
        </NavbarBrand>

        <NavbarContent justify="end" className="gap-2">
          <NavbarItem>
            <Button
              variant="bordered"
              isIconOnly
              className="relative min-h-11 min-w-11 sm:hidden"
              aria-controls="cart-drawer"
              aria-expanded={isCartOpen}
              aria-label={isCartOpen ? "Cerrar carrito" : "Abrir carrito"}
              onPress={toggleCart}
            >
              {cartCount > 0 ? (
                <Badge content={cartCount} color="primary" size="sm">
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
                </Badge>
              ) : (
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
              )}
            </Button>

            <Button
              variant="bordered"
              className="hidden min-h-11 items-center gap-2 sm:inline-flex"
              aria-controls="cart-drawer"
              aria-expanded={isCartOpen}
              aria-label={isCartOpen ? "Cerrar carrito" : "Abrir carrito"}
              onPress={toggleCart}
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
              <span>Carrito</span>
              {cartCount > 0 ? (
                <Badge content={cartCount} color="primary" size="sm">
                  <span className="sr-only">Items en carrito</span>
                </Badge>
              ) : null}
            </Button>
          </NavbarItem>

          <NavbarItem>
            <ThemeSwitcher />
          </NavbarItem>

          {!isAuthenticated ? (
            <>
              <NavbarItem>
                <Button as={Link} href="/login" variant="light" size="sm">
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
                >
                  Registrarse
                </Button>
              </NavbarItem>
            </>
          ) : (
            <NavbarItem>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Button variant="bordered" size="sm" className="min-h-11">
                    <Avatar
                      name={user?.username ?? "User"}
                      size="sm"
                      showFallback
                      getInitials={() => getInitials(user?.username)}
                    />
                    <span className="hidden sm:inline">
                      {user?.username ?? "Usuario"}
                    </span>
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="User actions">
                  <DropdownItem key="profile" isReadOnly className="opacity-80">
                    {user?.email ?? "Sin email"}
                  </DropdownItem>
                  <DropdownItem key="logout" color="danger" onPress={logout}>
                    Cerrar sesión
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          )}
        </NavbarContent>
      </div>
    </Navbar>
  );
};
