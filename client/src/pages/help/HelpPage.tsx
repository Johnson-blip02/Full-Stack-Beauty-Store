import { Divider, Typography } from "@mui/material";
import { Fragment } from "react/jsx-runtime";

export default function HelpPage() {
  return (
    <Fragment>
      <Typography variant="h1">Frequently Asked Questions</Typography>
      <Divider sx={{ my: 3 }} /> {/* Adds vertical margin */}
      <Typography variant="h3">How do I checkout?</Typography>
      <Typography variant="h4">
        There is a cart symbol at the top right that allows members to checkout.
      </Typography>
      <Divider sx={{ my: 3 }} /> {/* Adds vertical margin */}
      <Typography variant="h3">Where do I go to view my orders?</Typography>
      <Typography variant="h4">
        Clicking on the user's email opens a dropdown menu with an option called
        Orders.
      </Typography>
      <Divider sx={{ my: 3 }} /> {/* Adds vertical margin */}
      <Typography variant="h3">When is my order arriving?</Typography>
      <Typography variant="h4">
        Never, because this is a fake website.
      </Typography>
    </Fragment>
  );
}
