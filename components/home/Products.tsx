import { fetcher } from "@/lib/api";
import { Product } from "@/types/products";

export default async function Products() {
  try {
    const products = await fetcher<Product[]>("/products");

    console.log(products);
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
    console.log(error);
    if (error instanceof Error) {
      return <p>{error.message}</p>;
    }
  }
}
