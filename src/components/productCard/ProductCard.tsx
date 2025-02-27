//react
import { useState } from "react";
import Rating from "@mui/material/Rating";
import Tooltip from "@mui/material/Tooltip";

//components
import { ProductQuantity } from "../productQuantity/ProductQuantity";

//utils
import { ProductData } from "../../common/types";
import { useCart } from "../../utils/CartContext";
import "./ProductCard.css";
import { Link } from "react-router-dom";

export function ProductCard({ product }: { product: ProductData }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <Link
      to={`/shop/${product.category}/${product.id}`}
      style={{ textDecoration: "none" }}
    >
      <article className="product-card-container">
        <img
          src={product.image}
          alt={`${product.title} image`}
          className="product-img"
        />
        <h4 className="product-tile">{product.title}</h4>
        <div className="product-price">${product.price}</div>
        <div className="product-buys-container">
          <Tooltip title={`${product.rating.rate}/5`} arrow placement="top-end">
            <div className="product-rating">
              <Rating
                defaultValue={product.rating.rate}
                precision={0.2}
                readOnly
                sx={{ fontSize: "2rem" }}
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
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart(product, quantity);
          }}
          disabled={quantity < 1}
        >
          Add to Cart
        </button>
      </article>
    </Link>
  );
}
