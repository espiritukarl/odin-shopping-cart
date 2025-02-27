//react
import { useEffect, useState } from "react";

//Components
import { Loading } from "../../components/Loading";
import { Nav } from "../../components/navigation/Nav";
import { Carousel } from "../../components/carousel/Carousel";

//utils
import { fetchDataAPI } from "../../utils/fetchData";
import type { ProductData } from "../../common/types";
import "./Home.css";

function App() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [categories, setCategories] = useState<ProductData["category"][]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    Promise.all([fetchDataAPI("products"), fetchDataAPI("products/categories")])
      .then(
        ([productsData, categoriesData]: [
          categoriesData: ProductData[],
          allCategories: ProductData["category"][]
        ]) => {
          setProducts(productsData);
          setCategories(categoriesData);
        }
      )
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  const categorizedProducts = categories.map((category) =>
    products.filter((p) => p.category === category)
  );

  if (loading) return <Loading />;
  return (
    <>
      <Nav />
      <main className="hero-content">
        <div className="hero-text">
          <div className="hero-headline">SMARTSHOPPING</div>
          <div className="hero-subhead">STARTS HERE</div>
          <h1>
            Quality Meets
            <br />
            <span className="highlight">Extraordinary Value</span>
          </h1>
          <p>
            Daily deals from electronics to everyday essentials
            <br />– all in one trusted marketplace
          </p>
        </div>
        <Carousel categorizedProducts={categorizedProducts} />
      </main>
    </>
  );
}

export default App;
