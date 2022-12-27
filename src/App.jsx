import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import { getAllItems } from "./services/items";
import HomePage from "./containers/HomePage/HomePage";
import ProductPage from "./containers/ProductPage/ProductPage";
import CartPage from "./containers/CartPage/CartPage";
import FavouritesPage from "./containers/FavouritesPage/FavouritesPage";
import { getAllCartItems } from "./services/cart";

// Have database with object has property .variation with defaults and colours each have quants
// Two or more item of same items 10% discount when checkout

function App() {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [cartProducts, setCartProducts] = useState(null);
  const [cartRefresh, setCartRefresh] = useState(0);
  const fetchItems = async () => {
    try {
      const data = await getAllItems();
      console.log(data);
      setProducts(data);
    } catch (e) {
      console.log(e);
      setError(e.message);
    }
  };

  const fetchAndSetCartProducts = async () => {
    try {
      const data = await getAllCartItems();
      setCartProducts(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchAndSetCartProducts();
  }, [cartRefresh]);

  useEffect(() => {
    fetchItems();
  }, []);
  return (
    <BrowserRouter>
      <div className="App">
        <Nav cartNum={(cartProducts && cartProducts.length) || 0} />
        <Routes>
          <Route path="/" element={<HomePage products={products} />} />
          <Route
            path="/product/:id"
            element={<ProductPage setCartRefresh={setCartRefresh} />}
          />
          <Route
            path="/cart"
            element={
              <CartPage
                cartProducts={cartProducts}
                setCartRefresh={setCartRefresh}
                cartRefresh={cartRefresh}
              />
            }
          />
          <Route
            path="/favourites"
            element={<FavouritesPage products={products} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
