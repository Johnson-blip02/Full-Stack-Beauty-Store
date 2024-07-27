import Typography from "@mui/material/Typography";
import ReviewTable from "./ReviewTable";
import { useAppSelector } from "../../util/configureStore";
import { Divider, Stack } from "@mui/material";

export default function Review() {
  const { cart } = useAppSelector((state) => state.cart);

  // Check if cart or cart.items is null or undefined
  if (!cart || !cart.items) {
    return (
      <Typography variant="body1">
        Your cart is empty. Please add items to continue.
      </Typography>
    );
  }

  return (
    <>
      <Stack spacing={2}>
        <Typography variant="h6">Order Summary</Typography>
        <ReviewTable items={cart.items} />
        <Divider />
        <Stack
          direction="column"
          divider={<Divider flexItem />}
          spacing={2}
          sx={{ my: 2 }}
        >
          <div>
            <Typography variant="subtitle2" gutterBottom>
              Shipment details
            </Typography>
            <Typography gutterBottom>John Smith</Typography>
            <Typography color="text.secondary" gutterBottom>
              {/* {addresses.join(", ")} */}
            </Typography>
          </div>
          <div>
            <Typography variant="subtitle2" gutterBottom>
              Payment details
            </Typography>
            {/* <Grid container>
              {payments.map((payment) => (
                <React.Fragment key={payment.name}>
                  <Stack
                    direction="row"
                    spacing={1}
                    useFlexGap
                    sx={{ width: "100%", mb: 1 }}
                  >
                    <Typography variant="body1" color="text.secondary">
                      {payment.name}
                    </Typography>
                    <Typography variant="body2">{payment.detail}</Typography>
                  </Stack>
                </React.Fragment>
              ))}
            </Grid> */}
          </div>
        </Stack>
      </Stack>
    </>
  );
}
