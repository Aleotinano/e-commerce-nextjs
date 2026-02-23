"use client";

import { useProducts } from "@/context/useProducts";

export const Products = () => {
  const { products, isLoadingProducts, productError } = useProducts();

  if (isLoadingProducts) return <p>Cargando productos...</p>;
  if (productError) return <p>{productError}</p>;
  if (!products.length) return <p>No hay productos disponibles.</p>;

  return (
    <ul>
      {products.map((product, index) => (
        <li key={`${product.name}-${index}`}>
          {product.name} - ${product.price}
        </li>
      ))}
    </ul>
  );
};
