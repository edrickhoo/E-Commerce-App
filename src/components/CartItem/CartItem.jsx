import React from "react";
import styles from "./CartItem.module.scss";

const CartItem = ({
  product,
  decreaseQuantityToPurchase,
  increaseQuantityToPurchase,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.img}>
        <img src={product.img} alt={product.name} />
      </div>
      <div className={styles.details}>
        <h3>{product.name}</h3>
        <h4>black</h4>
        <div>
          <span>${product.price_per_unit}</span>
          <div>
            <button onClick={() => decreaseQuantityToPurchase(product)}>
              -
            </button>
            <span>{product.quantityToPurchase}</span>
            <button onClick={() => increaseQuantityToPurchase(product)}>
              +
            </button>
          </div>
        </div>
      </div>
      <div className={styles.priceDetails}>
        <div>
          Product Total: $
          {(product.quantityToPurchase * product.price_per_unit).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
