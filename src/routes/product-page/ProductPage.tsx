import { useParams } from "react-router-dom";

export function ProductPage() {
  const { category, product } = useParams<{
    category: string;
    product: string;
  }>();
  return (
    <div>
      <h2>Category: {category}</h2>
      <h3>Product: {product}</h3>
    </div>
  );
}
