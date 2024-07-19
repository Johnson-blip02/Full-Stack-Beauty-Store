import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useStoreContext } from "../../Data/context/StoreContext";
import { Fragment, useState } from "react";
import agent from "../../router/api/agent";
import { LoadingButton } from "@mui/lab";
import CartSummary from "./CartSummary";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../util/configureStore";
import { addCartItemAsync, removeCartItemAsync, setCart } from "./cartSlice";

export default function CartPage() {
  const { cart, status } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  if (!cart) return <Typography variant="h3">Your cart is empty</Typography>;

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table size="small" sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.items.map((item) => (
              <TableRow
                key={item.productId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display="flex" alignItems="center">
                    <img
                      src={item.pictureUrl}
                      alt={item.name}
                      style={{ height: 40, marginRight: 10 }} // Reduced image size and margin
                    />
                    <Typography variant="body2">{item.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2">
                    {item.price.toFixed(2)}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <LoadingButton
                      loading={status === "pendingAddItem" + item.productId}
                      onClick={() =>
                        dispatch(
                          addCartItemAsync({ productId: item.productId })
                        )
                      }
                      color="secondary"
                      size="small" // Reduced button size
                    >
                      <Add fontSize="small" />
                    </LoadingButton>
                    <Typography variant="body2" sx={{ mx: 1 }}>
                      {item.quantity}
                    </Typography>
                    <LoadingButton
                      loading={
                        status === "pendingRemoveItem" + item.productId + "rem"
                      }
                      onClick={() =>
                        dispatch(
                          removeCartItemAsync({
                            productId: item.productId,
                            quantity: 1,
                            name: "rem",
                          })
                        )
                      }
                      color="error"
                      size="small" // Reduced button size
                    >
                      <Remove fontSize="small" />
                    </LoadingButton>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2">
                    {(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <LoadingButton
                    loading={
                      status === "pendingRemoveItem" + item.productId + "del"
                    }
                    onClick={() =>
                      dispatch(
                        removeCartItemAsync({
                          productId: item.productId,
                          quantity: item.quantity,
                          name: "del",
                        })
                      )
                    }
                    color="error"
                    size="small" // Reduced button size
                  >
                    <Delete fontSize="small" />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6} sx={{ mb: 4 }}>
          <CartSummary />
          <Button
            component={Link}
            to="/checkout"
            variant="contained"
            size="large"
            fullWidth
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
}
