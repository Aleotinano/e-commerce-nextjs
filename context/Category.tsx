"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { categoryService } from "@/services/category.service";
import { CategoryContextType } from "@/types/context";
import { CategoryCreateInput, CategoryUpdateInput, Category } from "@/types/category";

export const CategoryContext = createContext<CategoryContextType | null>(null);

type CategoryProviderProps = {
  children: React.ReactNode;
};

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return "Error desconocido";
}

export function CategoryProvider({ children }: CategoryProviderProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [categoryError, setCategoryError] = useState<string | null>(null);

  const getCategories = useCallback(async () => {
    setIsLoadingCategories(true);
    setCategoryError(null);

    try {
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (error) {
      setCategoryError(getErrorMessage(error));
    } finally {
      setIsLoadingCategories(false);
    }
  }, []);

  useEffect(() => {
    void getCategories();
  }, [getCategories]);

  const getCategoryById = useCallback(async (id: number) => {
    return categoryService.getById(id);
  }, []);

  const createCategory = useCallback(
    async (data: CategoryCreateInput) => {
      setCategoryError(null);
      const created = await categoryService.create(data);
      await getCategories();
      return created;
    },
    [getCategories]
  );

  const updateCategory = useCallback(
    async (id: number, data: CategoryUpdateInput) => {
      setCategoryError(null);
      const updated = await categoryService.update(id, data);
      await getCategories();
      return updated;
    },
    [getCategories]
  );

  const removeCategory = useCallback(
    async (id: number) => {
      setCategoryError(null);
      await categoryService.remove(id);
      await getCategories();
    },
    [getCategories]
  );

  const value = useMemo(
    () => ({
      categories,
      isLoadingCategories,
      categoryError,
      getCategories,
      getCategoryById,
      createCategory,
      updateCategory,
      removeCategory,
    }),
    [
      categories,
      isLoadingCategories,
      categoryError,
      getCategories,
      getCategoryById,
      createCategory,
      updateCategory,
      removeCategory,
    ]
  );

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
}
