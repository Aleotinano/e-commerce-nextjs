"use client";

import { useMemo, useState } from "react";
import { Button, Card, CardBody, CardFooter, Chip } from "@heroui/react";
import { Product } from "@/types/products";

interface ProductCardProps {
  product: Product;
  onAddToCart: (variantId: number) => void;
}

const arsFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

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
    <Card as="li" shadow="sm" className="border border-divider">
      <CardBody className="overflow-hidden p-0">
        {displayImage ? (
          <img
            src={displayImage}
            alt={`${product.name} image`}
            className="h-44 w-full object-cover"
          />
        ) : (
          <div
            aria-label={`${product.name} image placeholder`}
            className="h-44 w-full bg-content2"
          />
        )}
      </CardBody>

      <CardFooter className="flex flex-col items-start gap-3 p-3">
        <div>
          <p className="line-clamp-1 text-sm font-semibold">{product.name}</p>
          <p className="text-sm text-foreground-500">{arsFormatter.format(displayPrice)}</p>
        </div>

        {availableColors.length > 0 ? (
          <div className="space-y-2">
            <p className="text-xs text-foreground-500">Color</p>
            <div className="flex flex-wrap gap-2">
              {availableColors.map((color) => {
                const isSelected = selectedColor === color;

                return (
                  <Chip
                    key={color}
                    variant={isSelected ? "solid" : "bordered"}
                    color={isSelected ? "primary" : "default"}
                    className="min-h-11 cursor-pointer"
                    onClick={() => {
                      setSelectedColor(color);
                      setSelectedSize(null);
                    }}
                  >
                    {color}
                  </Chip>
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
                  <Chip
                    key={variant.id}
                    variant={isSelected ? "solid" : "bordered"}
                    color={isSelected ? "primary" : "default"}
                    className={`min-h-11 ${
                      isOut
                        ? "cursor-not-allowed opacity-40 line-through"
                        : "cursor-pointer"
                    }`}
                    isDisabled={isOut}
                    onClick={() => !isOut && setSelectedSize(variant.size ?? null)}
                  >
                    {sizeLabel}
                  </Chip>
                );
              })}
            </div>
          </div>
        ) : null}

        <Button
          type="button"
          color="primary"
          variant="bordered"
          fullWidth
          isDisabled={!canAdd}
          onPress={() => {
            if (!selectedVariant) return;
            onAddToCart(selectedVariant.id);
          }}
        >
          Agregar al carrito
        </Button>
      </CardFooter>
    </Card>
  );
}
