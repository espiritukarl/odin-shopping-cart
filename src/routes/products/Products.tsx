import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";

// Components
import { Loading } from "../../components/Loading";
import { ProductCard } from "../../components/productCard/ProductCard";
import { Error } from "../error/Error";
import { Nav } from "../../components/navigation/Nav";
import Filter from "../../components/filter/Filter";

// Utils
import { fetchDataAPI } from "../../utils/fetchData";
import { ProductData } from "../../common/types";
import "./Products.css";

export function Products() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [searchProducts, setSearchProducts] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [price, setPrice] = useState<number[]>([0, 0]);
  const [rating, setRating] = useState<number[]>([0, 5]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const { category } = useParams<{ category: string }>();

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const [categoriesData, allCategories] = await Promise.all([
          fetchDataAPI(`products/category/${category}`),
          fetchDataAPI("products/categories"),
        ]);

        if (!allCategories.includes(category)) {
          setError(true);
          return;
        }

        setProducts(categoriesData);
        if (categoriesData.length > 0) {
          const maxPrice = Math.max(
            ...categoriesData.map((p: ProductData) => p.price)
          );
          setPrice([0, maxPrice]);
          setMaxPrice(maxPrice);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  if (loading) return <Loading />;
  if (error) return <Error />;

  // Filter products first before mapping them
  const filteredProducts = products.filter(
    (product) =>
      product.price >= price[0] &&
      product.price <= price[1] &&
      product.rating.rate >= rating[0] &&
      product.rating.rate <= rating[1] &&
      product.title.includes(searchProducts)
  );

  return (
    <>
      <Nav />
      <main className="products">
        <div className="breadcrumb-container">
          <Breadcrumbs
            separator=">"
            aria-label="breadcrumb"
            sx={{ color: "#ffffffcc", fontFamily: "var(--accent-font)" }}
          >
            <Link to="/shop" className="breadcrumb-link">
              Categories
            </Link>
            <span>
              {category!.charAt(0).toUpperCase() + category!.slice(1)}
            </span>
          </Breadcrumbs>
        </div>

        <button onClick={() => setOpen(true)} className="filter-button">
          <FilterAltRoundedIcon width="0.8rem" />
          <span>Filter</span>
        </button>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: "20vw",
              backgroundColor: "var(--graphite-text)",
            },
          }}
        >
          <Filter
            price={price}
            setPrice={setPrice}
            rating={rating}
            setRating={setRating}
            maxPrice={maxPrice}
            searchProducts={searchProducts}
            setSearchProducts={setSearchProducts}
            onClose={() => setOpen(false)}
          />
        </Drawer>

        <div className="products-container">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                product={product}
                key={`${product.title}-product-card`}
              />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </main>
    </>
  );
}
