import { Link } from "react-router-dom";
import styles from "./CartItem.module.scss";

const CartItem = ({
  product,
  decreaseQuantityToPurchase,
  increaseQuantityToPurchase,
  removeCartItem,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.img}>
        <Link to={`/product/${product.item_id}`}>
          <img src={product.img} alt={product.name} />
        </Link>
      </div>
      <div className={styles.details}>
        <Link to={`/product/${product.item_id}`}>
          <h3>{product.name}</h3>
        </Link>

        <div className={styles.PricePerUnit}>${product.price_per_unit}</div>
        <div>
          <button onClick={() => decreaseQuantityToPurchase(product)}>-</button>
          <span className={styles.PurchaseQty}>
            {product.quantityToPurchase}
          </span>
          <button onClick={() => increaseQuantityToPurchase(product)}>+</button>
        </div>
        <div>
          <p>Stock: {product.quantity}</p>
        </div>
      </div>
      <div className={styles.priceDetails}>
        <div className={styles.TotalPrice}>
          Product Total: $
          {(product.quantityToPurchase * product.price_per_unit).toFixed(2)}
        </div>
        <button onClick={() => removeCartItem(product.id)}>
          Remove From Cart
        </button>
      </div>
    </div>
  );
};

export default CartItem;
