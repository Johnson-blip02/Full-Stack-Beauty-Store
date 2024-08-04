// src/components/Header.tsx
import { ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  FormControlLabel,
  FormGroup,
  IconButton,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../util/configureStore";
import UserMenu from "./UserMenu";

interface SimpleButtonProps {
  onClick: () => void;
}

const SimpleButton: React.FC<SimpleButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} style={{ display: "none" }}>
      Click me
    </button>
  );
};

const headLinks = [
  { title: "catalog", path: "/catalog" },
  { title: "help", path: "/help" },
  { title: "inventory", path: "/inventory" },
];

const logLinks = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
];

const navStyles = {
  color: "inherit",
  typography: "h6",
  "&:hover": {
    color: "secondary.main",
  },
  "&.active": {
    color: "text.secondary",
  },
};

interface HeaderProps {
  darkMode: boolean;
  handleThemeChange: () => void;
}

export default function Header({ darkMode, handleThemeChange }: HeaderProps) {
  const { cart } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.account);
  const itemCount = cart?.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center">
          <Typography
            variant="h6"
            component={NavLink}
            to="/"
            sx={{ color: "inherit", textDecoration: "none" }}
          >
            Beauty Store Local NZ
          </Typography>
          <List sx={{ display: "flex" }}>
            {headLinks.map(({ title, path }) => (
              <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>

        <Box display="flex" alignItems="center">
          <IconButton
            component={Link}
            to="/cart"
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
          >
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>

          {user ? (
            <UserMenu />
          ) : (
            <List sx={{ display: "flex" }}>
              {logLinks.map(({ title, path }) => (
                <ListItem
                  component={NavLink}
                  to={path}
                  key={path}
                  sx={navStyles}
                >
                  {title.toUpperCase()}
                </ListItem>
              ))}
            </List>
          )}

          <FormGroup>
            <FormControlLabel
              control={
                <Switch checked={darkMode} onChange={handleThemeChange} />
              }
              label={darkMode ? "Dark Mode" : "Light Mode"}
              sx={{ ml: 2 }}
            />
          </FormGroup>

          {/* SimpleButton is defined but hidden */}
          <SimpleButton onClick={() => console.log("SimpleButton clicked")} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
