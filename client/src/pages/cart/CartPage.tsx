import { Button, Grid, Typography } from "@mui/material";
import { Fragment } from "react";
import CartSummary from "./CartSummary";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../util/configureStore";
import CartTable from "./CartTable";

export default function CartPage() {
  const { cart, status } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  if (!cart) return <Typography variant="h3">Your cart is empty</Typography>;

  return (
    <Fragment>
      <CartTable items={cart.items} />
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
