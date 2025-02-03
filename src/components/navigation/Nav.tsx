//router
import { Link } from "react-router-dom";

//utils
import { useCart } from "../../utils/CartContext";

export function Nav() {
  const { cartItems } = useCart();
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/shop">Shop</Link>
        </li>
      </ul>
      <div className="cart">CART {cartItems.length}</div>
    </nav>
  );
}
