// src/context/CartContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";
import { ProductData } from "../common/types";

type CartContextType = {
  cartItems: ProductData[];
  addToCart: (product: ProductData) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<ProductData[]>([]);

  const addToCart = (product: ProductData) => {
    setCartItems((prev) => [...prev, product]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
