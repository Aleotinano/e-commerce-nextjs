import { fetcher } from "@/lib/api";
import { Product } from "@/types/products";

export default async function Products() {
  try {
    const products = await fetcher<Product[]>("/products");

    return (
      <ul>
        {products.map((product) => (
          <li key={product.name}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    );
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Debes iniciar sesión") {
        return <p>No estás logueado</p>;
      }

      return <p>Error: {error.message}</p>;
    }

    return <p>Error desconocido</p>;
  }
}
