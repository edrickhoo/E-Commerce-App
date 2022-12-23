import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import { getAllItems } from "./services/items";
import HomePage from "./containers/HomePage/HomePage";
import ProductPage from "./containers/ProductPage/ProductPage";

// Have database with object has property .variation with defaults and colours each have quants
// Two or more item of same items 10% discount when checkout

function App() {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
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

  useEffect(() => {
    fetchItems();
  }, []);
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage products={products} />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
