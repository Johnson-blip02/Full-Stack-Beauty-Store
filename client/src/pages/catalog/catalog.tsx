import ProductList from "../../components/ProductList";
import Loading from "../../components/Loading";
import { useAppDispatch, useAppSelector } from "../../util/configureStore";
import { setProductParams } from "../../components/slice/catalogSlice";
import { FormControl, Grid, Paper, Box } from "@mui/material";
import ProductSearch from "../../components/ProductSearch";
import RadioButton from "../../components/RadioButton";
import CheckboxButtons from "../../components/CheckboxButtons";
import PaginationApp from "../../components/PaginationApp";
import UseProducts from "../../Data/hook/useProducts";

const sortingOptions = [
  { value: "priceDesc", label: "Price - High - Low" },
  { value: "price", label: "Price - Low - High" },
  { value: "name", label: "Alphabetical" },
];

export default function Catalog() {
  const { products, brands, category, filtersLoaded, metaData } = UseProducts();
  const dispatch = useAppDispatch();
  const { productParams } = useAppSelector((state) => state.catalog);

  if (!filtersLoaded) return <Loading message="Loading products"></Loading>;

  return (
    <Grid container spacing={4}>
      {/* Move ProductSearch to the top and make it full width */}
      <Grid item xs={12}>
        <Paper sx={{ mb: 2, p: 2 }}>
          <ProductSearch />
        </Paper>
      </Grid>

      {/* Filters on the left side */}
      <Grid item xs={3}>
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

      {/* Product list on the right side */}
      <Grid item xs={9}>
        <ProductList products={products}></ProductList>
      </Grid>

      {/* Pagination below the product list */}
      <Grid item xs={12}>
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
