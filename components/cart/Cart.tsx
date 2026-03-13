"use client";

import {
  Button,
  Card,
  CardBody,
  Chip,
  Divider,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/react";
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
  const isEmpty = items.length === 0;
  const total = items.reduce(
    (acc, item) => acc + item.variant.price * item.quantity,
    0
  );
  const itemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Drawer
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      size="sm"
      classNames={{
        base: "bg-background border-l border-content4/10",
        header: "border-b border-content4/10 pb-3",
        footer: "border-t border-content4/10 pt-3 flex-col gap-2",
        closeButton: "top-4 cursor-pointer text-primary-foreground",
      }}
    >
      <DrawerContent>
        {(onClose) => (
          <>
            {/* ── Header ── */}
            <DrawerHeader>
              <div className="flex gap-2 items-center">
                <h2 className="text-2xl font-semibold tracking-tight text-primary-foreground">
                  Carrito
                </h2>
                <Chip size="sm">{itemsCount}</Chip>
              </div>
            </DrawerHeader>

            {/* ── Body ── */}
            <DrawerBody className="px-4 ">
              {/* Error */}
              {errorMessage && (
                <Card className="border border-danger/30 bg-danger/10 shadow-none">
                  <CardBody className="p-3">
                    <p className="text-sm text-danger">{errorMessage}</p>
                  </CardBody>
                </Card>
              )}

              {/* Items o estado vacío */}
              {isEmpty ? (
                <Card
                  shadow="none"
                  className="border border-content4/10 bg-content1"
                >
                  <CardBody className="p-5 text-center space-y-1">
                    <p className="text-sm font-semibold text-content4">
                      Tu carrito está vacío
                    </p>
                    <p className="text-xs text-content4/40">
                      Agregá productos para continuar con tu compra.
                    </p>
                  </CardBody>
                </Card>
              ) : (
                <ul className="flex flex-col">
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
            </DrawerBody>

            {/* ── Footer ── */}
            <DrawerFooter>
              <div className="flex items-center justify-between w-full">
                <span className="text-xs uppercase tracking-widest text-content4/40 font-semibold">
                  Total
                </span>
                <span className="text-lg font-bold text-content4">
                  {arsFormatter.format(total)}
                </span>
              </div>

              <Divider className="bg-content4/10" />

              <Button
                color="danger"
                variant="bordered"
                fullWidth
                size="lg"
                radius="md"
                className="font-medium border-danger/30 text-danger hover:border-danger"
                isDisabled={isEmpty || isClearing || isCreatingOrder}
                isLoading={isClearing}
                onPress={() => void onClearCart()}
              >
                {isClearing ? "Vaciando…" : "Vaciar carrito"}
              </Button>

              <Button
                color="primary"
                variant="solid"
                fullWidth
                size="lg"
                radius="md"
                className="font-semibold shadow-lg shadow-primary/20"
                isDisabled={isEmpty || isCreatingOrder || isClearing}
                isLoading={isCreatingOrder}
                onPress={() => void onCreateOrder()}
              >
                {isCreatingOrder ? "Creando orden…" : "Crear orden y pagar"}
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
