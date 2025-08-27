import { useState } from "react";
import Rating from "@mui/material/Rating";
import Tooltip from "@mui/material/Tooltip";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

//components
import { ProductQuantity } from "../productQuantity/ProductQuantity";

//utils
import { ProductData } from "../../common/types";
import { useCart } from "../../utils/CartContext";
import "./ProductCard.css";
import { Link } from "react-router-dom";

export function ProductCard({ product }: { product: ProductData }) {
  const { addToCart } = useCart();
  const [open, setOpen] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <Link
      to={`/shop/${product.category}/${product.id}`}
      style={{ textDecoration: "none", color: "#000" }}
    >
      <article className="product-card-container">
        <img
          src={product.image.replace(/\._\.jpg$/, '_t.png'}
          alt={`${product.title} image`}
          className="product-img"
        />
        <h4 className="product-title">{product.title}</h4>
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
            setOpen(true);
          }}
          disabled={quantity < 1}
        >
          Add to Cart
        </button>
        <Snackbar
          open={open}
          autoHideDuration={1500}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            severity="success"
            onClose={handleClose}
          >
            Successfully added to Cart!
          </MuiAlert>
        </Snackbar>
      </article>
    </Link>
  );
}
