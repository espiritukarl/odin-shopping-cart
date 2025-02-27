//react
import { useState, ReactNode } from "react";

//utils
import { ProductData, CartProduct } from "../common/types";
import { CartContext } from "./CartContext";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);

  const addToCart = (product: ProductData, quantity: number) => {
    setCartItems((prev) => [...prev, { item: product, quantity: quantity }]);
  };

  const removeFromCart = (idx: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== idx));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
