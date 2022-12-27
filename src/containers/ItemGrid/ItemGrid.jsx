import React from "react";
import Item from "../../components/Item/Item";
import styles from "./ItemGrid.module.scss";

const ItemGrid = ({ products, favourites, removeFavourite }) => {
  console.log(products);
  return (
    <div>
      <h3>Products</h3>

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
        <div>All products are sold out</div>
      )}
    </div>
  );
};

export default ItemGrid;
