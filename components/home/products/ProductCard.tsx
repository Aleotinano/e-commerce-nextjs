"use client";

import { useMemo, useState } from "react";
import { Product } from "@/types/products";

interface ProductCardProps {
  product: Product;
  onAddToCart: (variantId: number) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const inStockActiveVariants = useMemo(
    () => product.variants.filter((v) => v.isActive && v.stock > 0),
    [product.variants]
  );

  const availableColors = useMemo(
    () =>
      [
        ...new Set(inStockActiveVariants.map((v) => v.color).filter(Boolean)),
      ] as string[],
    [inStockActiveVariants]
  );

  const sizesForColor = useMemo(
    () =>
      product.variants.filter((v) => v.color === selectedColor && v.isActive),
    [product.variants, selectedColor]
  );

  const selectedVariant = useMemo(
    () =>
      product.variants.find(
        (v) => v.color === selectedColor && v.size === selectedSize
      ) ?? null,
    [product.variants, selectedColor, selectedSize]
  );

  const defaultVariant =
    product.variants.find((v) => v.isActive) ?? product.variants[0] ?? null;

  const displayImage = selectedVariant?.img ?? product.img;
  const displayPrice =
    selectedVariant?.price ?? defaultVariant?.price ?? product.price;

  const canAdd = Boolean(selectedColor && selectedSize && selectedVariant);

  return (
    <li className="rounded-medium border border-divider bg-content1 p-3">
      {displayImage ? (
        <img
          src={displayImage}
          alt={`${product.name} image`}
          className="h-40 w-full rounded-small object-cover"
        />
      ) : (
        <div
          aria-label={`${product.name} image placeholder`}
          className="h-40 w-full rounded-small bg-amber-200"
        />
      )}

      <div className="mt-3 space-y-3">
        <div>
          <p className="line-clamp-1 text-sm font-semibold">{product.name}</p>
          <p className="text-sm text-foreground-500">$ {displayPrice}</p>
        </div>

        {availableColors.length > 0 ? (
          <div className="space-y-2">
            <p className="text-xs text-foreground-500">Color</p>
            <div className="flex flex-wrap gap-2">
              {availableColors.map((color) => {
                const isSelected = selectedColor === color;

                return (
                  <button
                    key={color}
                    type="button"
                    className={`min-h-11 rounded-full border px-3 text-sm transition ${
                      isSelected
                        ? "ring-2 ring-black"
                        : "border-divider hover:bg-content2"
                    }`}
                    onClick={() => {
                      setSelectedColor(color);
                      setSelectedSize(null);
                    }}
                  >
                    {color}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        {selectedColor ? (
          <div className="space-y-2">
            <p className="text-xs text-foreground-500">Talle</p>
            <div className="flex flex-wrap gap-2">
              {sizesForColor.map((variant) => {
                const sizeLabel = variant.size ?? "Unico";
                const isSelected = selectedSize === variant.size;
                const isOut = variant.stock === 0;

                return (
                  <button
                    key={variant.id}
                    type="button"
                    disabled={isOut}
                    className={`relative min-h-11 min-w-11 rounded-full border px-3 text-sm transition ${
                      isSelected
                        ? "bg-black text-white"
                        : "border-divider hover:bg-content2"
                    } ${isOut ? "cursor-not-allowed opacity-40" : ""}`}
                    onClick={() => setSelectedSize(variant.size ?? null)}
                  >
                    {sizeLabel}
                    {isOut ? (
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0"
                      >
                        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 rotate-45 bg-black/70" />
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        <button
          type="button"
          disabled={!canAdd}
          className="min-h-11 w-full rounded-small border border-amber-500 px-4 text-sm font-medium transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => {
            if (!selectedVariant) return;
            onAddToCart(selectedVariant.id);
            console.log(onAddToCart);
          }}
        >
          Agregar al carrito
        </button>
      </div>
    </li>
  );
}
