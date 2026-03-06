"use client";

import { FormEvent, useRef } from "react";
import { useProducts } from "@/context/useProducts";

export const SearchBar = () => {
  const { filters, setNameFilter, isLoadingProducts } = useProducts();
  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nameValue = nameInputRef.current?.value ?? "";
    setNameFilter(nameValue);
  };

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <input
        key={filters.name}
        defaultValue={filters.name}
        ref={nameInputRef}
        placeholder="Buscar por nombre"
        className="h-11 w-full max-w-md rounded-small border border-divider bg-content1 px-3"
      />
      <button
        disabled={isLoadingProducts}
        className="h-11 cursor-pointer rounded-small border border-amber-500 px-4 disabled:cursor-not-allowed disabled:opacity-60"
        type="submit"
      >
        Buscar
      </button>
    </form>
  );
};
