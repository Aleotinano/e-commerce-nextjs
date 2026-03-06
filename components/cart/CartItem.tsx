"use client";

import { CartItem as CartItemType } from "@/types/cart";

type EmbeddedVariantProduct = {
  id: number;
  name: string;
  img?: string | null;
};

type CartItemProps = {
  item: CartItemType;
  onAdd: (variantId: number) => void;
  onRemove: (variantId: number) => void;
};

const arsFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

export function CartItem({ item, onAdd, onRemove }: CartItemProps) {
  const embeddedProduct = (
    item.variant as typeof item.variant & { product?: EmbeddedVariantProduct | null }
  ).product;

  const productName = embeddedProduct?.name ?? item.product?.name ?? "Producto";
  const image = item.variant.img ?? embeddedProduct?.img ?? item.product?.img ?? null;

  return (
    <li className="rounded-medium border border-divider p-3">
      <div className="flex gap-3">
        {image ? (
          <img
            src={image}
            alt={productName}
            className="h-16 w-16 rounded-small object-cover"
          />
        ) : (
          <div
            aria-label={`${productName} image placeholder`}
            className="h-16 w-16 rounded-small bg-amber-200"
          />
        )}

        <div className="min-w-0 flex-1 space-y-2">
          <p className="line-clamp-2 text-sm font-medium">{productName}</p>

          <div className="flex flex-wrap gap-2">
            {item.variant.color ? (
              <span className="min-h-11 rounded-full border border-divider px-3 py-2 text-xs">
                {item.variant.color}
              </span>
            ) : null}
            {item.variant.size ? (
              <span className="min-h-11 rounded-full border border-divider px-3 py-2 text-xs">
                {item.variant.size}
              </span>
            ) : null}
          </div>

          <p className="text-sm text-foreground-600">{arsFormatter.format(item.variant.price)}</p>
          <p className="text-xs text-foreground-500">Cantidad: {item.quantity}</p>

          <div className="inline-flex items-center gap-2">
            <button
              type="button"
              className="min-h-11 min-w-11 rounded-small border border-divider text-lg"
              onClick={() => onRemove(item.variant.id)}
            >
              -
            </button>
            <button
              type="button"
              className="min-h-11 min-w-11 rounded-small border border-amber-500 text-lg"
              onClick={() => onAdd(item.variant.id)}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
