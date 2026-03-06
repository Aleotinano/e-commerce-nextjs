export interface Category {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  isActive: boolean;
}

export type CategoryCreateInput = Omit<Category, "id">;

export type CategoryUpdateInput = Partial<CategoryCreateInput>;
