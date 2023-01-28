import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItemById, updateItemFavourite } from "../../services/items";
import { AiFillHeart } from "react-icons/ai";
import styles from "./ProductPage.module.scss";
import {
  addItemToCart,
  getCartItemByName,
  increaseCartItemQuantity,
} from "../../services/cart";
import SoldOut from "../../components/SoldOut/SoldOut";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductPage = ({ refreshCart }) => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [productGallery, setProductGallery] = useState(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [refresh, setRefresh] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    fetchItemById();
  }, [id, refresh]);

  const getGallery = (data) => {
    const gallery = data.variants.map((item) => {
      return item.img;
    });
    setProductGallery(gallery);
  };

  const fetchItemById = async () => {
    try {
      const data = await getItemById(id);

      getGallery(data);
      setProduct(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChangeSelectedProduct = (idx) => {
    setSelectedProduct(idx);
    setGalleryIndex(idx);
  };

  const handleAddItemToCart = async () => {
    const { price_per_unit } = product;
    const data = {
      price_per_unit,
      quantityToPurchase: 1,
      img: product.variants[selectedProduct].img,
      quantity: product.variants[selectedProduct].quantity,
      name: product.variants[selectedProduct].variant_name,
      item_id: product.id,
    };

    const cartItem = await getCartItemByName(data.name);
    try {
      if (data.quantity === 0) {
        throw new Error(`${cartItem.name} is out of stock`);
      }

      if (cartItem && cartItem.quantityToPurchase < cartItem.quantity) {
        await increaseCartItemQuantity(data.name);
        console.log(toast);
        toast.success(`${cartItem.name} x1 has been add to cart.`, {
          autoClose: 3000,
        });
        refreshCart();
        return;
      } else if (
        cartItem?.hasOwnProperty("quantity") &&
        cartItem?.quantityToPurchase === cartItem?.quantity
      ) {
        throw new Error(`Sorry, we have ${cartItem.quantity || 0} remaining`);
      }
      await addItemToCart(data, data.name);
      console.log("hello");
      toast.success(`${data.name} x1 has been add to cart.`, {
        autoClose: 3000,
      });

      refreshCart();
    } catch (err) {
      console.log(err);
    }
  };

  const hatVariation =
    product?.category === "hat" &&
    product.variants.map((item, idx) => (
      <div
        className={styles.HatVariation}
        key={item.variant_name}
        onClick={() => handleChangeSelectedProduct(idx)}
      >
        <img src={item.img} alt="" />
        {item.quantity === 0 && <SoldOut />}
      </div>
    ));
  const hoddieVariation =
    product?.category === "hoodie" &&
    product.variants.map((item, idx) => (
      <button key={idx} onClick={() => handleChangeSelectedProduct(idx)}>
        <span>{item.size}</span>
      </button>
    ));
  const handleFavouriteToggle = async () => {
    await updateItemFavourite(id, product.favourited);
    setRefresh(refresh + 1);
  };

  return (
    <>
      {product ? (
        <div className={styles.ProductPage}>
          <div className={styles.ImgContainer}>
            {productGallery ? (
              <>
                <img src={productGallery[galleryIndex]} alt="" />
              </>
            ) : (
              <p>Image unavaliable</p>
            )}
            {product.variants[selectedProduct].quantity === 0 && <SoldOut />}
          </div>
          <div className={styles.DetailsContainer}>
            <h2>{product.name}</h2>
            <div className={styles.Price}>${product.price_per_unit}</div>
            <div className={styles.ProductPage_Variants}>
              {hatVariation}
              {hoddieVariation}
            </div>
            <div>
              <button
                disabled={product.variants[selectedProduct].quantity === 0}
                onClick={handleAddItemToCart}
                className={styles.AddCartBtn}
              >
                {product.variants[selectedProduct].quantity === 0
                  ? "Sold Out"
                  : "Add To Cart"}
              </button>
              <button onClick={handleFavouriteToggle}>
                <AiFillHeart color={product.favourited ? "red" : "white"} />
              </button>
              <ToastContainer />
            </div>
            <div>
              <h4 className={styles.ProductDetails}>Product Details</h4>
              <p className={styles.Description}>{product.description}</p>
            </div>
          </div>
        </div>
      ) : (
        error
      )}
    </>
  );
};

export default ProductPage;
