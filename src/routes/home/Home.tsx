//react
import { useEffect, useState } from "react";

//Components
import { Loading } from "../../components/Loading";
import { Nav } from "../../components/navigation/Nav";

//utils
import { fetchProducts, fetchCategories } from "../../utils/fetchData";
import type { ProductData } from "../../common/types";
import "./Home.css";
import { Carousel } from "../../components/carousel/Carousel";

function App() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [categories, setCategories] = useState<ProductData["category"][]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown | null>(null);

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
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const categorizedProducts = categories.map((category) =>
    products.filter((p) => p.category === category)
  );

  if (loading) return <Loading />;
  // if (error) return <Error />;
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
