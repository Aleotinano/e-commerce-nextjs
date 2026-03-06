"use client";

import { useMemo, useState } from "react";
import { useCart } from "@/context/useCart";
import { useProducts } from "@/context/useProducts";
import { ProductCard } from "./products/ProductCard";
import { Cart } from "../cart/Cart";

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return "Ocurrio un error con el carrito";
}

export const Products = () => {
  const { products, isLoadingProducts, productError } = useProducts();
  const {
    items,
    addToCart,
    removeFromCart,
    clearCart,
    createOrder,
    cartError,
    isCreatingOrder,
    isCartOpen,
    closeCart,
  } = useCart();
  const [isClearing, setIsClearing] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const quantityByProductId = useMemo(() => {
    const map = new Map<number, number>();
    items.forEach((item) => map.set(item.product.id, item.quantity));
    return map;
  }, [items]);

  const handleAddToCart = async (productId: number) => {
    setLocalError(null);

    try {
      await addToCart(productId);
    } catch (error) {
      setLocalError(getErrorMessage(error));
    }
  };

  const handleRemoveFromCart = async (productId: number) => {
    if ((quantityByProductId.get(productId) ?? 0) <= 0) return;

    setLocalError(null);

    try {
      await removeFromCart(productId);
    } catch (error) {
      setLocalError(getErrorMessage(error));
    }
  };

  const handleClearCart = async () => {
    setLocalError(null);
    setIsClearing(true);

    try {
      await clearCart();
    } catch (error) {
      setLocalError(getErrorMessage(error));
    } finally {
      setIsClearing(false);
    }
  };

  const handleCreateOrder = async () => {
    setLocalError(null);

    try {
      const paymentLink = await createOrder();
      if (!paymentLink) return;

      closeCart();
      window.location.assign(paymentLink);
    } catch (error) {
      setLocalError(getErrorMessage(error));
    }
  };

  let productsContent: React.ReactNode;

  if (isLoadingProducts) {
    productsContent = <p>Cargando productos...</p>;
  } else if (productError) {
    productsContent = <p>{productError}</p>;
  } else if (!products.length) {
    productsContent = <p>No hay productos disponibles.</p>;
  } else {
    productsContent = (
      <ul className="flex flex-wrap gap-2">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            quantityInCart={quantityByProductId.get(product.id) ?? 0}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
          />
        ))}
      </ul>
    );
  }

  const visibleError = localError || cartError;

  return (
    <section className="space-y-4">
      {visibleError ? <p className="text-danger">{visibleError}</p> : null}

      {productsContent}

      <Cart
        isOpen={isCartOpen}
        items={items}
        isClearing={isClearing}
        isCreatingOrder={isCreatingOrder}
        errorMessage={visibleError}
        onAddItem={handleAddToCart}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onCreateOrder={handleCreateOrder}
        onClose={closeCart}
      />
    </section>
  );
};
