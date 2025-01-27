//utils
import type { ImageGalleryContainer } from "../../common/types";
import "./ImageGallery.css";

export function ImageGallery({ gallery }: ImageGalleryContainer) {
  return (
    <div className="image-gallery">
      {gallery.map((image, idx) => (
        <img
          key={`image-gallery-${idx}`}
          src={image}
          alt={`Gallery Image ${idx}`}
        />
      ))}
    </div>
  );
}
