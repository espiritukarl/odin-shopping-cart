import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Nav } from "../../components/navigation/Nav";
import { fetchDataAPI } from "../../utils/fetchData";
import type { Product } from "../../common/types";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import "./ProductPage.css";

export function ProductPage() {
  const { category, product } = useParams<{
    category: string;
    product: string;
  }>();
  const [productData, setProductData] = useState<Product | null>(null);

  useEffect(() => {
    fetchDataAPI(`products/${product}`)
      .then((data: Product) => setProductData(data))
      .catch((err) => console.error("Failed to fetch product: ", err));
  }, [category, product]);

  if (!productData) return <p>Loading...</p>;

  return (
    <>
      <Nav />
      <main className="product-page">
        <div className="breadcrumb-container">
          <Breadcrumbs
            separator=">"
            aria-label="breadcrumb"
            sx={{ fontFamily: "var(--accent-font)" }}
          >
            <Link to="/shop" className="breadcrumb-link">
              Categories
            </Link>
            <span>
              {category!.charAt(0).toUpperCase() + category!.slice(1)}
            </span>
          </Breadcrumbs>
        </div>
        <div className="product-container">
          <div className="product-card">
            <img
              src={productData.image}
              alt={productData.title}
              className="product-image"
            />
            <div className="product-details">
              <h2 className="product-title">{productData.title}</h2>
              <p className="product-price">${productData.price}</p>
              <p className="product-description">{productData.description}</p>
              <Link to={`/shop/${category}`} className="back-button">
                ← Back to{" "}
                {category
                  ?.split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
