import type { CategoryOption } from "@/components/home/categories/types";
import { Button, ScrollShadow, Skeleton } from "@heroui/react";

type CategoriesMobileProps = {
  options: CategoryOption[];
  activeCategoryId: number | null;
  onSelect: (categoryId: number | null) => void;
};

export function CategoriesMobile({
  options,
  activeCategoryId,
  onSelect,
}: CategoriesMobileProps) {
  return (
    <div className="md:hidden">
      <ScrollShadow orientation="horizontal" hideScrollBar className="w-full">
        <div className="flex gap-2 pb-2">
          {options.map((option, index) => {
            const isActive = activeCategoryId === option.id;

            // ── Botón focus
            if (isActive) {
              return (
                <Button
                  key={option.id ?? "all"}
                  type="button"
                  size="md"
                  radius="lg"
                  color="primary"
                  className="py-6 px-5 shrink-0 text-sm font-semibold"
                  startContent={<option.Icon className="size-5" />}
                  onPress={() => onSelect(option.id)}
                >
                  {option.name}
                </Button>
              );
            }

            // ── Resto
            return (
              <Button
                key={option.id ?? "all"}
                type="button"
                size="md"
                radius="lg"
                className="py-6 px-5 shrink-0 text-sm font-semibold text-content4"
                startContent={<option.Icon className="size-5 text-content4" />}
                onPress={() => onSelect(option.id)}
              >
                {option.name}
              </Button>
            );
          })}
        </div>
      </ScrollShadow>
    </div>
  );
}

export function CategoriesMobileSkeleton({ items = 6 }: { items?: number }) {
  const widths = ["w-24", "w-28", "w-32", "w-28", "w-24", "w-28"];

  return (
    <div className="md:hidden">
      <ScrollShadow orientation="horizontal" hideScrollBar className="w-full">
        <div className="flex gap-2 pb-2">
          {Array.from({ length: items }).map((_, index) => (
            <div
              key={`category-mobile-skeleton-${index}`}
              className={`h-12 ${
                widths[index] ?? "w-28"
              } shrink-0 rounded-large overflow-hidden`}
            >
              <Skeleton className="h-full w-full" />
            </div>
          ))}
        </div>
      </ScrollShadow>
    </div>
  );
}
