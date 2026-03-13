"use client";

import { CartItem as CartItemType } from "@/types/cart";
import { Button } from "@heroui/react";
import { Plus, Minus, Ruler, Palette } from "lucide-react";
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
    item.variant as typeof item.variant & {
      product?: EmbeddedVariantProduct | null;
    }
  ).product;

  const productName = embeddedProduct?.name ?? item.product?.name ?? "Producto";
  const image =
    item.variant.img ?? embeddedProduct?.img ?? item.product?.img ?? null;

  return (
    <li className="flex gap-3 py-3 border-t border-content4/10 first:border-t-0">
      <div className="w-20 h-full shrink-0 rounded-medium overflow-hidden bg-content2">
        {image ? (
          <img
            src={image}
            alt={productName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[10px] text-content4/20 uppercase tracking-widest">
              N/A
            </span>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div className="flex items-start justify-between gap-2">
          <p className="text-xs font-bold text-content4 uppercase tracking-tight leading-snug line-clamp-2">
            {productName}
          </p>
          <div className="flex flex-col items-end shrink-0">
            <span className="text-[10px] uppercase tracking-widest text-content4/30 font-semibold">
              Subtotal
            </span>
            <span className="text-sm font-bold text-content4">
              {arsFormatter.format(item.variant.price * item.quantity)}
            </span>
          </div>
        </div>

        {(item.variant.color || item.variant.size) && (
          <div className="flex flex-wrap gap-1">
            {item.variant.color && (
              <span className="flex gap-1 items-center py-1 px-1.5 rounded-sm bg-content2 border border-content4/10 text-xs text-content4/50 uppercase tracking-wider font-medium">
                <Palette size={16} />
                {item.variant.color}
              </span>
            )}
            {item.variant.size && (
              <span className="flex gap-1 items-center py-1 px-1.5 rounded-sm bg-content2 border border-content4/10 text-xs text-content4/50 uppercase tracking-wider font-medium">
                <Ruler size={16} />
                {item.variant.size}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mt-2">
          {/* Precio unitario */}

          <span className="text-xs text-content4/50">
            {arsFormatter.format(item.variant.price)}
            <span className="text-content4/25">/ unidad</span>
          </span>

          {/* Pill cantidad */}
          <div className="flex items-center gap-1 border border-content4/10 rounded-lg">
            <Button
              isIconOnly
              size="sm"
              variant="light"
              radius="sm"
              onPress={() => onRemove(item.variant.id)}
              className="text-content4/60"
            >
              <Minus size={16} />
            </Button>

            <span className="w-5 text-center text-xs font-bold text-content4 tabular-nums select-none">
              {item.quantity}
            </span>

            <Button
              isIconOnly
              size="sm"
              variant="light"
              radius="sm"
              onPress={() => onAdd(item.variant.id)}
              className="text-content4/60"
            >
              <Plus size={16} />
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
}
