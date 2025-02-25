//utils
import { useCart } from "../../utils/CartContext";
import { CartProduct } from "../../common/types";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Divider from "@mui/material/Divider";
import "./Cart.css";

export function Cart({ onClose }: { onClose: () => void }) {
  const { cartItems, clearCart } = useCart();

  function CartItemsList() {
    if (cartItems.length === 0) {
      return <li className="product none">No products in Cart.</li>;
    }
    return cartItems.map((product: CartProduct) => (
      <li key={`${product.item.id}-cart`}>
        <div className="product title">{product.item.title}</div>
        <div className="product quantity">(Quantity: {product.quantity})</div>
        <div className="product price">
          ${product.item.price * product.quantity}
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
            onClose();
            clearCart();
          }}
        >
          Checkout ({cartItems.reduce((acc, item) => acc + item.quantity, 0)}{" "}
          items)
        </button>
      </div>
    </aside>
  );
}
