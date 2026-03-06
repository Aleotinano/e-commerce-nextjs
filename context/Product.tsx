"use client";

import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { productService } from "@/services/products.services";
import { ProductContextType } from "@/types/context";
import {
  Product,
  ProductCreateInput,
  ProductFiltersState,
  ProductUpdateInput,
} from "@/types/products";

export const ProductContext = createContext<ProductContextType | null>(null);

type ProductProviderProps = {
  children: React.ReactNode;
};

const PAGE_SIZE = 20;

const INITIAL_FILTERS: ProductFiltersState = {
  name: "",
  price: "",
  categoryId: null,
};

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return "Error desconocido";
}

function parsePriceFilter(value: string) {
  if (!value.trim()) return undefined;
  const parsed = Number(value);
  if (Number.isNaN(parsed) || parsed < 0) return undefined;
  return parsed;
}

export function ProductProvider({ children }: ProductProviderProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [productError, setProductError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ProductFiltersState>(INITIAL_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState<number | null>(null);
  const [hasNextPage, setHasNextPage] = useState(false);

  const getProducts = useCallback(async () => {
    setIsLoadingProducts(true);
    setProductError(null);

    const offset = (currentPage - 1) * PAGE_SIZE;
    const parsedPrice = parsePriceFilter(filters.price);

    try {
      const data = await productService.getAll({
        name: filters.name || undefined,
        maxPrice: parsedPrice,
        categoryId: filters.categoryId ?? undefined,
        limit: PAGE_SIZE,
        offset,
      });

      setProducts(data.products);
      setTotalProducts(data.total);

      const effectiveLimit = data.limit ?? PAGE_SIZE;
      const hasMore =
        typeof data.total === "number"
          ? offset + data.products.length < data.total
          : data.products.length >= effectiveLimit;

      setHasNextPage(hasMore);
    } catch (error) {
      setProductError(getErrorMessage(error));
      setHasNextPage(false);
    } finally {
      setIsLoadingProducts(false);
    }
  }, [currentPage, filters]);

  useEffect(() => {
    void getProducts();
  }, [getProducts]);

  const setNameFilter = useCallback((name: string) => {
    setFilters((prev) => ({ ...prev, name }));
    setCurrentPage(1);
  }, []);

  const setPriceFilter = useCallback((price: string) => {
    setFilters((prev) => ({ ...prev, price }));
    setCurrentPage(1);
  }, []);

  const setCategoryFilter = useCallback((categoryId: number | null) => {
    setFilters((prev) => ({ ...prev, categoryId }));
    setCurrentPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
    setCurrentPage(1);
  }, []);

  const goToNextPage = useCallback(() => {
    setCurrentPage((prev) => (hasNextPage ? prev + 1 : prev));
  }, [hasNextPage]);

  const goToPrevPage = useCallback(() => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  }, []);

  const hasPrevPage = currentPage > 1;

  const getProductById = useCallback(async (id: number) => {
    return productService.getById(id);
  }, []);

  const createProduct = useCallback(
    async (data: ProductCreateInput) => {
      setProductError(null);
      const created = await productService.create(data);
      await getProducts();
      return created;
    },
    [getProducts],
  );

  const updateProduct = useCallback(
    async (id: number, data: ProductUpdateInput) => {
      setProductError(null);
      const updated = await productService.update(id, data);
      await getProducts();
      return updated;
    },
    [getProducts],
  );

  const removeProduct = useCallback(
    async (id: number) => {
      setProductError(null);
      await productService.remove(id);
      await getProducts();
    },
    [getProducts],
  );

  const value = useMemo(
    () => ({
      products,
      isLoadingProducts,
      productError,
      getProducts,
      filters,
      currentPage,
      pageSize: PAGE_SIZE,
      hasNextPage,
      hasPrevPage,
      totalProducts,
      setNameFilter,
      setPriceFilter,
      setCategoryFilter,
      clearFilters,
      goToNextPage,
      goToPrevPage,
      getProductById,
      createProduct,
      updateProduct,
      removeProduct,
    }),
    [
      products,
      isLoadingProducts,
      productError,
      getProducts,
      filters,
      currentPage,
      hasNextPage,
      hasPrevPage,
      totalProducts,
      setNameFilter,
      setPriceFilter,
      setCategoryFilter,
      clearFilters,
      goToNextPage,
      goToPrevPage,
      getProductById,
      createProduct,
      updateProduct,
      removeProduct,
    ],
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}
