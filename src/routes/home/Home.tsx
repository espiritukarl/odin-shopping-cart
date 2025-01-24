//react
import { useEffect, useState } from "react";

//Components
import { Loading } from "../../components/Loading";
import { Nav } from "../../components/navigation/Nav";

//utils
import { fetchData } from "../../utils/fetchData";
import type { Product } from "../../common/types";
import "./Home.css";
import { Carousel } from "../../components/carousel/Carousel";

function App() {
  const [productData, setProductData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);

  const [categories, setCategories] = useState<Product["category"][]>([]);

  const loadData = () => {
    setLoading(true);

    Promise.all([
      fetchData("products").then((data) => data),
      fetchData("products/categories").then((data) => data),
    ])
      .then(([productData, categoriesData]) => {
        setProductData(productData);
        setCategories(categoriesData);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const categorizedImages = categories.map((category) => {
    const filteredImages = productData.filter(
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
