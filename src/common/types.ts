export type ImageGalleryContainer = {
  gallery: Array<string>;
};

export type ImageCarousel = {
  images: Array<ImageGalleryContainer>;
};

interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}
