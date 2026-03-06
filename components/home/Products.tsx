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
    items.forEach((item) => {
      const productId = item.variant.productId;
      map.set(productId, (map.get(productId) ?? 0) + item.quantity);
    });
    return map;
  }, [items]);

  const displayProducts = useMemo(() => {
    return (products ?? []).map((product) => ({
      ...product,
      variants: product.variants ?? [],
    }));
  }, [products]);

  const handleAddVariantToCart = async (variantId: number) => {
    setLocalError(null);

    try {
      await addToCart(variantId);
    } catch (error) {
      setLocalError(getErrorMessage(error));
    }
  };

  const handleRemoveVariantFromCart = async (variantId: number) => {
    setLocalError(null);

    try {
      await removeFromCart(variantId);
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
  } else if (!displayProducts.length) {
    productsContent = <p>No hay productos disponibles.</p>;
  } else {
    productsContent = (
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {displayProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddVariantToCart}
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
        onAddItem={handleAddVariantToCart}
        onRemoveItem={handleRemoveVariantFromCart}
        onClearCart={handleClearCart}
        onCreateOrder={handleCreateOrder}
        onClose={closeCart}
      />
    </section>
  );
};
