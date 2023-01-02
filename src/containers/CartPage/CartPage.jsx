import { useEffect, useState } from "react";
import CartItem from "../../components/CartItem/CartItem";
import {
  decreaseCartItemQuantity,
  deleteCartItem,
  getCartItemByName,
  increaseCartItemQuantity,
} from "../../services/cart";
import { getAllItems, getItemById, updateItem } from "../../services/items";
import styles from "./CartPage.module.scss";

const CartPage = ({ cartProducts, refreshCart, refreshProducts }) => {
  const [error, setError] = useState(null);

  const [successPurchase, setSuccessPurchase] = useState(false);

  useEffect(() => {
    refreshCart();
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
      refreshCart();
    }
  };

  // Decrease quantityToPurchase func for Cart Item

  const decreaseQuantityToPurchase = async (data) => {
    const cartItem = await getCartItemByName(data.name);
    try {
      if (cartItem && cartItem.quantityToPurchase > 1) {
        await decreaseCartItemQuantity(data.name);

        return;
      } else {
        await deleteCartItem(data.name);
      }
    } catch (err) {
      console.log(err);
    } finally {
      refreshCart();
    }
  };

  // const checkOut = async () => {
  //   const items = await getAllItems();

  //   const p = cartProducts.every((cartItem) => {
  //     return items.some((item) => {
  //       return item.variants.some((variant) => {
  //         if (variant.variant_name === cartItem.name) {
  //           if (variant.quantity >= cartItem.quantityToPurchase) {
  //             return true;
  //           }
  //         }
  //         return false;
  //       });
  //     });
  //   });

  //   console.log(p);
  // };

  // const checkOut = async () => {
  //   try {
  //     const items = await getAllItems();
  //     cartProducts.forEach((item) => {
  //       items.forEach((thing) => {
  //         thing.variants.forEach((variant) => {
  //           if (item.id === variant.variant_name) {
  //             if (item.quantityToPurchase <= variant.quantity) {
  //               console.log("sus");
  //               setSuccessPurchase(true);
  //               deleteCartItem(item.id);

  //               return;
  //             } else {
  //               console.log("errorrr");
  //             }
  //           }
  //         });
  //       });
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setCartRefresh(cartRefresh + 1);
  //   }
  // };

  // const checkOut = async () => {
  //   const items = await getAllItems();
  //   const isAllInStock = cartProducts.every((cartItem) => {
  //     return items.some((item) => {
  //       return item.variants.some((variant) => {
  //         if (cartItem.item === variant.variant_name) {
  //           if (cartItem.quantityToPurchase <= variant.quantity) {
  //             return true;
  //           }
  //         }
  //         return false;
  //       });
  //     });
  //   });
  //   if (isAllInStock) {
  //     console.log("pizza");
  //     setSuccessPurchase(true);
  //     removeCartItems();
  //   }
  //   console.log(isAllInStock);
  // };

  const removeCartItem = async (id) => {
    await deleteCartItem(id);

    refreshCart();
  };

  const checkOut = async () => {
    const items = await getAllItems();
    const variants = items.map((item) => item.variants).flat();

    const isAllInStock = cartProducts.every((cartItem) => {
      return variants.some((variant) => {
        if (
          variant.variant_name === cartItem.name &&
          cartItem.quantityToPurchase <= variant.quantity
        ) {
          return true;
        }
        return false;
      });
    });
    if (isAllInStock) {
      setSuccessPurchase(true);
      await removeCartItems();
      refreshProducts();
    }
  };

  const removeCartItems = async () => {
    await cartProducts.forEach((item) => {
      deleteCartItem(item.id);
    });
    refreshCart();
  };

  const checkOutAndRemoveFromDatabase = async () => {
    const items = await getAllItems();
    const variants = items.map((item) => item.variants).flat();

    const isAllInStock = cartProducts.every((cartItem) => {
      return variants.some((variant) => {
        if (
          variant.variant_name === cartItem.name &&
          cartItem.quantityToPurchase <= variant.quantity
        ) {
          return true;
        }
        return false;
      });
    });

    if (isAllInStock) {
      setSuccessPurchase(true);
      await removeQtyFromDataBase(variants);
      await removeCartItems();
      refreshCart();
      refreshProducts();
    }
  };

  const removeQtyFromDataBase = async (variants) => {
    for (let i = 0; i < cartProducts.length; i++) {
      const newQty =
        variants.find((item) => item.variant_name === cartProducts[i].name)
          .quantity - cartProducts[i].quantityToPurchase;

      const item = await getItemById(cartProducts[i].item_id);
      const index = item.variants.findIndex(
        (element) => element.variant_name === cartProducts[i].name
      );
      item.variants[index].quantity = newQty;

      await updateItem(cartProducts[i].item_id, item);
    }

    // await cartProducts.forEach(async (product) => {
    //   const newQty =
    //     variants.find((item) => item.variant_name === product.name).quantity -
    //     product.quantityToPurchase;
    //   console.log(newQty, "pizza");
    //   const item = await getItemById(product.item_id);
    //   const index = item.variants.findIndex(
    //     (element) => element.variant_name === product.name
    //   );
    //   item.variants[index].quantity = newQty;
    //   console.log(item);
    //   await updateItem(product.item_id, item);
    // });
  };

  return (
    <div className={styles.Container}>
      {!successPurchase ? (
        <>
          <h2 className={styles.Title}>Cart</h2>
          <div className={styles.cartItems}>
            {cartProducts && cartProducts.length > 0 ? (
              cartProducts.map((item) => (
                <CartItem
                  key={item.id}
                  product={item}
                  decreaseQuantityToPurchase={decreaseQuantityToPurchase}
                  increaseQuantityToPurchase={increaseQuantityToPurchase}
                  removeCartItem={removeCartItem}
                />
              ))
            ) : (
              <p>
                {cartProducts && cartProducts.length === 0
                  ? "No items in cart"
                  : "Loading..."}
              </p>
            )}
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
                <button
                  disabled={cartProducts && cartProducts.length === 0}
                  onClick={() => checkOutAndRemoveFromDatabase()}
                >
                  Check Out (Removing from database)
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
