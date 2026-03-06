"use client";

import { FormEvent, useRef } from "react";
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
    <section className="space-y-3">
      <form className="flex flex-wrap items-end gap-2" onSubmit={handlePriceSubmit}>
        <label className="flex flex-col gap-1 text-sm">
          Precio maximo
          <input
            key={filters.price}
            ref={priceInputRef}
            type="number"
            min="0"
            step="0.01"
            defaultValue={filters.price}
            className="h-11 w-44 rounded-small border border-divider bg-content1 px-3"
            placeholder="Ej: 199.99"
          />
        </label>

        <button
          disabled={isLoadingProducts}
          className="h-11 cursor-pointer rounded-small border border-amber-500 px-4 disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
        >
          Aplicar precio
        </button>

        <button
          disabled={isLoadingProducts}
          className="h-11 cursor-pointer rounded-small border border-divider px-4 disabled:cursor-not-allowed disabled:opacity-60"
          type="button"
          onClick={clearFilters}
        >
          Limpiar filtros
        </button>
      </form>

      <div className="flex flex-wrap items-center gap-2 text-sm">
        <button
          disabled={!hasPrevPage || isLoadingProducts}
          className="h-10 cursor-pointer rounded-small border border-divider px-3 disabled:cursor-not-allowed disabled:opacity-60"
          onClick={goToPrevPage}
          type="button"
        >
          Anterior
        </button>

        <span>
          Pagina {currentPage} - {pageSize} por pagina
          {typeof totalProducts === "number" ? ` - Total: ${totalProducts}` : ""}
        </span>

        <button
          disabled={!hasNextPage || isLoadingProducts}
          className="h-10 cursor-pointer rounded-small border border-divider px-3 disabled:cursor-not-allowed disabled:opacity-60"
          onClick={goToNextPage}
          type="button"
        >
          Siguiente
        </button>
      </div>
    </section>
  );
};
