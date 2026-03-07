"use client";

import type { ComponentType } from "react";
import * as LucideIcons from "lucide-react";
import { LayoutGrid } from "lucide-react";
import { useCategories } from "@/context/useCategories";
import { useProducts } from "@/context/useProducts";

function getCategoryIcon(iconName?: string) {
  if (!iconName) return LucideIcons.Tag;
  const Icon = (LucideIcons as Record<string, unknown>)[iconName];
  if (typeof Icon !== "function") return LucideIcons.Tag;
  return Icon as ComponentType<{ className?: string }>;
}

export const Categories = () => {
  const { categories, isLoadingCategories, categoryError } = useCategories();
  const { filters, setCategoryFilter } = useProducts();

  if (isLoadingCategories) {
    return (
      <ul className="grid grid-cols-2 gap-3 px-4 sm:grid-cols-3 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <li key={`category-skeleton-${index}`}>
            <div className="h-20 animate-pulse rounded-medium bg-content2" />
          </li>
        ))}
      </ul>
    );
  }

  if (categoryError) return <p className="px-4">{categoryError}</p>;
  if (!categories.length) return null;

  return (
    <ul className="grid grid-cols-2 gap-3 px-4 sm:grid-cols-3 md:grid-cols-4">
      <li>
        <button
          type="button"
          className={`flex min-h-[80px] w-full flex-col items-center justify-center gap-2 rounded-medium border p-4 text-center transition-colors ${
            filters.categoryId === null
              ? "border-primary bg-primary/10 text-primary"
              : "border-divider bg-content1 hover:bg-content2"
          }`}
          onClick={() => setCategoryFilter(null)}
        >
          <LayoutGrid className="h-8 w-8 text-primary" />
          <span className="text-sm font-medium">Todas</span>
        </button>
      </li>

      {categories.map((category) => {
        const Icon = getCategoryIcon(category.icon);
        const isActive = filters.categoryId === category.id;

        return (
          <li key={category.id}>
            <button
              type="button"
              className={`flex min-h-[80px] w-full flex-col items-center justify-center gap-2 rounded-medium border p-4 text-center transition-colors ${
                isActive
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-divider bg-content1 hover:bg-content2"
              }`}
              onClick={() =>
                setCategoryFilter(filters.categoryId === category.id ? null : category.id)
              }
            >
              <Icon className="h-8 w-8 text-primary" />
              <span className="text-sm font-medium">{category.name}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
};
