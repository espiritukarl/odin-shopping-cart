//React
import { useEffect, useState } from "react";

//Components
import { ImageGallery } from "../imageGallery/ImageGallery";

//utils
import type { ImageCarousel, ProductData } from "../../common/types";
import "./Carousel.css";

export function Carousel({ categorizedProducts }: ImageCarousel) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  function nextSlide() {
    currentIndex === categorizedProducts.length - 1
      ? setCurrentIndex(0)
      : setCurrentIndex(currentIndex + 1);
  }

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 5000);
    return () => clearInterval(intervalId);
  }, [currentIndex]);

  return (
    <section className="carousel-container">
      <div className="carousel">
        {categorizedProducts.map((product: ProductData[], idx: number) => (
          <div
            className={`image-carousel ${idx === currentIndex ? "active" : ""}`}
            key={`image-carousel-${product[idx].category}`}
          >
            <ImageGallery products={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
