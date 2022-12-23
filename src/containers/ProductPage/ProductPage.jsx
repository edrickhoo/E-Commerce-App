import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItemById } from "../../services/items";

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  console.log(id);
  const fetchItemById = async () => {
    try {
      const data = await getItemById(id);
      console.log(data);
      setProduct(data);
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    fetchItemById();
  }, [id]);

  return <div>{product ? <>{product.name}</> : "No product found"}</div>;
};

export default ProductPage;
