import { Add, Remove, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Typography,
} from "@mui/material";
import { addCartItemAsync, removeCartItemAsync } from "./cartSlice";
import { useAppSelector, useAppDispatch } from "../../util/configureStore";
import { CartItem } from "../../Data/cart";

interface Props {
  items: CartItem[];
  isCart?: boolean;
}

export default function CartTable({ items, isCart = true }: Props) {
  const { status } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  return (
    <TableContainer component={Paper}>
      <Table size="small" sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Total</TableCell>
            {isCart && <TableCell align="right"></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
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
                <Typography variant="body2">{item.price.toFixed(2)}</Typography>
              </TableCell>
              <TableCell align="center">
                <Box display="flex" alignItems="center" justifyContent="center">
                  {isCart && (
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
                  )}
                  <Typography variant="body2" sx={{ mx: 1 }}>
                    {item.quantity}
                  </Typography>
                  {isCart && (
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
                  )}
                </Box>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body2">
                  {(item.price * item.quantity).toFixed(2)}
                </Typography>
              </TableCell>
              <TableCell align="right">
                {isCart && (
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
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
