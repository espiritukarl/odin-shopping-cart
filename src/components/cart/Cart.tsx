import { useState } from "react";

//utils
import { useCart } from "../../utils/CartContext";
import { CartProduct } from "../../common/types";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Divider from "@mui/material/Divider";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "./Cart.css";

export function Cart() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  function CartItemsList() {
    if (cartItems.length === 0) {
      return <li className="product none">No products in Cart.</li>;
    }
    return cartItems.map((product: CartProduct, idx: number) => (
      <li key={`${product.item.id}-cart`} className="cart-item">
        <div className="product title">{product.item.title}</div>
        <div className="product quantity">(Quantity: {product.quantity})</div>
        <div className="product price">
          ${product.item.price * product.quantity}
        </div>
        <div className="remove-cart-button" onClick={() => removeFromCart(idx)}>
          <DeleteOutlineIcon color="error" />
        </div>
      </li>
    ));
  }
  return (
    <aside className="cart-container">
      <div className="cart-items">
        <h2>
          <ShoppingCartIcon /> My Cart:
        </h2>
        <Divider sx={{ my: 3 }} />
        <ul>
          <CartItemsList />
        </ul>
      </div>
      <div className="cart-checkout">
        <div className="cart-price">
          <Divider sx={{ my: 3 }} />
          <div className="label">Total Price: </div>
          <div className="total">
            $
            {cartItems.reduce(
              (acc, item) => acc + item.item.price * item.quantity,
              0
            )}
          </div>
        </div>
        <button
          className="checkout"
          disabled={cartItems.length === 0}
          onClick={() => {
            setOpen(true);
            clearCart();
          }}
        >
          Checkout ({cartItems.reduce((acc, item) => acc + item.quantity, 0)}{" "}
          items)
        </button>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="success"
          onClose={handleClose}
        >
          Successfully Checked Out!
        </MuiAlert>
      </Snackbar>
    </aside>
  );
}
