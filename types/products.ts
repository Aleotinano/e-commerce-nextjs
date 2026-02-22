export interface Product {
  img?: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryId?: number;
  isActive: boolean;
  category: string;
}
