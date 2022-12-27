import { useEffect, useState } from "react";
import CartItem from "../../components/CartItem/CartItem";
import {
  decreaseCartItemQuantity,
  deleteCartItem,
  getCartItemByName,
  increaseCartItemQuantity,
} from "../../services/cart";
import { getAllItems } from "../../services/items";
import styles from "./CartPage.module.scss";

const CartPage = ({ cartProducts, setCartRefresh, cartRefresh }) => {
  const [error, setError] = useState(null);

  const [successPurchase, setSuccessPurchase] = useState(false);

  useEffect(() => {
    setCartRefresh(cartRefresh + 1);
  }, []);

  // Increase quantityToPurchase func for Cart Item
  const increaseQuantityToPurchase = async (data) => {
    const cartItem = await getCartItemByName(data.id);
    try {
      if (cartItem && cartItem.quantityToPurchase < cartItem.quantity) {
        await increaseCartItemQuantity(data.name, 1);
        return;
      } else if (
        cartItem?.hasOwnProperty("quantity") &&
        cartItem?.quantityToPurchase === cartItem?.quantity
      ) {
        throw new Error(`Sorry no more ${cartItem.name} in stock.`);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setCartRefresh(cartRefresh + 1);
    }
  };

  // Decrease quantityToPurchase func for Cart Item

  const decreaseQuantityToPurchase = async (data) => {
    const cartItem = await getCartItemByName(data.name);
    try {
      console.log(cartItem);
      if (cartItem && cartItem.quantityToPurchase > 1) {
        await decreaseCartItemQuantity(data.name);

        return;
      } else {
        await deleteCartItem(data.name);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setCartRefresh(cartRefresh + 1);
    }
  };

  const checkOut = async () => {
    try {
      const items = await getAllItems();
      cartProducts.forEach((item) => {
        items.forEach((thing) => {
          thing.variants.forEach((variant) => {
            if (item.id === variant.variant_name) {
              if (item.quantityToPurchase <= variant.quantity) {
                console.log("sus");
                setSuccessPurchase(true);
                deleteCartItem(item.id);
                setCartRefresh(cartRefresh + 1);
                return;
              } else {
                console.log("errorrr");
              }
            }
          });
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {!successPurchase ? (
        <>
          <h2>Cart</h2>
          <div className={styles.cartItems}>
            {cartProducts
              ? cartProducts.map((item) => (
                  <CartItem
                    key={item.id}
                    product={item}
                    decreaseQuantityToPurchase={decreaseQuantityToPurchase}
                    increaseQuantityToPurchase={increaseQuantityToPurchase}
                  />
                ))
              : error}
          </div>
          <div className={styles.checkOutContainer}>
            <div>
              <span>
                Total: $
                {cartProducts
                  ? cartProducts
                      .reduce(
                        (acc, curr) =>
                          acc + curr.quantityToPurchase * curr.price_per_unit,
                        0
                      )
                      .toFixed(2)
                  : 0}
              </span>
              <div>
                <button
                  disabled={cartProducts && cartProducts.length === 0}
                  onClick={() => checkOut()}
                >
                  Check Out
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Thank you for your purchase</p>
      )}
    </div>
  );
};

export default CartPage;
