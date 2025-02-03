export type ImageCarousel = {
  categorizedProducts: Array<ProductData[]>;
};

interface Rating {
  rate: number;
  count: number;
}

export interface ProductCardData {
  title: string;
  image: string;
  rating: Rating;
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
