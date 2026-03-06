import { Product, ProductVariant } from "./products";

export interface CartInfo {
  created: string | null;
  updated: string | null;
}

export interface CartVariantProduct {
  id: number;
  name: string;
  img?: string | null;
}

export interface CartVariant
  extends Pick<
    ProductVariant,
    "id" | "color" | "size" | "price" | "stock" | "sku" | "img"
  > {
  product: CartVariantProduct | null;
}

export interface CartItem {
  product: Product;
  variant: CartVariant;
  quantity: number;
}

export interface BackendCartItem {
  variant: CartVariant;
  quantity: number;
}

export interface BackendGetCartResponse {
  message: string;
  cart: CartInfo;
  products: BackendCartItem[];
}

export interface GetCartResponse {
  message: string;
  cart: CartInfo;
  products: CartItem[];
}

export interface AddToCartResponse {
  message: string;
  data: {
    producto?: string;
    variant: {
      id: number;
      color?: string | null;
      size?: string | null;
      sku: string;
    };
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
