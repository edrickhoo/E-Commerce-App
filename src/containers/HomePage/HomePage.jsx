import React, { useState } from "react";
import { useEffect } from "react";
import ItemGrid from "../ItemGrid/ItemGrid";
import styles from "./HomePage.module.scss";

const HomePage = ({ productsToRender, filterItems }) => {
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
