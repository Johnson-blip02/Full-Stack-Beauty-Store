import { useEffect, useState } from "react";
import "./App.css";
import { Product } from "./data/products";

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
        PictureURL: "http://something",
        Brand: "Alluze",
        StockQuantity: 200,
        Category: "HAIRCARE",
      },
    ]);
  }

  return (
    <div>
      <h1>Beauty Store</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price}
          </li>
        ))}
      </ul>
      <button onClick={addProduct}>Add Product</button>
    </div>
  );
}

export default App;
