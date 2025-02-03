import { ProductData } from "../../common/types";

export function ProductCard({ product }: { product: ProductData }) {
  return (
    <article className="product-card-container">
      <h4 className="product-tile">{product.title}</h4>
      <img
        src={product.image}
        alt={`${product.title} image`}
        className="product-img"
      />
      <div className="product-buys-container">
        <div className="product-rating">{product.rating.rate}</div>
        <div className="product-amount-bought">{product.rating.count}</div>
      </div>
    </article>
  );
}
