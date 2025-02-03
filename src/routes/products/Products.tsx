//react & router
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//Components
import { Loading } from "../../components/Loading";
import { ProductCard } from "../../components/productCard/ProductCard";

//utils
import { fetchDataAPI } from "../../utils/fetchData";
import { ProductData } from "../../common/types";
import { Nav } from "../../components/navigation/Nav";
import "./Products.css";

export function Products() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { category } = useParams<{ category: string }>();

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const categoriesData = await fetchDataAPI(
          `products/category/${category}`
        );
        setProducts(categoriesData);
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [category]);

  if (loading) <Loading />;

  return (
    <>
      <Nav />
      {products.map((product) => (
        <ProductCard product={product} key={`${product.title}-product-card`} />
      ))}
    </>
  );
}
