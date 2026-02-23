import { fetcher } from "../lib/api";
import { Category } from "../types/category";

export const categoryService = {
  getAll: () => fetcher<Category[]>("/categories"),

  getById: (id: number) => fetcher<Category>(`/categories/${id}`),

  create: (data: Category) =>
    fetcher<Category>("/categories", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: number, data: Category) =>
    fetcher<Category>(`/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  remove: (id: number) =>
    fetcher<void>(`/categories/${id}`, {
      method: "DELETE",
    }),
};
