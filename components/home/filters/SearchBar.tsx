"use client";

import { FormEvent, useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Button, Input } from "@heroui/react";
import { useProducts } from "@/context/useProducts";
import { inputClasses } from "./filters.shared";

export const SearchBar = () => {
  const { filters, setNameFilter, isLoadingProducts } = useProducts();

  const [searchDraft, setSearchDraft] = useState(filters.name ?? "");

  // Sincroniza el borrador si los filtros se limpian externamente
  useEffect(() => {
    setSearchDraft(filters.name ?? "");
  }, [filters.name]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNameFilter(searchDraft.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full">
      <Input
        value={searchDraft}
        onChange={(e) => setSearchDraft(e.target.value)}
        type="text"
        placeholder="Buscar por nombre…"
        isDisabled={isLoadingProducts}
        size="lg"
        variant="bordered"
        radius="md"
        className="flex-1"
        classNames={inputClasses}
        startContent={
          <Search className="w-5 h-5 text-content4/30 flex-shrink-0" />
        }
      />
      <Button
        type="submit"
        color="primary"
        variant="solid"
        size="lg"
        radius="md"
        isDisabled={isLoadingProducts}
        className="font-semibold px-8 shadow-lg shadow-primary/20"
      >
        Buscar
      </Button>
    </form>
  );
};
