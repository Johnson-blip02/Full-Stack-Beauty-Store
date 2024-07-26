import { Button, Menu, MenuItem } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../util/configureStore";
import { signOut } from "./slice/accountSlice";
import { clearCart } from "../pages/cart/cartSlice";
import { Link } from "react-router-dom";

export default function UserMenu() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.account);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button color="inherit" sx={{ typography: "h6" }} onClick={handleClick}>
        {user?.email}
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem component={Link} to="/orders">
          Orders
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(signOut());
            dispatch(clearCart());
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
