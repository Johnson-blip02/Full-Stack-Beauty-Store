import ProductList from "./ProductList";
import { useEffect } from "react";
import Loading from "./Loading";
import { useAppDispatch, useAppSelector } from "../util/configureStore";
import {
  fetchFilters,
  fetchProductsAsync,
  productSelectors,
  setProductParams,
} from "./slice/catalogSlice";
import { FormControl, Grid, Paper } from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButton from "./RadioButton";
import CheckboxButtons from "./CheckboxButtons";
import PaginationApp from "./PaginationApp";

const sortingOptions = [
  { value: "priceDesc", label: "Price - High - low" },
  { value: "price", label: "Price - Low - High" },
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
    metaData,
  } = useAppSelector((state) => state.catalog);

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilters());
  }, [dispatch, filtersLoaded]);

  if (!filtersLoaded) return <Loading message="Loading products"></Loading>;

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
              onChange={(e) =>
                dispatch(setProductParams({ orderBy: e.target.value }))
              }
            />
          </FormControl>
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckboxButtons
            items={brands}
            checked={productParams.brands}
            onChange={(items: string[]) =>
              dispatch(setProductParams({ brands: items }))
            }
          ></CheckboxButtons>
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckboxButtons
            items={category}
            checked={productParams.category}
            onChange={(items: string[]) =>
              dispatch(setProductParams({ category: items }))
            }
          ></CheckboxButtons>
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products}></ProductList>
      </Grid>

      <Grid item xs={3}></Grid>
      <Grid item xs={9}>
        {metaData && (
          <PaginationApp
            metaData={metaData}
            onChangePage={(page: number) =>
              dispatch(setProductParams({ pageNum: page }))
            }
          />
        )}
      </Grid>
    </Grid>
  );
}
