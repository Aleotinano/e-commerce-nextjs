import { UserData } from "./auth";
import { Product } from "./products";
import { Category } from "./category";

export interface AuthContextType {
  user: UserData | null;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  setUser: (user: UserData | null) => void;
}

export interface ProductContextType {
  products: Product[];
  isLoadingProducts: boolean;
  productError: string | null;
  getProducts: () => Promise<void>;
  getProductById: (id: number) => Promise<Product>;
  createProduct: (data: Product) => Promise<Product>;
  updateProduct: (id: number, data: Product) => Promise<Product>;
  removeProduct: (id: number) => Promise<void>;
}

export interface CategoryContextType {
  products: Category[];
  isLoadingCategories: boolean;
  CategoryError: string | null;
  getCategories: () => Promise<void>;
  getCategoryById: (id: number) => Promise<Category>;
  createCategory: (data: Category) => Promise<Category>;
  updateCategory: (id: number, data: Category) => Promise<Category>;
  removeCategory: (id: number) => Promise<void>;
}
