import React, { useState } from "react";
import ItemGrid from "../ItemGrid/ItemGrid";
import styles from "./HomePage.module.scss";

const HomePage = ({ products }) => {
  const [productsToRender, setProductsToRender] = useState(products);

  const filterItems = (category) => {
    if (category === "all") {
      setProductsToRender(products);
      return;
    }

    setProductsToRender(products.filter((item) => item.category === category));
  };

  return (
    <div>
      Carousel
      <div>
        <div>
          <div className={styles.filterButtons}>
            <button onClick={() => filterItems("all")}>All</button>
            <button onClick={() => filterItems("hat")}>Hats</button>
            <button onClick={() => filterItems("hoodie")}>Hoodies</button>
          </div>
        </div>
        <ItemGrid products={productsToRender} />
      </div>
    </div>
  );
};

export default HomePage;
