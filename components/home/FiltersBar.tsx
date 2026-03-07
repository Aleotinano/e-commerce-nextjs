"use client";

import { FormEvent, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button, Input } from "@heroui/react";
import { useProducts } from "@/context/useProducts";

export const FiltersBar = () => {
  const {
    filters,
    setPriceFilter,
    clearFilters,
    currentPage,
    pageSize,
    hasNextPage,
    hasPrevPage,
    goToNextPage,
    goToPrevPage,
    totalProducts,
    isLoadingProducts,
  } = useProducts();

  const priceInputRef = useRef<HTMLInputElement>(null);

  const handlePriceSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const priceValue = priceInputRef.current?.value ?? "";
    setPriceFilter(priceValue);
  };

  return (
    <section className="space-y-3 px-4">
      <form
        className="flex flex-wrap items-end gap-2"
        onSubmit={handlePriceSubmit}
      >
        <Input
          key={filters.price}
          ref={priceInputRef}
          type="number"
          min="0"
          step="0.01"
          defaultValue={filters.price}
          label="Precio máximo"
          placeholder="Ej: 19999"
          variant="bordered"
          size="sm"
          className="w-44"
        />

        <Button
          type="submit"
          color="primary"
          variant="bordered"
          size="sm"
          isDisabled={isLoadingProducts}
        >
          Aplicar precio
        </Button>

        <Button
          type="button"
          variant="light"
          size="sm"
          isDisabled={isLoadingProducts}
          onPress={clearFilters}
        >
          Limpiar filtros
        </Button>
      </form>

      <div className="flex items-center justify-between gap-3">
        <span className="text-sm text-foreground-500">
          Página {currentPage} ó {pageSize} por página
          {typeof totalProducts === "number"
            ? ` ó ${totalProducts} resultados`
            : ""}
        </span>

        <div className="flex gap-2">
          <Button
            variant="bordered"
            size="sm"
            isDisabled={!hasPrevPage || isLoadingProducts}
            onPress={goToPrevPage}
            startContent={<ChevronLeft className="h-4 w-4" />}
          >
            Anterior
          </Button>
          <Button
            variant="bordered"
            size="sm"
            isDisabled={!hasNextPage || isLoadingProducts}
            onPress={goToNextPage}
            endContent={<ChevronRight className="h-4 w-4" />}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </section>
  );
};
