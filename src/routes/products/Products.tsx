//react & router
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

//Components
import { Loading } from "../../components/Loading";
import { ProductCard } from "../../components/productCard/ProductCard";
import { Error } from "../error/Error";

//utils
import { fetchDataAPI } from "../../utils/fetchData";
import { ProductData } from "../../common/types";
import { Nav } from "../../components/navigation/Nav";
import "./Products.css";

export function Products() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { category } = useParams<{ category: string }>();

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const [categoriesData, allCategories] = await Promise.all([
          fetchDataAPI(`products/category/${category}`),
          fetchDataAPI("products/categories"),
        ]);
        setProducts(categoriesData);
        if (!allCategories.includes(category)) setError(true);
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [category]);

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      <Nav />
      <Link to="/shop" className="back-link">
        &larr; Back to Categories
      </Link>
      {products.map((product) => (
        <ProductCard product={product} key={`${product.title}-product-card`} />
      ))}
    </>
  );
}
