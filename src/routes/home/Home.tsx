//react
import { useEffect, useState } from "react";

//Components
import { ImageCarousel } from "../../components/carousel/Carousel";

//utils
import { fetchData } from "../../utils/fetchData";
import type { Product } from "../../common/types";
import "./Home.css";

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
      category,
    };
  });

  if (loading) document.body.style.backgroundColor = "black";
  else document.body.style.backgroundColor = "white";
  return (
    <div>
      <button onClick={() => loadData()}>Click</button>
      {productData.map((product: Product) => {
        return (
          <div>
            <pre key={product.id + product.title}>
              {JSON.stringify(product, null, 4)}
            </pre>
          </div>
        );
      })}
      <ImageCarousel images={categorizedImages} />
    </div>
  );
}

export default App;
