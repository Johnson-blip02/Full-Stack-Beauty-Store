import React from "react";
import { Typography, ListItem, ListItemText, List } from "@mui/material";
import { useAppSelector } from "../../util/configureStore";
import { CartItem } from "../../Data/cart";

interface Props {
  items: CartItem[];
}

export default function CartTable({ items }: Props) {
  const { cart } = useAppSelector((state) => state.cart);

  // Calculate subtotal from both props and redux state
  const subtotal =
    items.reduce((sum, item) => sum + item.quantity * item.price, 0) +
    (cart?.items.reduce((sum, item) => sum + item.quantity * item.price, 0) ??
      0);

  const deliveryFee = subtotal > 50 ? 0 : 10;

  return (
    <List disablePadding>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ListItem sx={{ py: 1, px: 0 }} key={`item-${index}`}>
            <ListItemText
              primary={item.name}
              secondary={`${item.quantity} selected`}
            />
            <Typography variant="body2">
              {(item.price * item.quantity).toFixed(2)}
            </Typography>
          </ListItem>
        </React.Fragment>
      ))}
      {/* Display delivery fee */}
      <ListItem sx={{ py: 1, px: 0 }}>
        <ListItemText primary="Shipping" secondary="Plus taxes" />
        <Typography variant="body2">{deliveryFee.toFixed(2)}</Typography>
      </ListItem>
      {/* Display total */}
      <ListItem sx={{ py: 1, px: 0 }}>
        <ListItemText primary="Total" />
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          {(subtotal + deliveryFee).toFixed(2)}
        </Typography>
      </ListItem>
    </List>
  );
}
