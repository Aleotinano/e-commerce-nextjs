// "use client";

// import { createContext, useCallback, useEffect, useMemo, useState } from "react";
// import { categoryService } from "@/services/category.service";
// import { ProductContextType } from "@/types/context";
// import { Product } from "@/types/products";

// export const ProductContext = createContext<ProductContextType | null>(null);

// type ProductProviderProps = {
//   children: React.ReactNode;
// };

// function getErrorMessage(error: unknown) {
//   if (error instanceof Error) return error.message;
//   return "Error desconocido";
// }

// export function ProductProvider({ children }: ProductProviderProps) {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [isLoadingProducts, setIsLoadingProducts] = useState(false);
//   const [productError, setProductError] = useState<string | null>(null);

//   const getProducts = useCallback(async () => {
//     setIsLoadingProducts(true);
//     setProductError(null);

//     try {
//       const data = await categoryService.getAll();
//       setProducts(data);
//     } catch (error) {
//       setProductError(getErrorMessage(error));
//     } finally {
//       setIsLoadingProducts(false);
//     }
//   }, []);

//   useEffect(() => {
//     void getProducts();
//   }, [getProducts]);

//   const getProductById = useCallback(async (id: number) => {
//     return productService.getById(id);
//   }, []);

//   const createProduct = useCallback(
//     async (data: Product) => {
//       setProductError(null);
//       const created = await productService.create(data);
//       await getProducts();
//       return created;
//     },
//     [getProducts]
//   );

//   const updateProduct = useCallback(
//     async (id: number, data: Product) => {
//       setProductError(null);
//       const updated = await productService.update(id, data);
//       await getProducts();
//       return updated;
//     },
//     [getProducts]
//   );

//   const removeProduct = useCallback(
//     async (id: number) => {
//       setProductError(null);
//       await productService.remove(id);
//       await getProducts();
//     },
//     [getProducts]
//   );

//   const value = useMemo(
//     () => ({
//       products,
//       isLoadingProducts,
//       productError,
//       getProducts,
//       getProductById,
//       createProduct,
//       updateProduct,
//       removeProduct,
//     }),
//     [
//       products,
//       isLoadingProducts,
//       productError,
//       getProducts,
//       getProductById,
//       createProduct,
//       updateProduct,
//       removeProduct,
//     ]
//   );

//   return (
//     <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
//   );
// }
