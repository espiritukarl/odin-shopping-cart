//utils
import { useCart } from "../../utils/CartContext";
import { ProductData } from "../../common/types";

export function Cart() {
  const { cartItems } = useCart();
  return (
    <aside className="cart-container">
      <h2>My Cart:</h2>
      <ul>
        {cartItems.map((item: ProductData) => (
          <li key={`${item.id}-cart`}>{item.title}</li>
        ))}
      </ul>
      <div className="cart-checkout">
        <div className="cart-quantity">Quantity: {cartItems.length}</div>
        <button className="checkout">Checkout</button>
      </div>
    </aside>
  );
}
