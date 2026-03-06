import { Product, ProductVariant } from "./products";

export interface CartInfo {
  created: string | null;
  updated: string | null;
}

export type CartItemProductSummary = Pick<Product, "id" | "name" | "img">;

export interface CartItem {
  variant: ProductVariant;
  quantity: number;
  product?: CartItemProductSummary;
}

export interface CartResponse {
  message: string;
  cart: CartInfo;
  products: CartItem[];
}

export interface AddToCartResponse {
  message: string;
  data: {
    producto?: string;
    variant: Pick<ProductVariant, "id" | "color" | "size" | "sku">;
    cantidad: number;
    stockRestante: number;
  };
}

export interface RemoveFromCartResponse {
  message: string;
  cantidadRestante?: number;
}

export interface ClearCartResponse {
  message: string;
  productosEliminados: number;
}
