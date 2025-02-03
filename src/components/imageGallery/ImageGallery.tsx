//router
import { Link } from "react-router-dom";

//utils
import type { ProductData } from "../../common/types";
import "./ImageGallery.css";

export function ImageGallery({ products }: { products: ProductData[] }) {
  return (
    <div className="image-gallery">
      {products.slice(0, 4).map((product: ProductData, idx: number) => (
        <Link
          to={`/products/${product.category}/${product.title}`}
          key={`image-gallery-${idx}`}
        >
          <img
            src={product.image}
            alt={`Gallery Image ${idx}`}
            className="carousel-image-gallery"
          />
        </Link>
      ))}
    </div>
  );
}
