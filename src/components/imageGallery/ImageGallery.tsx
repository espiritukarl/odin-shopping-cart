//utils
import type { ImageGalleryContainer } from "../../common/types";
import "./ImageGallery.css";

export function ImageGallery({ gallery }: ImageGalleryContainer) {
  return (
    <div className="image-gallery">
      {gallery.map(
        (image: string, idx: number) =>
          idx < 4 && (
            <img
              key={`image-gallery-${idx}`}
              src={image}
              alt={`Gallery Image ${idx}`}
            />
          )
      )}
    </div>
  );
}
