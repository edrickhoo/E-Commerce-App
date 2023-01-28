import React, { useState } from "react";
import { useEffect } from "react";
import Carousel from "../../components/Carousel/Carousel";
import ItemGrid from "../ItemGrid/ItemGrid";
import styles from "./HomePage.module.scss";

const HomePage = ({ productsToRender, filterItems }) => {
  return (
    <>
      <div>
        <h3 className={styles.Title}>Featured</h3>
        <Carousel />
      </div>
      <div>
        <div>
          <h3 className={styles.Title}>Products</h3>
          <div className={styles.filterButtons}>
            <button onClick={() => filterItems("all")}>All</button>
            <button onClick={() => filterItems("hat")}>Hats</button>
            <button onClick={() => filterItems("hoodie")}>Hoodies</button>
          </div>
        </div>
        <ItemGrid products={productsToRender} />
      </div>
    </>
  );
};

export default HomePage;
