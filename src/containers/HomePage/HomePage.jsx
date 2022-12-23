import React from "react";
import ItemGrid from "../ItemGrid/ItemGrid";

const HomePage = ({ products }) => {
  return (
    <div>
      Carousel
      <ItemGrid products={products} />
    </div>
  );
};

export default HomePage;
