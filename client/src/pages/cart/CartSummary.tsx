import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { Fragment } from "react";
import { moneyFormat } from "../../util/util";
import { useAppSelector } from "../../util/configureStore";

export default function CartSummary() {
  const { cart } = useAppSelector((state) => state.cart);
  const subtotal =
    cart?.items.reduce((sum, item) => sum + item.quantity * item.price, 0) ?? 0;
  const deliveryFee = subtotal > 50 ? 0 : 10;

  return (
    <Fragment>
      <TableContainer component={Paper} variant={"outlined"}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">{moneyFormat(subtotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Delivery fee*</TableCell>
              <TableCell align="right">{moneyFormat(deliveryFee)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">
                {moneyFormat(subtotal + deliveryFee)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <span style={{ fontStyle: "italic" }}>
                  *Orders over $50 qualify for free delivery
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
}
