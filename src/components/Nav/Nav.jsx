import { NavLink } from "react-router-dom";
import styles from "./Nav.module.scss";
import { FaShoppingCart } from "react-icons/fa";

const Nav = ({ cartNum }) => {
  return (
    <header className={styles.container}>
      <nav className={styles.Nav}>
        <div>
          <NavLink to="/">Home</NavLink>
        </div>
        <div className={styles.Favourites}>
          <NavLink to="/favourites">Favourites</NavLink>
        </div>

        <div>
          <NavLink className={styles.cart_container} to="/cart">
            Cart <FaShoppingCart className={styles.cart_icon} /> ({cartNum})
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
