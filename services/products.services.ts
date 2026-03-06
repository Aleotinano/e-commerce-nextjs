import { fetcher } from "../lib/api";
import {
  Product,
  ProductApi,
  ProductCreateApiResponse,
  ProductCreateInput,
  ProductListApiResponse,
  ProductListResult,
  ProductQueryParams,
  ProductUpdateApiResponse,
  ProductUpdateInput,
  ProductVariant,
} from "../types/products";

const EMPTY_LIST_META = {
  total: null,
  limit: null,
  offset: null,
} as const;

function buildProductsQuery(params?: ProductQueryParams) {
  if (!params) return "";

  const query = new URLSearchParams();

  const setTrimmed = (key: string, value?: string) => {
    const normalized = value?.trim();
    if (normalized) query.set(key, normalized);
  };

  const setNumber = (key: string, value?: number) => {
    if (typeof value === "number") query.set(key, String(value));
  };

  setTrimmed("name", params.name);
  setNumber("minPrice", params.minPrice);

  const maxPrice =
    typeof params.maxPrice === "number" ? params.maxPrice : params.price;
  setNumber("maxPrice", maxPrice);

  setNumber("categoryId", params.categoryId);
  setTrimmed("variantColor", params.color);
  setTrimmed("variantSize", params.size);
  setNumber("limit", params.limit);
  setNumber("offset", params.offset);

  const queryString = query.toString();
  return queryString ? `?${queryString}` : "";
}

function pickDisplayVariant(variants: ProductVariant[]) {
  if (!variants.length) return null;
  return variants.find((variant) => variant.isActive) ?? variants[0];
}

function normalizeVariant(variant: ProductVariant): ProductVariant {
  return {
    id: variant.id,
    productId: variant.productId,
    color: variant.color ?? null,
    size: variant.size ?? null,
    price: variant.price,
    stock: variant.stock,
    sku: variant.sku,
    img: variant.img ?? null,
    isActive: variant.isActive,
  };
}

function normalizeProduct(product: ProductApi): Product {
  const variants = (product.variants ?? []).map(normalizeVariant);
  const displayVariant = pickDisplayVariant(variants);

  return {
    id: product.id,
    img: displayVariant?.img ?? product.img ?? null,
    name: product.name,
    description: product.description ?? null,
    categoryId: product.categoryId ?? null,
    isActive: product.isActive,
    price: displayVariant?.price ?? 0,
    stock: displayVariant?.stock ?? 0,
    color: displayVariant?.color ?? null,
    size: displayVariant?.size ?? null,
    selectedVariantId: displayVariant?.id,
    variants,
  };
}

function pickFirstNumber(...values: Array<number | undefined>) {
  return values.find((value) => typeof value === "number") ?? null;
}

function pickProducts(response: ProductListApiResponse) {
  return response.products ?? response.data ?? response.items ?? [];
}

function normalizeProductsResponse(
  response: ProductApi[] | ProductListApiResponse
): ProductListResult {
  if (Array.isArray(response)) {
    return {
      products: response.map(normalizeProduct),
      ...EMPTY_LIST_META,
    };
  }

  return {
    products: pickProducts(response).map(normalizeProduct),
    total: pickFirstNumber(
      response.total,
      response.count,
      response.pagination?.total,
      response.pagination?.count,
      response.meta?.total,
      response.meta?.count
    ),
    limit: pickFirstNumber(
      response.limit,
      response.pagination?.limit,
      response.meta?.limit
    ),
    offset: pickFirstNumber(
      response.offset,
      response.pagination?.offset,
      response.meta?.offset
    ),
  };
}

export const productService = {
  getAll: async (params?: ProductQueryParams) => {
    const query = buildProductsQuery(params);
    const response = await fetcher<ProductApi[] | ProductListApiResponse>(
      `/products${query}`
    );
    return normalizeProductsResponse(response);
  },

  getById: async (id: number) => {
    const response = await fetcher<ProductApi>(`/products/${id}`);
    return normalizeProduct(response);
  },

  create: async (data: ProductCreateInput) => {
    const response = await fetcher<ProductCreateApiResponse>("/products", {
      method: "POST",
      body: JSON.stringify(data),
    });

    return normalizeProduct(response.producto);
  },

  update: async (id: number, data: ProductUpdateInput) => {
    const response = await fetcher<ProductUpdateApiResponse>(
      `/products/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
      }
    );

    return normalizeProduct(response.product);
  },

  remove: (id: number) =>
    fetcher<void>(`/products/${id}`, {
      method: "DELETE",
    }),
};
