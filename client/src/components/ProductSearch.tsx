import { debounce, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../util/configureStore";
import { setProductParams } from "./slice/catalogSlice";
import { useMemo, useState } from "react";

export default function ProductSearch() {
  const { productParams } = useAppSelector((state) => state.catalog);
  const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
  const dispatch = useAppDispatch();

  // const debouncedSearch = debounce((event: any) => {
  //   dispatch(setProductParams({ searchTerm: event.target.value }));
  // }, 2000);
  const debouncedSearch = useMemo(
    () =>
      debounce((event: any) => {
        dispatch(setProductParams({ searchTerm: event.target.value }));
      }, 1000),
    [dispatch]
  );

  return (
    <TextField
      label="Search"
      variant="outlined"
      fullWidth
      value={searchTerm || ""}
      onChange={(event: any) => {
        setSearchTerm(event.target.value);
        debouncedSearch(event);
      }}
    ></TextField>
  );
}
