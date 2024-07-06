import { useEffect, useState } from "react";
import "./App.css";
import { Product } from "./Data/product";
import Catalog from "./components/catalog";
import { Typography } from "@mui/material";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  function addProducts() {
    setProducts((prevState) => [
      ...prevState,
      {
        id: prevState.length + 101,
        name: "product" + (prevState.length + 1),
        price: prevState.length * 100 + 100,
        pictureUrl: "https://",
        brand: "Cala",
        stockQuantity: 20,
        category: "HAIRCARE",
      },
    ]);
  }

  return (
    <div>
      <Typography variant="h1">Beauty Store</Typography>
      <Catalog products={products} addProduct={addProducts}></Catalog>
    </div>
  );
}

export default App;
