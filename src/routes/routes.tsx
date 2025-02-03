// Routes
import Home from "./home/Home.tsx";
import { Shop } from "./shop/Shop.tsx";
import { Products } from "./products/Products.tsx";
import { Error } from "./error/Error.tsx";

export const router = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "shop",
    element: <Shop />,
  },
  {
    path: "shop/:category",
    element: <Products />,
  },
  {
    path: "*", // Handle invalid categories
    element: <Error />,
  },
];
