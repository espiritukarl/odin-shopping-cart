export type CartProduct = {
  item: ProductData;
  quantity: number;
};

export type CartContextType = {
  cartItems: Array<CartProduct>;
  addToCart: (product: ProductData, quantity: number) => void;
  removeFromCart: (idx: number) => void;
  clearCart: () => void;
};

export type ImageCarousel = {
  categorizedProducts: Array<ProductData[]>;
};

interface Rating {
  rate: number;
  count: number;
}

export interface ProductData {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}
