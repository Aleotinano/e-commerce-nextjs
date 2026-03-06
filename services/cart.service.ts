import { fetcher } from "../lib/api";
import {
  AddToCartResponse,
  CartResponse,
  ClearCartResponse,
  RemoveFromCartResponse,
} from "../types/cart";

export const cartService = {
  getCart: () => fetcher<CartResponse>("/cart"),

  add: (variantId: number) =>
    fetcher<AddToCartResponse>(`/cart/${variantId}`, {
      method: "POST",
    }),

  remove: (variantId: number) =>
    fetcher<RemoveFromCartResponse>(`/cart/${variantId}`, {
      method: "PATCH",
    }),

  clear: () =>
    fetcher<ClearCartResponse>("/cart", {
      method: "DELETE",
    }),
};
