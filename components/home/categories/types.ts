import type { ComponentType } from "react";

export type CategoryOption = {
  id: number | null;
  name: string;
  Icon: ComponentType<{ className?: string }>;
};
