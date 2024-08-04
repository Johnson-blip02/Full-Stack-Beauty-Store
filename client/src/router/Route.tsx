import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/home/HomePage";
import ProductDetail from "../components/ProductDetails";
import ServerError from "./Error/ServerError";
import NotFound from "./Error/NotFound";
import CartPage from "../pages/cart/CartPage";
import CheckoutPage from "../pages/checkout/CheckoutPage";
import Login from "../Data/Login";
import Register from "../Data/Register";
import RouteAuth from "./RouteAuth";
import OrderPage from "../pages/order/OrderPage";
import Catalog from "../pages/catalog/catalog";
import Inventory from "../pages/inventory/Inventory";
import HelpPage from "../pages/help/HelpPage";
import ErrorPage from "../pages/errorCheck(HIDDEN)/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        element: <RouteAuth />,
        children: [
          { path: "checkout", element: <CheckoutPage /> },
          { path: "orders", element: <OrderPage /> },
          //Inventory was once required but now isn't
          { path: "inventory", element: <Inventory /> },
        ],
      },
      { path: "", element: <HomePage /> },
      { path: "catalog", element: <Catalog /> },
      { path: "catalog/:id", element: <ProductDetail /> },
      { path: "error", element: <ErrorPage /> },
      { path: "help", element: <HelpPage /> },
      // { path: "contact", element: <ContactPage /> },
      { path: "server-error", element: <ServerError /> },
      { path: "not-found", element: <NotFound /> },
      { path: "cart", element: <CartPage /> },
      // { path: "inventory", element: <Inventory /> },

      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
]);
