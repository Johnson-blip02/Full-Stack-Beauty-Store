import { useEffect, useState } from "react";
import "./App.css";
import { Product } from "./data/products";
import Catalog from "./components/catalogue/catalog";
import { Typography } from "@mui/material";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:5173/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  function addProduct() {
    setProducts((prevState) => [
      ...prevState,
      {
        id: prevState.length + 100,
        name: "product" + (prevState.length + 1),
        price: prevState.length * 100 + 100,
        PictureURL: "/images/boot-redis1.png",
        Brand: "Alluze",
        StockQuantity: 200,
        Category: "HAIRCARE",
      },
    ]);
  }

  return (
    <div>
      <Typography variant="h1">Beauty Store</Typography>
      <Catalog products={products} addProduct={addProduct}></Catalog>
    </div>
  );
}

export default App;
