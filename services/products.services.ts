import { fetcher } from "../lib/api";
import {
  Product,
  ProductCreateInput,
  ProductUpdateInput,
  ProductQueryParams,
} from "../types/products";

function buildQuery(params?: ProductQueryParams) {
  if (!params) return "";

  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.set(key, String(value));
    }
  });

  const qs = query.toString();
  return qs ? `?${qs}` : "";
}

export const productService = {
  getAll: (params?: ProductQueryParams) =>
    fetcher<Product[]>(`/products${buildQuery(params)}`),

  getById: (id: number) => fetcher<Product>(`/products/${id}`),

  create: (data: ProductCreateInput) =>
    fetcher<Product>("/products", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: number, data: ProductUpdateInput) =>
    fetcher<Product>(`/products/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  remove: (id: number) =>
    fetcher<void>(`/products/${id}`, {
      method: "DELETE",
    }),
};
