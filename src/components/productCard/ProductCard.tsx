//react
import { useState } from "react";

//components
import { ProductQuantity } from "../productQuantity/ProductQuantity";

//utils
import { ProductData } from "../../common/types";
import { useCart } from "../../utils/CartContext";

export function ProductCard({ product }: { product: ProductData }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(0);

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
      <ProductQuantity
        productClass="nothing"
        quantity={quantity}
        setQuantity={setQuantity}
      />
      <button
        className="add-to-cart"
        onClick={() => addToCart(product, quantity)}
      >
        Add to Cart
      </button>
    </article>
  );
}
