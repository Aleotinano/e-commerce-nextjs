export interface ProductVariant {
  id: number;
  productId: number;
  color?: string | null;
  size?: string | null;
  price: number;
  stock: number;
  sku: string;
  img?: string | null;
  isActive: boolean;
}

export interface Product {
  id: number;
  img?: string | null;
  name: string;
  description?: string | null;
  categoryId?: number | null;
  isActive: boolean;
  price: number;
  stock: number;
  color?: string | null;
  size?: string | null;
  selectedVariantId?: number;
  variants: ProductVariant[];
}

export interface ProductVariantInput {
  color: string;
  size: string;
  price: number;
  stock: number;
  sku: string;
  img?: string;
  isActive?: boolean;
}

export interface ProductQueryParams {
  name?: string;
  price?: number;
  minPrice?: number;
  maxPrice?: number;
  categoryId?: number;
  color?: string;
  size?: string;
  limit?: number;
  offset?: number;
}

export interface ProductFiltersState {
  name: string;
  price: string;
  categoryId: number | null;
}

export interface ProductCreateInput {
  name: string;
  description?: string;
  categoryId?: number;
  img?: string;
  isActive?: boolean;
  variants: ProductVariantInput[];
}

export interface ProductUpdateInput {
  name?: string;
  description?: string;
  categoryId?: number;
  img?: string;
  isActive?: boolean;
}
