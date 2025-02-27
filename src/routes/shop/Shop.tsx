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

    fetchDataAPI("products/categories")
      .then((categoriesData: ProductData["category"][]) =>
        setCategories(categoriesData)
      )
      .catch((error) => console.error("Error: ", error))
      .finally(() => setLoading(false));
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
              className={`shop-categories ${
                category.split(" ").length > 1
                  ? category.split(" ")[0].match(/\bmen\b|\bwomen\b/)?.[0] || ""
                  : category
              }`}
            >
              {category}
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
