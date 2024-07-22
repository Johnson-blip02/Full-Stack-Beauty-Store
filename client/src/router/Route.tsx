import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/home/HomePage";
import Catalog from "../components/Catalog";
import ProductDetail from "../components/ProductDetails";
import AboutPage from "../pages/about/AboutPage";
import ContactPage from "../pages/contact/ContactPage";
import ServerError from "./Error/ServerError";
import NotFound from "./Error/NotFound";
import CartPage from "../pages/cart/CartPage";
import CheckoutPage from "../pages/checkout/CheckoutPage";
import Login from "../Data/Login";
import Register from "../Data/Register";
import RouteAuth from "./RouteAuth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        element: <RouteAuth />,
        children: [{ path: "checkout", element: <CheckoutPage /> }],
      },
      { path: "", element: <HomePage /> },
      { path: "catalog", element: <Catalog /> },
      { path: "catalog/:id", element: <ProductDetail /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "server-error", element: <ServerError /> },
      { path: "not-found", element: <NotFound /> },
      { path: "cart", element: <CartPage /> },

      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
]);
