"use client";

import { useEffect } from "react";
import { CartItem as CartItemType } from "@/types/cart";
import { CartItem } from "./CartItem";

type CartProps = {
  isOpen: boolean;
  items: CartItemType[];
  isClearing: boolean;
  isCreatingOrder: boolean;
  errorMessage: string | null;
  onAddItem: (variantId: number) => Promise<void>;
  onRemoveItem: (variantId: number) => Promise<void>;
  onClearCart: () => Promise<void>;
  onCreateOrder: () => Promise<void>;
  onClose: () => void;
};

const arsFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

export function Cart({
  isOpen,
  items,
  isClearing,
  isCreatingOrder,
  errorMessage,
  onAddItem,
  onRemoveItem,
  onClearCart,
  onCreateOrder,
  onClose,
}: CartProps) {
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isEmpty = items.length === 0;
  const total = items.reduce(
    (acc, item) => acc + item.variant.price * item.quantity,
    0,
  );

  return (
    <>
      <button
        type="button"
        aria-label="Cerrar carrito"
        className="fixed inset-0 z-40 bg-black/40"
        onClick={onClose}
      />

      <aside
        id="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Carrito"
        className="fixed right-0 top-0 z-50 flex h-dvh w-full max-w-md flex-col border-l border-divider bg-content1"
      >
        <header className="flex items-center justify-between border-b border-divider px-4 py-3">
          <h2 className="text-lg font-semibold">Carrito</h2>
          <button
            type="button"
            className="inline-flex h-11 min-w-11 items-center justify-center rounded-small border border-divider px-3 text-sm transition-colors hover:bg-content2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            onClick={onClose}
          >
            Cerrar
          </button>
        </header>

        {errorMessage ? (
          <p className="border-b border-danger/30 bg-danger/10 px-4 py-2 text-sm text-danger">
            {errorMessage}
          </p>
        ) : null}

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {isEmpty ? (
            <div className="rounded-medium border border-divider p-4 text-sm text-foreground-500">
              El carrito esta vacio.
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <CartItem
                  key={`${item.variant.id}-${item.variant.productId}`}
                  item={item}
                  onAdd={(variantId) => void onAddItem(variantId)}
                  onRemove={(variantId) => void onRemoveItem(variantId)}
                />
              ))}
            </ul>
          )}
        </div>

        <footer className="space-y-3 border-t border-divider px-4 py-4">
          <p className="text-sm font-semibold">Total: {arsFormatter.format(total)}</p>

          <button
            type="button"
            disabled={isEmpty || isClearing || isCreatingOrder}
            className="h-11 w-full rounded-small border border-danger text-sm text-danger transition-colors hover:bg-danger/10 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={() => void onClearCart()}
          >
            {isClearing ? "Vaciando..." : "Vaciar carrito"}
          </button>

          <button
            type="button"
            disabled={isEmpty || isCreatingOrder || isClearing}
            className="h-11 w-full rounded-small border border-amber-500 text-sm font-medium transition-colors hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={() => void onCreateOrder()}
          >
            {isCreatingOrder ? "Creando orden..." : "Crear orden y pagar"}
          </button>
        </footer>
      </aside>
    </>
  );
}
