import React from "react";
import styles from "./Item.module.scss";
import { Link } from "react-router-dom";

const Item = ({ item }) => {
  return (
    <div className={styles.item}>
      <Link to={`/product/${item.id}`} style={{ textDecoration: "none" }}>
        <div className={styles.item__Img_Container}>
          <img src={item.variants[0].img} alt="" />
        </div>
      </Link>
      <div className={styles.item__Desc_Container}>
        <Link to={`/product/${item.id}}`} style={{ textDecoration: "none" }}>
          <p>{item.name}</p>
        </Link>
        <p>${item.price_per_unit}</p>
      </div>
    </div>
  );
};

export default Item;
