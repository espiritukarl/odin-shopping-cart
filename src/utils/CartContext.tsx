//react
import { createContext, useContext, useState, ReactNode } from "react";

//utils
import { ProductData, CartContextType, CartProduct } from "../common/types";

const CartContext = createContext<CartContextType | undefined>(undefined);

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

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
