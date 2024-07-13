import { Fragment } from "react/jsx-runtime";
import { Product } from "../Data/product";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";
import agent from "../router/api/agent";
import Loading from "./Loading";

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Catalog.list()
      .then((products) => setProducts(products))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading message="Loading products"></Loading>;

  return (
    <Fragment>
      <ProductList products={products}></ProductList>
    </Fragment>
  );
}
