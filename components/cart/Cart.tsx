"use client";

import { useEffect } from "react";
import { CartItem } from "@/types/cart";

type CartProps = {
  isOpen: boolean;
  items: CartItem[];
  isClearing: boolean;
  isCreatingOrder: boolean;
  errorMessage: string | null;
  onAddItem: (productId: number) => Promise<void>;
  onRemoveItem: (productId: number) => Promise<void>;
  onClearCart: () => Promise<void>;
  onCreateOrder: () => Promise<void>;
  onClose: () => void;
};

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
    (acc, item) => acc + item.product.price * item.quantity,
    0
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
              {items.map((item) => {
                const disableRemove =
                  item.quantity <= 0 || isCreatingOrder || isClearing;
                const disableAdd =
                  item.product.stock <= 0 || isCreatingOrder || isClearing;

                return (
                  <li
                    key={item.product.id}
                    className="rounded-medium border border-divider p-3"
                  >
                    <div className="flex gap-3">
                      {item.product.img ? (
                        <img
                          src={item.product.img}
                          alt={item.product.name}
                          className="h-16 w-16 rounded-small object-cover"
                        />
                      ) : (
                        <div
                          aria-label={`${item.product.name} image placeholder`}
                          className="h-16 w-16 rounded-small bg-amber-200"
                        />
                      )}

                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-sm font-medium">
                          {item.product.name}
                        </p>
                        <p className="mt-1 text-xs text-foreground-500">
                          $ {item.product.price}
                        </p>
                        <p className="text-xs text-foreground-500">
                          Subtotal: {item.product.price * item.quantity}
                        </p>

                        <div className="mt-2 inline-flex items-center gap-2">
                          <button
                            type="button"
                            disabled={disableRemove}
                            className="inline-flex h-10 min-w-10 items-center justify-center rounded-small border border-divider text-lg leading-none transition-colors hover:bg-content2 disabled:cursor-not-allowed disabled:opacity-60"
                            onClick={() => void onRemoveItem(item.product.id)}
                          >
                            -
                          </button>

                          <span className="min-w-6 text-center text-sm font-medium">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            disabled={disableAdd}
                            className="inline-flex h-10 min-w-10 items-center justify-center rounded-small border border-amber-500 text-lg leading-none transition-colors hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-60"
                            onClick={() => void onAddItem(item.product.id)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <footer className="space-y-3 border-t border-divider px-4 py-4">
          <p className="text-sm font-semibold">Total: {total}</p>

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
