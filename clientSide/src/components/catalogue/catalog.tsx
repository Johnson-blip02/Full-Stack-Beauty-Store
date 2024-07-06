import { Fragment } from "react/jsx-runtime";
import { Product } from "../../data/products";
import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

interface Props {
  products: Product[];
  addProduct: () => void;
}

//Typescript doesn't know what prop type is, so explict the any type
export default function Catalog({ products, addProduct }: Props) {
  return (
    <Fragment>
      <List>
        {products.map((product) => (
          <ListItem key={product.id}>
            <ListItemAvatar>
              <Avatar src={product.PictureURL}></Avatar>
            </ListItemAvatar>
            <ListItemText>
              {product.name} - {product.PictureURL}
            </ListItemText>
          </ListItem>
        ))}
      </List>
      <Button variant="contained" onClick={addProduct}>
        Add Product
      </Button>
    </Fragment>
  );
}
