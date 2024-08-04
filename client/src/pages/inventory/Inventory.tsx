import {
  Typography,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import UseProducts from "../../Data/hook/useProducts";
import { useAppDispatch } from "../../util/configureStore";
import PaginationApp from "../../components/PaginationApp";
import {
  removeProduct,
  setPageNumber,
} from "../../components/slice/catalogSlice";
import { useState } from "react";
import InventoryForm from "./InventoryForm";
import { Product } from "../../Data/product";
import agent from "../../router/api/agent";
import { LoadingButton } from "@mui/lab";

export default function Inventory() {
  const { products, metaData } = UseProducts();
  const dispatch = useAppDispatch();
  const [editForm, setEditForm] = useState(false);
  const [selectProduct, setSelectProduct] = useState<Product | undefined>(
    undefined
  );
  const [target, setTarget] = useState(0);
  const [loading, setLoading] = useState(false);

  function handleSelectProduct(product: Product) {
    setSelectProduct(product);
    setEditForm(true);
  }

  function cancelChange() {
    if (selectProduct) setSelectProduct(undefined);
    setEditForm(false);
  }

  function handleDeleteProduct(id: number) {
    setLoading(true);
    setTarget(id);
    agent.Invent.deleteProduct(id)
      .then(() => dispatch(removeProduct(id)))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  if (editForm)
    return (
      <InventoryForm product={selectProduct} cancelChange={cancelChange} />
    );

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography sx={{ p: 2 }} variant="h4">
          Inventory
        </Typography>
        <Button
          onClick={() => setEditForm(true)}
          sx={{ m: 2 }}
          size="large"
          variant="contained"
        >
          Create
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="left">Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Brand</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {product.id}
                </TableCell>
                <TableCell align="left">
                  <Box display="flex" alignItems="center">
                    <img
                      src={product.pictureUrl}
                      alt={product.name}
                      style={{ height: 50, marginRight: 20 }}
                    />
                    <span>{product.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">{product.price}</TableCell>
                <TableCell align="center">{product.category}</TableCell>
                <TableCell align="center">{product.brand}</TableCell>
                <TableCell align="center">{product.stockQuantity}</TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => handleSelectProduct(product)}
                    startIcon={<Edit />}
                  />
                  <LoadingButton
                    loading={loading && target === product.id}
                    startIcon={<Delete />}
                    onClick={() => handleDeleteProduct(product.id)}
                    color="error"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {metaData && (
        <Box>
          <PaginationApp
            metaData={metaData}
            onChangePage={(page: number) =>
              dispatch(setPageNumber({ pageNumber: page }))
            }
          ></PaginationApp>
        </Box>
      )}
    </>
  );
}
