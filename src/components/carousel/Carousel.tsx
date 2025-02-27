//React
import { useEffect, useState } from "react";

//Components
import { ImageGallery } from "../imageGallery/ImageGallery";

//utils
import type { ImageCarousel, ProductData } from "../../common/types";
import "./Carousel.css";

export function Carousel({ categorizedProducts }: ImageCarousel) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === categorizedProducts.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(intervalId);
  }, [categorizedProducts.length]);

  return (
    <section className="carousel-container">
      <div className="carousel">
        {categorizedProducts.map((product: ProductData[], idx: number) => (
          <div
            className={`image-carousel ${idx === currentIndex ? "active" : ""}`}
            key={`carousel-${idx}`}
          >
            <ImageGallery products={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
