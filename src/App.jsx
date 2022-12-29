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
  const [productsToRender, setProductsToRender] = useState(products);
  const fetchItems = async () => {
    try {
      const data = await getAllItems();
      console.log(data);
      setProducts(data);
      setProductsToRender(data);
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
    fetchItems();
  }, []);

  const refreshCart = () => {
    fetchAndSetCartProducts();
  };

  const filterItems = (category) => {
    if (category === "all") {
      setProductsToRender(products);
      return;
    }

    setProductsToRender(products.filter((item) => item.category === category));
  };

  const cartNum =
    (cartProducts &&
      cartProducts.reduce((acc, curr) => acc + curr.quantityToPurchase, 0)) ||
    0;
  return (
    <BrowserRouter>
      <div className="App">
        <Nav cartNum={cartNum} />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                productsToRender={productsToRender}
                filterItems={filterItems}
              />
            }
          />
          <Route
            path="/product/:id"
            element={<ProductPage refreshCart={refreshCart} />}
          />
          <Route
            path="/cart"
            element={
              <CartPage cartProducts={cartProducts} refreshCart={refreshCart} />
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
