"use client";

import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button, Card, CardBody, Chip, Divider } from "@heroui/react";
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
  const reduceMotion = useReducedMotion();

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

  const isEmpty = items.length === 0;
  const total = items.reduce(
    (acc, item) => acc + item.variant.price * item.quantity,
    0
  );
  const itemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen ? (
        <main>
          <motion.div
            aria-label="Cerrar carrito"
            aria-hidden="true"
            className="fixed inset-0 z-20 h-full bg-black/30"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.18 }}
            style={{ willChange: reduceMotion ? "auto" : "opacity" }}
          />

          <motion.aside
            id="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Carrito"
            className="fixed right-0 top-0 z-30 flex h-dvh w-full max-w-md flex-col border-l border-divider bg-background shadow-xl"
            initial={reduceMotion ? { x: 0 } : { x: 420 }}
            animate={{ x: 0 }}
            exit={reduceMotion ? { x: 0 } : { x: 420 }}
            transition={{
              duration: reduceMotion ? 0 : 0.22,
              ease: [0.2, 0.8, 0.2, 1],
            }}
            style={{ willChange: reduceMotion ? "auto" : "transform" }}
          >
            <header className="space-y-3 px-4 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold tracking-tight">
                  Carrito
                </h2>
                <Button
                  variant="light"
                  size="sm"
                  className="h-11 min-w-11 px-3"
                  onPress={onClose}
                >
                  Cerrar
                </Button>
              </div>
              <Chip
                variant="flat"
                color={isEmpty ? "default" : "primary"}
                size="sm"
                className="h-8 px-3 text-xs font-medium"
              >
                {isEmpty ? "Sin productos" : `${itemsCount} producto(s)`}
              </Chip>
            </header>
            <Divider />

            {errorMessage ? (
              <Card className="mx-4 mt-4 border border-danger/30 bg-danger/10 shadow-none">
                <CardBody className="p-3">
                  <p className="text-sm text-danger">{errorMessage}</p>
                </CardBody>
              </Card>
            ) : null}

            <div className="flex-1 overflow-y-auto px-4 py-4">
              {isEmpty ? (
                <Card
                  shadow="sm"
                  className="border border-divider bg-content2/40"
                >
                  <CardBody className="space-y-2 p-5 text-center">
                    <p className="text-base font-medium text-foreground">
                      Tu carrito esta vacio
                    </p>
                    <p className="text-sm text-foreground-500">
                      Agrega productos para continuar con tu compra.
                    </p>
                  </CardBody>
                </Card>
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

            <footer className="space-y-3 px-4 py-4">
              <Divider />
              <Card
                shadow="sm"
                className="border border-divider bg-content2/40"
              >
                <CardBody className="space-y-1 p-3">
                  <p className="text-xs uppercase tracking-wide text-foreground-500">
                    Total
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    {arsFormatter.format(total)}
                  </p>
                </CardBody>
              </Card>

              <Button
                color="danger"
                variant="bordered"
                fullWidth
                className="h-11 text-sm font-medium"
                isDisabled={isEmpty || isClearing || isCreatingOrder}
                isLoading={isClearing}
                onPress={() => void onClearCart()}
              >
                {isClearing ? "Vaciando..." : "Vaciar carrito"}
              </Button>

              <Button
                color="primary"
                variant="solid"
                fullWidth
                className="h-11 text-sm font-semibold"
                isDisabled={isEmpty || isCreatingOrder || isClearing}
                isLoading={isCreatingOrder}
                onPress={() => void onCreateOrder()}
              >
                {isCreatingOrder ? "Creando orden..." : "Crear orden y pagar"}
              </Button>
            </footer>
          </motion.aside>
        </main>
      ) : null}
    </AnimatePresence>
  );
}
