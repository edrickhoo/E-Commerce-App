import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Nav.module.scss";

const Nav = () => {
  return (
    <nav className={styles.Nav}>
      <div></div>
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink>Favourites</NavLink>
      </div>

      <div>
        <NavLink>Cart</NavLink>
      </div>
    </nav>
  );
};

export default Nav;
