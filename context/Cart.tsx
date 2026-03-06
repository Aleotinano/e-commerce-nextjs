"use client";

import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { cartService } from "@/services/cart.service";
import { mercadoPagoService } from "@/services/mercadopago.service";
import { orderService } from "@/services/orders.service";
import { productService } from "@/services/products.services";
import { CartContextType } from "@/types/context";
import { CartInfo, CartItem } from "@/types/cart";
import { useAuth } from "./useAuth";

export const CartContext = createContext<CartContextType | null>(null);

type CartProviderProps = {
  children: React.ReactNode;
};

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return "Error desconocido";
}

function pickVariantIdFromProduct(product: Awaited<ReturnType<typeof productService.getById>>) {
  const activeWithStock = product.variants.find(
    (variant) => variant.isActive && variant.stock > 0,
  );

  if (activeWithStock) return activeWithStock.id;

  if (typeof product.selectedVariantId === "number") {
    return product.selectedVariantId;
  }

  return product.variants[0]?.id;
}

export function CartProvider({ children }: CartProviderProps) {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState<CartInfo | null>(null);
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoadingCart, setIsLoadingCart] = useState(false);
  const [cartError, setCartError] = useState<string | null>(null);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const clearLocalCart = useCallback(() => {
    setCart(null);
    setItems([]);
    setCartError(null);
    setIsCreatingOrder(false);
    setIsCartOpen(false);
  }, []);

  const openCart = useCallback(() => {
    setIsCartOpen(true);
  }, []);

  const closeCart = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  const toggleCart = useCallback(() => {
    setIsCartOpen((prev) => !prev);
  }, []);

  const getCart = useCallback(async () => {
    if (!isAuthenticated) {
      clearLocalCart();
      return;
    }

    setIsLoadingCart(true);
    setCartError(null);

    try {
      const data = await cartService.getCart();
      setCart(data.cart);
      setItems(data.products);
    } catch (error) {
      setCartError(getErrorMessage(error));
    } finally {
      setIsLoadingCart(false);
    }
  }, [clearLocalCart, isAuthenticated]);

  useEffect(() => {
    void getCart();
  }, [getCart]);

  const resolveVariantIdFromProductId = useCallback(
    async (productId: number) => {
      const inCart = items.find((item) => item.product.id === productId);
      if (inCart) return inCart.variant.id;

      const product = await productService.getById(productId);
      const variantId = pickVariantIdFromProduct(product);

      if (typeof variantId !== "number") {
        throw new Error("El producto no tiene variantes disponibles");
      }

      return variantId;
    },
    [items],
  );

  const addToCart = useCallback(
    async (productId: number) => {
      if (!isAuthenticated) {
        setCartError("Debes iniciar sesion");
        return;
      }

      setCartError(null);

      try {
        const variantId = await resolveVariantIdFromProductId(productId);
        await cartService.add(variantId);
        await getCart();
      } catch (error) {
        setCartError(getErrorMessage(error));
      }
    },
    [getCart, isAuthenticated, resolveVariantIdFromProductId],
  );

  const removeFromCart = useCallback(
    async (productId: number) => {
      if (!isAuthenticated) {
        setCartError("Debes iniciar sesion");
        return;
      }

      setCartError(null);

      try {
        const inCart = items.find((item) => item.product.id === productId);

        if (!inCart) {
          setCartError("El producto no esta en el carrito");
          return;
        }

        await cartService.remove(inCart.variant.id);
        await getCart();
      } catch (error) {
        setCartError(getErrorMessage(error));
      }
    },
    [getCart, isAuthenticated, items],
  );

  const clearCart = useCallback(async () => {
    if (!isAuthenticated) {
      clearLocalCart();
      return;
    }

    setCartError(null);

    try {
      await cartService.clear();
      await getCart();
    } catch (error) {
      setCartError(getErrorMessage(error));
    }
  }, [clearLocalCart, getCart, isAuthenticated]);

  const createOrder = useCallback(async () => {
    if (!isAuthenticated) {
      setCartError("Debes iniciar sesion");
      return null;
    }

    if (!items.length) {
      setCartError("Agrega productos antes de crear la orden");
      return null;
    }

    setCartError(null);
    setIsCreatingOrder(true);

    try {
      const orderResponse = await orderService.create();
      const orderId = orderResponse.order?.id;

      if (typeof orderId !== "number") {
        setCartError("No se pudo obtener el id de la orden creada");
        return null;
      }

      const paymentResponse = await mercadoPagoService.createPaymentLink(orderId);
      const paymentLink = paymentResponse.init_point?.trim();

      if (!paymentLink) {
        setCartError("La orden fue creada pero no llego el link de pago");
        return null;
      }

      await getCart();
      return paymentLink;
    } catch (error) {
      setCartError(getErrorMessage(error));
      return null;
    } finally {
      setIsCreatingOrder(false);
    }
  }, [getCart, isAuthenticated, items.length]);

  const cartCount = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      cart,
      items,
      cartCount,
      isLoadingCart,
      cartError,
      isCreatingOrder,
      isCartOpen,
      getCart,
      addToCart,
      removeFromCart,
      clearCart,
      createOrder,
      openCart,
      closeCart,
      toggleCart,
    }),
    [
      cart,
      items,
      cartCount,
      isLoadingCart,
      cartError,
      isCreatingOrder,
      isCartOpen,
      getCart,
      addToCart,
      removeFromCart,
      clearCart,
      createOrder,
      openCart,
      closeCart,
      toggleCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
