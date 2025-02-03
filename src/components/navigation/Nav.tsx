//react & router
import { useState } from "react";
import { Link } from "react-router-dom";

//components
import { Cart } from "../cart/Cart";

//utils
import { useCart } from "../../utils/CartContext";

export function Nav() {
  const [showCart, setShowCart] = useState<boolean>(false);
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
      <div className="cart" onClick={() => setShowCart(!showCart)}>
        CART ({cartItems.length})
      </div>
      {showCart && <Cart />}
    </nav>
  );
}
