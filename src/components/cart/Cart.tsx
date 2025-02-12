//utils
import { useCart } from "../../utils/CartContext";
import { CartProduct } from "../../common/types";

export function Cart() {
  const { cartItems } = useCart();
  return (
    <aside className="cart-container">
      <h2>My Cart:</h2>
      <ul>
        {cartItems.map((product: CartProduct) => (
          <li key={`${product.item.id}-cart`}>
            {product.item.title} ({product.quantity})
          </li>
        ))}
      </ul>
      <div className="cart-checkout">
        <div className="cart-quantity">
          Total Items: {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        </div>
        <button className="checkout">Checkout</button>
      </div>
    </aside>
  );
}
