import { Link } from "react-router-dom";

export function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
          <Link to="/products">Shop</Link>
        </li>
        <li></li>
      </ul>
    </nav>
  );
}
