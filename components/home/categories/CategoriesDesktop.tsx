import type { CategoryOption } from "@/components/home/categories/types";
import { Card, Skeleton } from "@heroui/react";

type CategoriesDesktopProps = {
  options: CategoryOption[];
  activeCategoryId: number | null;
  onSelect: (categoryId: number | null) => void;
};

export function CategoriesDesktop({
  options,
  activeCategoryId,
  onSelect,
}: CategoriesDesktopProps) {
  return (
    <ul className="gap-4 grid grid-cols-4 max-sm:grid-cols-2 max-md:hidden mx-auto">
      {options.map((option) => {
        const isActive = activeCategoryId === option.id;

        return (
          <Card
            key={option.id ?? "all"}
            isPressable
            shadow="none"
            onPress={() => onSelect(option.id)}
            className={`w-full min-h-fit transition-all overflow-hidden ${
              isActive ? "opacity-100" : "opacity-80 hover:opacity-100"
            }`}
          >
            <span className="p-1 bg-primary/80 text-lg text-primary-foreground">
              {option.name}
            </span>
            <div className="py-6 flex items-center justify-center">
              <option.Icon
                className={`transition-colors size-8 ${
                  isActive ? "text-primary" : "text-content4"
                }`}
              />
            </div>
          </Card>
        );
      })}
    </ul>
  );
}

export function CategoriesDesktopSkeleton({ items = 4 }: { items?: number }) {
  return (
    <ul className="gap-4 grid grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 max-md:hidden mx-auto max-w-6xl ">
      {Array.from({ length: items }).map((_, index) => (
        <li key={`category-desktop-skeleton-${index}`}>
          <Card shadow="none" className="w-full min-h-36 overflow-hidden">
            <Skeleton className="h-9 w-full rounded-none" />
            <div className="py-10 flex items-center justify-center">
              <Skeleton className="size-10 rounded-full" />
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
}
