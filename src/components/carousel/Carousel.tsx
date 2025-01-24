//React
import { useEffect, useState } from "react";

//Components
import { ImageGallery } from "../imageGallery/ImageGallery";

//utils
import type { ImageCarousel, ImageGalleryContainer } from "../../common/types";
import "./Carousel.css";

export function Carousel({ images }: ImageCarousel) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

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
          <div
            className={`image-carousel ${idx === currentIndex ? "active" : ""}`}
          >
            <ImageGallery
              gallery={imageGallery.gallery}
              key={`image-carousel-${idx}`}
            />
          </div>
        ))}
      </div>
      <div className="dots-container">
        {images.map((_, idx: number) => (
          <div
            className={currentIndex === idx ? "dot active" : "dot"}
            key={`dot-${idx}`}
          ></div>
        ))}
      </div>
    </main>
  );
}
