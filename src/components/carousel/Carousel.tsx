//React
import { useEffect, useState } from "react";

//Components
import { ImageGallery } from "../imageGallery/ImageGallery";

//utils
import type { ImageCarousel, ImageGalleryContainer } from "../../common/types";
import "./Carousel.css";

export function ImageCarousel({ images }: ImageCarousel) {
  const [currentIndex, setCurrentIndex] = useState(0);

  function nextSlide() {
    currentIndex === images.length - 1
      ? setCurrentIndex(0)
      : setCurrentIndex(currentIndex + 1);
  }

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 5000);
    return () => clearInterval(intervalId);
  }, [currentIndex]);

  return (
    <main className="carousel-container">
      <div className="carousel">
        {images.map((imageGallery: ImageGalleryContainer, idx: number) => (
          <ImageGallery
            gallery={imageGallery.gallery}
            key={`image-carousel-${idx}`}
            className={idx === currentIndex ? "active" : ""}
          />
        ))}
      </div>
      <div className="dots-container">
        {images.map((_, idx: number) => (
          <div className={currentIndex === idx ? "dot active" : "dot"}></div>
        ))}
      </div>
    </main>
  );
}
