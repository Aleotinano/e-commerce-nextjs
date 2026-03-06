"use client";

import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { cartService } from "@/services/cart.service";
import { mercadoPagoService } from "@/services/mercadopago.service";
import { orderService } from "@/services/orders.service";
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

  const addToCart = useCallback(
    async (variantId: number) => {
      if (!isAuthenticated) {
        setCartError("Debes iniciar sesion");
        return;
      }

      setCartError(null);

      try {
        await cartService.add(variantId);
        await getCart();
      } catch (error) {
        setCartError(getErrorMessage(error));
      }
    },
    [getCart, isAuthenticated],
  );

  const removeFromCart = useCallback(
    async (variantId: number) => {
      if (!isAuthenticated) {
        setCartError("Debes iniciar sesion");
        return;
      }

      setCartError(null);

      try {
        await cartService.remove(variantId);
        await getCart();
      } catch (error) {
        setCartError(getErrorMessage(error));
      }
    },
    [getCart, isAuthenticated],
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
