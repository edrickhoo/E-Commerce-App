import React from "react";
import { Link } from "react-router-dom";
import styles from "./Carousel.module.scss";

const Carousel = () => {
  return (
    <div className={styles.Container}>
      <div
        id="carosuelCard"
        className={`carousel slide ${styles.Card}`}
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-target="#carosuelCard"
            data-slide-to="0"
            className="active"
          ></li>
          <li data-target="#carosuelCard" data-slide-to="1"></li>
          <li data-target="#carosuelCard" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <Link to={`/product/3qVySGyXZgX5fW1wqjOR`}>
              <img
                className="d-block w-100"
                src="https://cdn.shopify.com/s/files/1/0033/2660/7409/products/peach-emoji-black-dad-hat-866103_1800x1800.jpg?v=1589014130"
                alt="First slide"
              />
              <div
                className={`carousel-caption ${styles.card_cap} d-none d-md-block`}
              >
                <h5>Peach Emoji Dad Hat</h5>
                <p>$14.99</p>
              </div>
            </Link>
          </div>
          <div className="carousel-item">
            <Link to={`/product/60qH5oadRp4ZCWvT1pqm`}>
              <img
                className="d-block w-100"
                src="https://cdn.shopify.com/s/files/1/0033/2660/7409/products/japanese-koi-fish-grey-hoodie-562251_1800x1800.jpg?v=1650466985"
                alt="Second slide"
              />
              <div
                className={`carousel-caption ${styles.card_cap} d-none d-md-block`}
              >
                <h5>Japanese Koi Fish Hoodie</h5>
                <p>$69.99</p>
              </div>
            </Link>
          </div>
          <div className="carousel-item">
            <Link to={`/product/pds7c0wEJHJ4yaOE0PGA`}>
              <img
                className="d-block w-100"
                src="https://cdn.shopify.com/s/files/1/0033/2660/7409/products/gonthwid-sweat-a-capuche-fin-brode-sty_main-0_2-404830_1800x1800.jpg?v=1643300222"
                alt="Third slide"
              />
              <div
                className={`carousel-caption ${styles.card_cap} d-none d-md-block`}
              >
                <h5>Japanese Great Wave Off Kanagawa Hoodie</h5>
                <p>$69.99</p>
              </div>
            </Link>
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carosuelCard"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carosuelCard"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
};

export default Carousel;
