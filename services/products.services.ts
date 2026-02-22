import { fetcher } from "../lib/api";
import { Product } from "../types/products";

export const productService = {
  getAll: () => fetcher<Product[]>("/products"),

  getById: (id: number) => fetcher<Product>(`/products/${id}`),

  create: (data: Product) =>
    fetcher<Product>("/products", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: number, data: Product) =>
    fetcher<Product>(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  remove: (id: number) =>
    fetcher<void>(`/products/${id}`, {
      method: "DELETE",
    }),
};
