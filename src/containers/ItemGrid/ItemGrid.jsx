import React from "react";
import Item from "../../components/Item/Item";
import styles from "./ItemGrid.module.scss";

const ItemGrid = ({ products, favourites, removeFavourite }) => {
  return (
    <div className={styles.ItemGrid}>
      {products ? (
        <div className={styles.Products_Container}>
          {products.map((items) => {
            return (
              //   <React.Fragment key={items.id}>
              //     {items.variants.map((item, idx) => {
              //       return <Item key={idx} item={item} />;
              //     })}
              //   </React.Fragment>
              <Item
                key={items.id}
                item={items}
                favourites={favourites}
                removeFavourite={removeFavourite}
              />
            );
          })}
        </div>
      ) : (
        <div>
          {products && products.length === 0
            ? "All products are sold out"
            : "Loading..."}
        </div>
      )}
    </div>
  );
};

export default ItemGrid;
