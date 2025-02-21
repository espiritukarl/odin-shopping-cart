//react or route
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Shop.css";

//Components
import { Nav } from "../../components/navigation/Nav";
import { Loading } from "../../components/Loading";

//utils
import { fetchDataAPI } from "../../utils/fetchData";
import { ProductData } from "../../common/types";

export function Shop() {
  const [categories, setCategories] = useState<ProductData["category"][]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const categoriesData = await fetchDataAPI("products/categories");
        setCategories(categoriesData);
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <Nav />
      <main className="shop">
        <div className="shop-layout">
          {categories.map((category: ProductData["category"]) => (
            <Link
              to={category}
              key={`shop-layout-${category}`}
              className="shop-categories"
            >
              {category}
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
