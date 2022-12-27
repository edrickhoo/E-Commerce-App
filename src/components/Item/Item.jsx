import React from "react";
import styles from "./Item.module.scss";
import { Link } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";

const Item = ({ item, favourites, removeFavourite }) => {
  return (
    <div className={styles.item}>
      <div className={styles.item__Img_Container}>
        <Link to={`/product/${item.id}`} style={{ textDecoration: "none" }}>
          <img src={item.variants[0].img} alt="" />
        </Link>
      </div>

      <div className={styles.item__Desc_Container}>
        <Link to={`/product/${item.id}`} style={{ textDecoration: "none" }}>
          <p>{item.name}</p>
        </Link>
        <p>${item.price_per_unit}</p>
      </div>
      {favourites && (
        <button
          className={styles.favouriteButton}
          onClick={() => {
            removeFavourite(item.id, item.favourited);
          }}
        >
          <AiFillHeart color={item.favourited ? "red" : "white"} />
        </button>
      )}
    </div>
  );
};

export default Item;
