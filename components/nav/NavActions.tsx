import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";
import { ShoppingCart, User } from "lucide-react";
import { NavSharedProps, getInitials } from "./nav.shared";

const ThemeSwitcher = dynamic(
  () =>
    import("@/components/theme/ThemeSwitcher").then((mod) => mod.ThemeSwitcher),
  { ssr: false }
);

interface NavActionsProps extends NavSharedProps {
  compact?: boolean;
}

export const NavActions = ({
  cartCount,
  isCartOpen,
  toggleCart,
  isAuthenticated,
  user,
  logout,
  compact = false,
}: NavActionsProps) => (
  <NavbarContent
    justify="end"
    className={`gap-2 ${compact ? "flex sm:hidden" : "hidden sm:flex"}`}
  >
    {/* ── Carrito ── */}
    <NavbarItem className="relative w-fit">
      <Button
        isIconOnly
        size="md"
        variant="light"
        aria-controls="cart-drawer"
        aria-expanded={isCartOpen}
        aria-label={isCartOpen ? "Cerrar carrito" : "Abrir carrito"}
        onPress={toggleCart}
      >
        <ShoppingCart size={16} />
      </Button>
      {cartCount > 0 && (
        <span className="absolute top-0 -right-1.5 min-w-4 h-4 px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold leading-4 text-center pointer-events-none">
          {cartCount > 99 ? "99+" : cartCount}
        </span>
      )}
    </NavbarItem>

    {/* ── Tema ── */}
    <NavbarItem>
      <ThemeSwitcher />
    </NavbarItem>

    {/* ── Auth desktop: botones o dropdown con nombre ── */}
    {!compact && (
      <>
        {!isAuthenticated ? (
          <>
            <NavbarItem>
              <Button as={Link} href="/login" variant="light" size="md">
                Iniciar sesión
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                href="/register"
                color="primary"
                variant="solid"
                size="md"
              >
                Registrarse
              </Button>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button variant="light" size="md" className="gap-2 px-2">
                  <Avatar
                    name={user?.username ?? "User"}
                    size="sm"
                    color="primary"
                    showFallback
                    classNames={{ base: "size-6 text-tiny shrink-0" }}
                    getInitials={() => getInitials(user?.username)}
                  />
                  <span className="text-sm font-medium">
                    {user?.username ?? "Usuario"}
                  </span>
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Acciones de usuario">
                <DropdownItem
                  key="profile"
                  isReadOnly
                  className="text-primary-foreground/50 data-[hover=true]:bg-transparent data-[hover=true]:text-primary-foreground/80"
                >
                  {user?.email ?? "Sin email"}
                </DropdownItem>
                <DropdownItem
                  key="settings"
                  isReadOnly
                  role="link"
                  className="text-primary-foreground/80 data-[hover=true]:text-primary-foreground"
                >
                  Configuración
                </DropdownItem>
                <DropdownItem key="logout" color="primary" onPress={logout}>
                  Cerrar sesión
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        )}
      </>
    )}

    {/* ── Auth mobile: siempre icono → dropdown cambia según estado ── */}
    {compact && (
      <NavbarItem>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button isIconOnly variant="light" size="md" aria-label="Usuario">
              {isAuthenticated ? (
                <Avatar
                  name={user?.username ?? "User"}
                  size="sm"
                  color="primary"
                  showFallback
                  classNames={{ base: "size-6 text-tiny" }}
                  getInitials={() => getInitials(user?.username)}
                />
              ) : (
                <User size={18} />
              )}
            </Button>
          </DropdownTrigger>

          {/* Dropdown no logueado */}
          {!isAuthenticated ? (
            <DropdownMenu aria-label="Acciones de usuario">
              <DropdownItem key="login" as={Link} href="/login">
                Iniciar sesión
              </DropdownItem>
              <DropdownItem
                key="register"
                as={Link}
                href="/register"
                color="primary"
              >
                Registrarse
              </DropdownItem>
            </DropdownMenu>
          ) : (
            // Dropdown logueado
            <DropdownMenu aria-label="Acciones de usuario">
              <DropdownItem
                key="profile"
                isReadOnly
                className="opacity-50 cursor-default data-[hover=true]:bg-transparent"
              >
                {user?.email ?? "Sin email"}
              </DropdownItem>
              <DropdownItem key="settings" isReadOnly role="link">
                Configuración
              </DropdownItem>
              <DropdownItem key="logout" color="primary" onPress={logout}>
                Cerrar sesión
              </DropdownItem>
            </DropdownMenu>
          )}
        </Dropdown>
      </NavbarItem>
    )}
  </NavbarContent>
);
