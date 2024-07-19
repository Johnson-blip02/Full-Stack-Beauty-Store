import ProductList from "./ProductList";
import { useEffect } from "react";
import Loading from "./Loading";
import { useAppDispatch, useAppSelector } from "../util/configureStore";
import {
  fetchFilters,
  fetchProductsAsync,
  productSelectors,
} from "./slice/catalogSlice";
import { FormControl, Grid, Paper } from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButton from "./RadioButton";
import CheckboxButtons from "./CheckboxButtons";
import { setProductParams } from "./slice/catalogSlice";

const sortingOptions = [
  { value: "priceDesc", label: "Price - High - low" },
  { value: "priceAsce", label: "Price - Low - High" },
  { value: "name", label: "Alphabetical" },
];

export default function Catalog() {
  const products = useAppSelector(productSelectors.selectAll);
  const dispatch = useAppDispatch();
  const {
    productsLoaded,
    status,
    filtersLoaded,
    brands,
    category,
    productParams,
  } = useAppSelector((state) => state.catalog);

  useEffect(() => {
    if (!productsLoaded || !filtersLoaded) {
      if (!productsLoaded) dispatch(fetchProductsAsync());
      if (!filtersLoaded) dispatch(fetchFilters());
    }
  }, [productsLoaded, filtersLoaded, dispatch]);

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [productParams, dispatch]);

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setProductParams({ orderBy: event.target.value }));
  };

  const handleBrandChange = (items: string[]) => {
    dispatch(setProductParams({ brands: items }));
  };

  const handleCategoryChange = (items: string[]) => {
    dispatch(setProductParams({ category: items }));
  };

  if (status.includes("pending")) {
    return <Loading message="Loading products" />;
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2 }}>
          <ProductSearch />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <FormControl>
            <RadioButton
              selectOption={productParams.orderBy}
              option={sortingOptions}
              onChange={handleSortChange}
            />
          </FormControl>
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckboxButtons
            items={brands}
            checked={productParams.brands}
            onChange={handleBrandChange}
          />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckboxButtons
            items={category}
            checked={productParams.category}
            onChange={handleCategoryChange}
          />
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products} />
      </Grid>
    </Grid>
  );
}
