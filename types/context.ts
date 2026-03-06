import { UserData } from "./auth";
import {
  Product,
  ProductCreateInput,
  ProductFiltersState,
  ProductUpdateInput,
} from "./products";
import { Category, CategoryCreateInput, CategoryUpdateInput } from "./category";
import { CartInfo, CartItem } from "./cart";

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
  filters: ProductFiltersState;
  currentPage: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalProducts: number | null;
  setNameFilter: (name: string) => void;
  setPriceFilter: (price: string) => void;
  setCategoryFilter: (categoryId: number | null) => void;
  clearFilters: () => void;
  goToNextPage: () => void;
  goToPrevPage: () => void;
  getProductById: (id: number) => Promise<Product>;
  createProduct: (data: ProductCreateInput) => Promise<Product>;
  updateProduct: (id: number, data: ProductUpdateInput) => Promise<Product>;
  removeProduct: (id: number) => Promise<void>;
}

export interface CategoryContextType {
  categories: Category[];
  isLoadingCategories: boolean;
  categoryError: string | null;
  getCategories: () => Promise<void>;
  getCategoryById: (id: number) => Promise<Category>;
  createCategory: (data: CategoryCreateInput) => Promise<Category>;
  updateCategory: (id: number, data: CategoryUpdateInput) => Promise<Category>;
  removeCategory: (id: number) => Promise<void>;
}

export interface CartContextType {
  cart: CartInfo | null;
  items: CartItem[];
  cartCount: number;
  isLoadingCart: boolean;
  cartError: string | null;
  isCreatingOrder: boolean;
  isCartOpen: boolean;
  getCart: () => Promise<void>;
  addToCart: (variantId: number) => Promise<void>;
  removeFromCart: (variantId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  createOrder: () => Promise<string | null>;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}
