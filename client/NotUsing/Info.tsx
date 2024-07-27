// import * as React from "react";

// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
// import Typography from "@mui/material/Typography";
// import { useAppDispatch, useAppSelector } from "../../util/configureStore";
// import { CartItem } from "../../Data/cart";

// const products = [
//   {
//     name: "Professional plan",
//     desc: "Monthly subscription",
//     price: "$15.00",
//   },
//   {
//     name: "Dedicated support",
//     desc: "Included in the Professional plan",
//     price: "Free",
//   },
//   {
//     name: "Hardware",
//     desc: "Devices needed for development",
//     price: "$69.99",
//   },
//   {
//     name: "Landing page template",
//     desc: "License",
//     price: "$49.99",
//   },
// ];

// interface Props {
//   items: CartItem[];
//   isCart?: boolean;
// }

// interface InfoProps {
//   totalPrice: string;
// }
// // export default function Info({ totalPrice }: InfoProps)
// export default function Info({ items, isCart = true }: Props) {
//   const { status } = useAppSelector((state) => state.cart);
//   const dispatch = useAppDispatch();
//   return (
//     <React.Fragment>
//       <Typography variant="subtitle2" color="text.secondary">
//         Total
//       </Typography>
//       <Typography variant="h4" gutterBottom>
//         //Subtotal goes here
//       </Typography>
//       <List disablePadding>
//         {items.map((item) => (
//           <ListItem key={item.name} sx={{ py: 1, px: 0 }}>
//             <ListItemText sx={{ mr: 2 }} primary={item.name} />
//             <Typography variant="body1" fontWeight="medium">
//               {item.price}
//             </Typography>
//           </ListItem>
//         ))}
//       </List>
//     </React.Fragment>
//   );
// }
