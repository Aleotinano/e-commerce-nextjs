"use client";

import type { ComponentType } from "react";
import * as LucideIcons from "lucide-react";
import { LayoutGrid } from "lucide-react";
import { Button, Card, CardBody, ScrollShadow, Skeleton } from "@heroui/react";
import { useCategories } from "@/context/useCategories";
import { useProducts } from "@/context/useProducts";

type CategoryOption = {
  id: number | null;
  name: string;
  Icon: ComponentType<{ className?: string }>;
};

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
      <section className="-mt-11 relative z-10 px-4">
        <div className="sm:hidden">
          <div className="flex gap-2 overflow-hidden pb-1">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                key={`category-mobile-skeleton-${index}`}
                className="h-11 w-32 shrink-0 rounded-large"
              />
            ))}
          </div>
        </div>

        <ul className="hidden grid-cols-2 gap-3 sm:grid sm:grid-cols-3 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <li key={`category-desktop-skeleton-${index}`}>
              <Skeleton className="h-32 rounded-large" />
            </li>
          ))}
        </ul>
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
    <section className="-mt-11 relative z-10 px-4">
      <div className="md:hidden">
        <ScrollShadow orientation="horizontal" hideScrollBar className="w-full">
          <div className="flex gap-2 pb-1">
            {options.map((option) => {
              const isActive = filters.categoryId === option.id;

              return (
                <Button
                  key={option.id ?? "all"}
                  type="button"
                  size="sm"
                  radius="lg"
                  variant={isActive ? "solid" : "bordered"}
                  color={isActive ? "primary" : "default"}
                  className="h-11 shrink-0 px-4 text-sm font-medium"
                  startContent={<option.Icon className="h-4 w-4" />}
                  onPress={() => setCategoryFilter(option.id)}
                >
                  {option.name}
                </Button>
              );
            })}
          </div>
        </ScrollShadow>
      </div>
      <ul className="gap-2 grid grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 max-md:hidden align-center">
        {options.map((option) => {
          const isActive = filters.categoryId === option.id;

          return (
            <li key={option.id ?? "all"}>
              <Card
                isPressable
                shadow="none"
                onPress={() => setCategoryFilter(option.id)}
                className={`size-full border transition-all duration-200 ${
                  isActive
                    ? "border-primary bg-primary"
                    : "border-divider bg-content1 hover:bg-content2 hover:border-primary/40"
                }`}
              >
                <CardBody className="flex flex-row items-center gap-3 px-5 py-4">
                  <option.Icon
                    className={`size-5 shrink-0 transition-colors ${
                      isActive
                        ? "text-primary-foreground"
                        : "text-foreground-400"
                    }`}
                  />
                  <span
                    className={`text-sm font-medium tracking-wide ${
                      isActive ? "text-primary-foreground" : "text-foreground"
                    }`}
                  >
                    {option.name}
                  </span>
                </CardBody>
              </Card>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
