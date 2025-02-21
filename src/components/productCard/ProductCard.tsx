//react
import { useState } from "react";
import { Rating } from "react-simple-star-rating";

//components
import { ProductQuantity } from "../productQuantity/ProductQuantity";

//utils
import { ProductData } from "../../common/types";
import { useCart } from "../../utils/CartContext";

export function ProductCard({ product }: { product: ProductData }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(0);
  const roundedValue = (num: number) => Math.round(num * 2) / 2;

  return (
    <article className="product-card-container">
      <h4 className="product-tile">{product.title}</h4>
      <img
        src={product.image}
        alt={`${product.title} image`}
        className="product-img"
      />
      <div className="product-price">{product.price}</div>
      <div className="product-buys-container">
        <div className="product-rating">
          <Rating
            initialValue={roundedValue(product.rating.rate)}
            allowFraction
            readonly
          />
          {product.rating.rate}/5
        </div>
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
        disabled={quantity < 1}
      >
        Add to Cart
      </button>
    </article>
  );
}
