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

export interface ProductListResult {
  products: Product[];
  total: number | null;
  limit: number | null;
  offset: number | null;
}

export interface ProductFiltersState {
  name: string;
  price: string;
  categoryId: number | null;
}

export interface ProductApi {
  id: number;
  img?: string | null;
  name: string;
  description?: string | null;
  categoryId?: number | null;
  isActive: boolean;
  variants?: ProductVariant[];
}

export interface PaginationMeta {
  total?: number;
  count?: number;
  limit?: number;
  offset?: number;
}

export interface ProductListApiResponse {
  products?: ProductApi[];
  data?: ProductApi[];
  items?: ProductApi[];
  total?: number;
  count?: number;
  limit?: number;
  offset?: number;
  pagination?: PaginationMeta;
  meta?: PaginationMeta;
}

export interface ProductCreateApiResponse {
  message: string;
  producto: ProductApi;
}

export interface ProductUpdateApiResponse {
  message: string;
  product: ProductApi;
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
