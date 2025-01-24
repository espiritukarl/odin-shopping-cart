// Routes
import Home from "./home/Home.tsx";
import { Shop } from "./shop/Shop.tsx";

export const router = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "products/:name",
    element: <Shop />,
  },
];
