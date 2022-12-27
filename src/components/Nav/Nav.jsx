import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Nav.module.scss";

const Nav = ({ cartNum }) => {
  return (
    <nav className={styles.Nav}>
      <div></div>
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/favourites">Favourites</NavLink>
      </div>

      <div>
        <NavLink to="/cart">Cart ({cartNum})</NavLink>
      </div>
    </nav>
  );
};

export default Nav;
