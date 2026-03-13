"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button, Chip } from "@heroui/react";
import { useProducts } from "@/context/useProducts";

export const Pagination = () => {
  const {
    currentPage,
    pageSize,
    totalProducts,
    hasNextPage,
    hasPrevPage,
    goToNextPage,
    goToPrevPage,
    isLoadingProducts,
  } = useProducts();

  return (
    <div className="flex items-center justify-between gap-2 max-w-5xl w-full mx-auto px-4 py-2">
      {/* Resumen de resultados */}
      {isLoadingProducts ? (
        <div className="flex items-center gap-2 text-content4/40 text-sm">
          <span className="w-3.5 h-3.5 rounded-full border-2 border-content4/20 border-t-primary animate-spin inline-block" />
          Cargando…
        </div>
      ) : (
        <div className="flex items-center gap-1.5 text-sm text-content4/50">
          {typeof totalProducts === "number" && (
            <Chip
              size="sm"
              variant="flat"
              radius="sm"
              classNames={{
                base: "bg-primary/10 border border-primary/20 h-6 px-2",
                content: "text-primary font-bold text-xs px-0",
              }}
            >
              {totalProducts}
            </Chip>
          )}
          <span>resultados</span>
          <span className="text-content4/20">·</span>
          <span>
            Pág.{" "}
            <strong className="text-content4/80 font-semibold">
              {currentPage}
            </strong>
          </span>
          <span className="text-content4/20">·</span>
          <span>
            <strong className="text-content4/80 font-semibold">
              {pageSize}
            </strong>{" "}
            por página
          </span>
        </div>
      )}

      {/* Botones de navegación */}
      <div className="flex items-center gap-2">
        <Button
          variant="bordered"
          size="md"
          radius="md"
          isDisabled={!hasPrevPage || isLoadingProducts}
          onPress={goToPrevPage}
          startContent={<ChevronLeft className="w-4 h-4" />}
          className="border-content4/20 text-content4/60 data-[hover=true]:border-content4/40 data-[hover=true]:text-content4 data-[hover=true]:bg-content1"
        >
          Anterior
        </Button>
        <Button
          variant="bordered"
          size="md"
          radius="md"
          isDisabled={!hasNextPage || isLoadingProducts}
          onPress={goToNextPage}
          endContent={<ChevronRight className="w-4 h-4" />}
          className="border-content4/20 text-content4/60 data-[hover=true]:border-content4/40 data-[hover=true]:text-content4 data-[hover=true]:bg-content1"
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
};
