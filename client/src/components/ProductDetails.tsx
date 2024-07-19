import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../router/Error/NotFound";
import Loading from "./Loading";
import { LoadingButton } from "@mui/lab";
import { addCartItemAsync, removeCartItemAsync } from "../pages/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../util/configureStore";
import { fetchProductAsync, productSelectors } from "./slice/catalogSlice";

export default function ProductDetails() {
  // debugger;
  const { id } = useParams<{ id: string }>();
  const product = useAppSelector((state) =>
    productSelectors.selectById(state, +id!)
  );
  const { cart, status } = useAppSelector((state) => state.cart);
  const { status: productStatus } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();
  const [quantityCart, setQuantityCart] = useState(0);
  const item = cart?.items.find((p) => p.productId === product?.id);

  useEffect(() => {
    if (item) setQuantityCart(item.quantity);
    if (!product && id) dispatch(fetchProductAsync(parseInt(id)));
  }, [id, item, dispatch, product]);

  if (productStatus.includes("pending"))
    return <Loading message="Loading item"></Loading>;
  if (!product) return <NotFound></NotFound>;

  function handleInputChange(event: any) {
    if (event.target.value >= 0) {
      setQuantityCart(parseInt(event.target.value));
    }
  }

  function handleUpdateCart() {
    if (!product) return;
    if (!item || quantityCart > item.quantity) {
      const updateQuantity = item ? quantityCart - item.quantity : quantityCart;
      dispatch(
        addCartItemAsync({ productId: product?.id, quantity: updateQuantity })
      );
    } else {
      const updateQuantity = item.quantity - quantityCart;
      dispatch(
        removeCartItemAsync({
          productId: product?.id,
          quantity: updateQuantity,
        })
      );
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: "100%" }}
        ></img>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 2 }}></Divider>
        <Typography variant="h4" color="secondary">
          {product.price.toFixed(2)}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell>{product.category}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Stock</TableCell>
                <TableCell>{product.stockQuantity}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              onChange={handleInputChange}
              variant="outlined"
              type="number"
              label="Quantity in Cart"
              fullWidth
              value={quantityCart}
            ></TextField>
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              disabled={
                item?.quantity === quantityCart || (!item && quantityCart === 0)
              }
              loading={status.includes("pending")}
              onClick={handleUpdateCart}
              sx={{ height: "55px" }}
              color="primary"
              size="large"
              variant="contained"
              fullWidth
            >
              {item ? "Update Quantity" : "Add to Cart"}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
