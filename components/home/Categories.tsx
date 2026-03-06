"use client";

import { useCategories } from "@/context/useCategories";
import { useProducts } from "@/context/useProducts";

export const Categories = () => {
  const { categories, isLoadingCategories, categoryError } = useCategories();
  const { filters, setCategoryFilter } = useProducts();

  if (isLoadingCategories) return <p>Cargando categorias...</p>;
  if (categoryError) return <p>{categoryError}</p>;
  if (!categories.length) return <p>No hay categorias disponibles.</p>;

  return (
    <ul className="flex flex-wrap gap-2">
      <li>
        <button
          className={`cursor-pointer rounded-small border px-3 py-2 ${
            filters.categoryId === null
              ? "border-amber-500 bg-amber-100"
              : "border-divider bg-content1"
          }`}
          onClick={() => setCategoryFilter(null)}
        >
          Todas
        </button>
      </li>

      {categories.map((category) => (
        <li key={category.id}>
          <button
            className={`cursor-pointer rounded-small border px-3 py-2 ${
              filters.categoryId === category.id
                ? "border-amber-500 bg-amber-100"
                : "border-divider bg-content1"
            }`}
            onClick={() =>
              setCategoryFilter(filters.categoryId === category.id ? null : category.id)
            }
          >
            {category.name}
          </button>
        </li>
      ))}
    </ul>
  );
};
