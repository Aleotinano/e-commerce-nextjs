"use client";

import { Product } from "@/types/products";

type ProductCardProps = {
  product: Product;
  quantityInCart: number;
  onAddToCart: (productId: number) => Promise<void>;
  onRemoveFromCart: (productId: number) => Promise<void>;
};

export function ProductCard({
  product,
  quantityInCart,
  onAddToCart,
  onRemoveFromCart,
}: ProductCardProps) {
  const isOutOfStock = product.stock <= 0;
  const disableRemove = quantityInCart <= 0;

  return (
    <li className="w-44 rounded-medium bg-content1 p-2">
      {product.img ? (
        <img
          src={product.img}
          alt={`${product.name} image`}
          className="h-24 w-full rounded-small object-cover"
        />
      ) : (
        <div
          aria-label={`${product.name} image placeholder`}
          className="h-24 w-full rounded-small bg-amber-200"
        />
      )}

      <p className="mt-2 line-clamp-1 text-sm font-medium">{product.name}</p>
      <p className="text-sm text-foreground-500">$ {product.price}</p>
      <p className="text-xs text-foreground-500">
        En carrito: {quantityInCart}
      </p>

      <div className="mt-2 grid grid-cols-2 gap-2">
        <button
          disabled={disableRemove}
          className="h-11 cursor-pointer rounded-small border border-divider text-lg leading-none disabled:cursor-not-allowed disabled:opacity-60"
          onClick={() => void onRemoveFromCart(product.id)}
        >
          -
        </button>

        <button
          disabled={isOutOfStock}
          className="h-11 cursor-pointer rounded-small border border-amber-500 text-lg leading-none disabled:cursor-not-allowed disabled:opacity-60"
          onClick={() => void onAddToCart(product.id)}
        >
          +
        </button>
      </div>
    </li>
  );
}
