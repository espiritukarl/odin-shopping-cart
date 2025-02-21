//react & router
import { useState } from "react";
import { Link } from "react-router-dom";

//components
import { Cart } from "../cart/Cart";

//utils
import { CartProduct } from "../../common/types";
import { useCart } from "../../utils/CartContext";
import "./Nav.css";

//MUI
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const CartBadge = ({ cartItems }: { cartItems: CartProduct[] }) => {
  return (
    <IconButton color="inherit">
      <Badge
        badgeContent={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        color="primary"
        showZero
      >
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
};

export function Nav() {
  const [showCart, setShowCart] = useState<boolean>(false);
  const { cartItems } = useCart();
  return (
    <nav className="navigation-container">
      <ul>
        <li className="navigation-links">
          <Link to="/">Home</Link>
        </li>
        <li className="navigation-links">
          <Link to="/shop">Shop</Link>
        </li>
      </ul>
      <div className="cart" onClick={() => setShowCart(!showCart)}>
        <CartBadge cartItems={cartItems} />
      </div>
      {showCart && <Cart />}
    </nav>
  );
}
