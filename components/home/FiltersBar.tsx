"use client";

import { FormEvent, useRef } from "react";
import { SlidersHorizontal } from "lucide-react";
import {
  Button,
  Chip,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
} from "@heroui/react";
import { useProducts } from "@/context/useProducts";
import { SearchBar } from "./filters/SearchBar";
import { PriceForm } from "./filters/filters.shared";

export const FiltersBar = () => {
  const { filters, setPriceFilter, clearFilters, isLoadingProducts } =
    useProducts();

  const priceInputRef = useRef<HTMLInputElement>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const priceApplied = !!filters?.price?.trim();

  const hasActiveFilters = !!(
    filters?.name?.trim() ||
    filters?.price?.trim() ||
    (filters?.categoryId ?? null) !== null
  );

  const activeFiltersCount =
    (filters?.name?.trim() ? 1 : 0) +
    (filters?.price?.trim() ? 1 : 0) +
    ((filters?.categoryId ?? null) !== null ? 1 : 0);

  const handlePriceSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPriceFilter(priceInputRef.current?.value ?? "");
  };

  const handleClear = () => clearFilters();

  return (
    <section className="px-4 py-2 flex flex-col gap-4 max-w-5xl w-full mx-auto">
      <div className="flex items-center gap-2">
        <SearchBar />

        <Button
          type="button"
          variant="bordered"
          size="lg"
          radius="md"
          onPress={onOpen}
          isDisabled={isLoadingProducts}
          isIconOnly
          aria-label="Abrir filtros"
          className={`relative border-content4/20 text-content4/60 data-[hover=true]:border-primary/50 data-[hover=true]:text-primary ${
            hasActiveFilters ? "border-primary/40 text-primary" : ""
          }`}
        >
          <SlidersHorizontal className="w-5 h-5" />
        </Button>
      </div>

      {/* Drawer lateral — filtros avanzados */}
      <Drawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="right"
        size="xs"
        classNames={{
          base: "bg-content1 border-l border-content4/10",
          header: "border-b border-content4/10 pb-4",
          footer: "border-t border-content4/10 pt-4",
        }}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader>
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-primary" />
                  <span className="text-content4 font-bold text-base">
                    Filtros
                  </span>
                  {hasActiveFilters && (
                    <Chip
                      size="sm"
                      variant="flat"
                      radius="full"
                      classNames={{
                        base: "bg-primary/10 border border-primary/20 h-5 px-2",
                        content: "text-primary font-bold text-[11px] px-0",
                      }}
                    >
                      {activeFiltersCount} activo
                      {activeFiltersCount === 1 ? "" : "s"}
                    </Chip>
                  )}
                </div>
              </DrawerHeader>

              <DrawerBody className="py-6">
                <PriceForm
                  priceValue={filters?.price}
                  isLoadingProducts={isLoadingProducts}
                  hasActiveFilters={hasActiveFilters}
                  priceApplied={priceApplied}
                  priceInputRef={priceInputRef}
                  onSubmit={handlePriceSubmit}
                  onClear={handleClear}
                />
              </DrawerBody>

              <DrawerFooter>
                <Button
                  color="primary"
                  variant="solid"
                  size="lg"
                  radius="md"
                  className="w-full font-semibold"
                  onPress={onClose}
                >
                  Ver resultados
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </section>
  );
};
