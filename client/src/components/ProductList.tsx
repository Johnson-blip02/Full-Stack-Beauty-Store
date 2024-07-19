import { Grid } from "@mui/material";
import { Product } from "./../Data/product";
import ProductCard from "./ProductCard";
import { useAppSelector } from "../util/configureStore";
import ProductCardSkeleton from "./ProductCardSkeletion";

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  const { productsLoaded } = useAppSelector((state) => state.catalog);
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid item xs={4} key={product.id}>
          {!productsLoaded ? (
            <ProductCardSkeleton />
          ) : (
            <ProductCard product={product}></ProductCard>
          )}
        </Grid>
      ))}
    </Grid>
  );
}
