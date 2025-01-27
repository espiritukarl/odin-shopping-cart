//react
import { useEffect, useState } from "react";

//Components
import { Loading } from "../../components/Loading";
import { Nav } from "../../components/navigation/Nav";

//utils
import { fetchProducts, fetchCategories } from "../../utils/fetchData";
import type { Product } from "../../common/types";
import "./Home.css";
import { Carousel } from "../../components/carousel/Carousel";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Product["category"][]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ]);

        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const categorizedImages = categories.map((category) => {
    const filteredImages = products.filter(
      (product) => product.category === category
    );
    return {
      gallery: filteredImages.map((product) => product.image),
    };
  });

  if (loading) return <Loading />;
  return (
    <>
      <Nav />
      <Carousel images={categorizedImages} />
    </>
  );
}

export default App;
