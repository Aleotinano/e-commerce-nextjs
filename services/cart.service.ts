import { fetcher } from "../lib/api";
import {
  AddToCartResponse,
  BackendCartItem,
  BackendGetCartResponse,
  ClearCartResponse,
  GetCartResponse,
  RemoveFromCartResponse,
} from "../types/cart";
import { CartItem } from "../types/cart";

function normalizeCartItem(item: BackendCartItem): CartItem {
  const productId = item.variant.product?.id ?? item.variant.id;
  const productName = item.variant.product?.name ?? `Variante ${item.variant.id}`;

  return {
    quantity: item.quantity,
    variant: item.variant,
    product: {
      id: productId,
      img: item.variant.img ?? item.variant.product?.img ?? null,
      name: productName,
      description: null,
      categoryId: null,
      isActive: true,
      price: item.variant.price,
      stock: item.variant.stock,
      color: item.variant.color ?? null,
      size: item.variant.size ?? null,
      selectedVariantId: item.variant.id,
      variants: [
        {
          id: item.variant.id,
          productId,
          color: item.variant.color ?? null,
          size: item.variant.size ?? null,
          price: item.variant.price,
          stock: item.variant.stock,
          sku: item.variant.sku,
          img: item.variant.img ?? null,
          isActive: true,
        },
      ],
    },
  };
}

function normalizeCartResponse(response: BackendGetCartResponse): GetCartResponse {
  const groupedByProduct = new Map<number, CartItem>();

  for (const backendItem of response.products) {
    const normalized = normalizeCartItem(backendItem);
    const existing = groupedByProduct.get(normalized.product.id);

    if (!existing) {
      groupedByProduct.set(normalized.product.id, normalized);
      continue;
    }

    groupedByProduct.set(normalized.product.id, {
      ...existing,
      quantity: existing.quantity + normalized.quantity,
    });
  }

  return {
    message: response.message,
    cart: response.cart,
    products: Array.from(groupedByProduct.values()),
  };
}

export const cartService = {
  getCart: async () => {
    const response = await fetcher<BackendGetCartResponse>("/cart");
    return normalizeCartResponse(response);
  },

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
