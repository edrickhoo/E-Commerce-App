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
      console.log(data);

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
    console.log(data, "idid");

    const cartItem = await getCartItemByName(data.name);
    try {
      if (data.quantity === 0) {
        throw new Error(`${cartItem.name} is out of stock`);
      }

      if (cartItem && cartItem.quantityToPurchase < cartItem.quantity) {
        await increaseCartItemQuantity(data.name);
        refreshCart();
        return;
      } else if (
        cartItem?.hasOwnProperty("quantity") &&
        cartItem?.quantityToPurchase === cartItem?.quantity
      ) {
        throw new Error(`Sorry, we have ${cartItem.quantity || 0} remaining`);
      }

      console.log("yosh");
      await addItemToCart(data, data.name);
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
        key={idx}
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
    <div>
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
            <span>${product.price_per_unit}</span>
            <div className={styles.ProductPage_Variants}>
              {hatVariation}
              {hoddieVariation}
            </div>
            <div>
              <button
                disabled={product.variants[selectedProduct].quantity === 0}
                onClick={handleAddItemToCart}
              >
                {product.variants[selectedProduct].quantity === 0
                  ? "Sold Out"
                  : "Add To Cart"}
              </button>
              <button onClick={handleFavouriteToggle}>
                <AiFillHeart color={product.favourited ? "red" : "white"} />
              </button>
            </div>
            <div>
              <h4>Product Details</h4>
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      ) : (
        error
      )}
    </div>
  );
};

export default ProductPage;
