"use client";

import type { ComponentType } from "react";
import * as LucideIcons from "lucide-react";
import { LayoutGrid } from "lucide-react";
import {
  CategoriesDesktop,
  CategoriesDesktopSkeleton,
} from "@/components/home/categories/CategoriesDesktop";
import {
  CategoriesMobile,
  CategoriesMobileSkeleton,
} from "@/components/home/categories/CategoriesMobile";
import type { CategoryOption } from "@/components/home/categories/types";
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
      <section className="md:-mt-12 my-4 relative z-10 px-4">
        <CategoriesMobileSkeleton />
        <CategoriesDesktopSkeleton />
      </section>
    );
  }

  if (categoryError) return <p className="px-4">{categoryError}</p>;

  if (!categories.length) return null;

  const options: CategoryOption[] = [
    { id: null, name: "Todas", Icon: LayoutGrid },
    ...categories.map((category) => ({
      id: category.id,
      name: category.name,
      Icon: getCategoryIcon(category.icon),
    })),
  ];

  return (
    <section className="py-4 relative z-10 px-4 max-w-6xl mx-auto">
      {" "}
      <CategoriesMobile
        options={options}
        activeCategoryId={filters.categoryId}
        onSelect={setCategoryFilter}
      />
      <CategoriesDesktop
        options={options}
        activeCategoryId={filters.categoryId}
        onSelect={setCategoryFilter}
      />
    </section>
  );
};
