import { useEffect } from "react";
import {
  productSelectors,
  fetchProductsAsync,
  fetchFilters,
} from "../../components/slice/catalogSlice";
import { useAppSelector, useAppDispatch } from "../../util/configureStore";

export default function UseProducts() {
  const products = useAppSelector(productSelectors.selectAll);
  const dispatch = useAppDispatch();
  const { productsLoaded, filtersLoaded, brands, category, metaData } =
    useAppSelector((state) => state.catalog);

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilters());
  }, [dispatch, filtersLoaded]);

  return {
    products,
    productsLoaded,
    filtersLoaded,
    brands,
    category,
    metaData,
  };
}
