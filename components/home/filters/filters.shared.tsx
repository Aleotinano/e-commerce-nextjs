import { FormEvent } from "react";
import { X, DollarSign } from "lucide-react";
import { Button, Input } from "@heroui/react";

// ─── Clases reutilizables para todos los inputs ───────────────────────────────
export const inputClasses = {
  inputWrapper: [
    "border-content4/20 bg-content1",
    "data-[hover=true]:border-primary/50",
    "data-[focus=true]:border-primary",
    "group-data-[focus=true]:border-primary",
  ],
  input: "text-content4 placeholder:text-content4/30",
};

// ─── Props del formulario de precio ──────────────────────────────────────────
export interface PriceFormProps {
  priceValue: string | undefined;
  isLoadingProducts: boolean;
  hasActiveFilters: boolean;
  priceApplied: boolean;
  priceInputRef: React.RefObject<HTMLInputElement | null>;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onClear: () => void;
}

// ─── Formulario de precio (usado dentro del drawer) ───────────────────────────
export const PriceForm = ({
  priceValue = "",
  isLoadingProducts = false,
  hasActiveFilters = false,
  priceApplied = false,
  priceInputRef,
  onSubmit,
  onClear,
}: PriceFormProps) => (
  <form onSubmit={onSubmit} className="w-full">
    <div className="flex flex-col gap-3">
      <Input
        key={priceValue || "empty"}
        ref={priceInputRef}
        type="number"
        min="0"
        step="0.01"
        defaultValue={priceValue || ""}
        placeholder="Ej: 19999"
        label="Precio máximo"
        labelPlacement="outside"
        isDisabled={isLoadingProducts}
        size="lg"
        variant="bordered"
        radius="md"
        className="w-full"
        classNames={{
          ...inputClasses,
          label: "text-content4/60 font-medium text-sm pb-1",
        }}
        startContent={
          <DollarSign className="w-4 h-4 text-content4/30 flex-shrink-0" />
        }
        endContent={
          priceApplied ? (
            <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 animate-pulse" />
          ) : null
        }
      />

      <div className="flex gap-2">
        <Button
          type="submit"
          color="primary"
          variant="bordered"
          size="lg"
          radius="md"
          isDisabled={isLoadingProducts}
          className="flex-1 border-primary/60 text-primary font-semibold hover:border-primary"
        >
          Aplicar precio
        </Button>

        {hasActiveFilters && (
          <Button
            type="button"
            variant="light"
            size="lg"
            radius="md"
            isDisabled={isLoadingProducts}
            onPress={onClear}
            startContent={<X className="w-4 h-4" />}
            className="flex-1 text-content4/50 data-[hover=true]:text-content4 data-[hover=true]:bg-content1"
          >
            Limpiar
          </Button>
        )}
      </div>
    </div>
  </form>
);
