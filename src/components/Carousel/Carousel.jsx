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
                src="https://i.etsystatic.com/21984665/r/il/01b1b1/2140413076/il_794xN.2140413076_j23p.jpg"
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
                src="https://i.etsystatic.com/21984665/r/il/01b1b1/2140413076/il_794xN.2140413076_j23p.jpg"
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
                src="https://i.ebayimg.com/images/g/8RcAAOSwtgtj8XLJ/s-l1600.jpg"
                alt="Third slide"
              />
              <div
                className={`carousel-caption ${styles.card_cap} d-none d-md-block`}
              >
                <h5>Japanese Dragon Hoodie</h5>
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
