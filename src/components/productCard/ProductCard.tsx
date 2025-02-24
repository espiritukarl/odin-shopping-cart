//react
import { useState } from "react";
import { Rating } from "react-simple-star-rating";
import Tooltip from "@mui/material/Tooltip";

//components
import { ProductQuantity } from "../productQuantity/ProductQuantity";

//utils
import { ProductData } from "../../common/types";
import { useCart } from "../../utils/CartContext";
import "./ProductCard.css";

export function ProductCard({ product }: { product: ProductData }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(1);
  const roundedValue = (num: number) => Math.round(num * 2) / 2;

  return (
    <article className="product-card-container">
      <img
        src={product.image}
        alt={`${product.title} image`}
        className="product-img"
      />
      <h4 className="product-tile">{product.title}</h4>
      <div className="product-price">${product.price}</div>
      <div className="product-buys-container">
        <Tooltip
          title={
            <span
              style={{
                fontSize: "1rem",
                padding: "4px",
                display: "block",
              }}
            >
              {product.rating.rate}/5
            </span>
          }
          arrow
          sx={{
            "& .MuiTooltip-tooltip": {
              fontSize: "1rem",
            },
          }}
          placement="top-end"
        >
          <div className="product-rating">
            <Rating
              initialValue={roundedValue(product.rating.rate)}
              showTooltip={false}
              allowFraction
              readonly
            />
          </div>
        </Tooltip>
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
