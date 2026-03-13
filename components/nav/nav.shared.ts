export function getInitials(value?: string) {
  const source = value?.trim();
  if (!source) return "U";
  return source
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

export interface NavSharedProps {
  cartCount: number;
  isCartOpen: boolean;
  toggleCart: () => void;
  isAuthenticated: boolean;
  user: { username?: string; email?: string } | null;
  logout: () => void;
}
