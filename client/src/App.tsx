import { useEffect, useState } from "react";
import "./App.css";
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Box,
} from "@mui/material";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStoreContext } from "./Data/context/StoreContext";
import { getCookie } from "./util/util";
import agent from "./router/api/agent";
import Loading from "./components/Loading";
import { useAppDispatch } from "./util/configureStore";
import { setCart } from "./pages/cart/cartSlice";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const buyerId = getCookie("buyerId");
    if (buyerId) {
      agent.Cart.get()
        .then((cart) => dispatch(setCart(cart)))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch]);

  const lightTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#c2255c", // Custom primary color for light mode
      },
      secondary: {
        main: "#f06595", // Custom secondary color for light mode
      },
      background: {
        default: "#ffdeeb", // Custom background color for light mode
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#a61e4d", // Custom primary color for dark mode
      },
      secondary: {
        main: "#e64980", // Custom secondary color for dark mode
      },
      background: {
        default: "#121212", // Custom background color for dark mode
      },
    },
  });

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  if (loading) return <Loading message="Initializing web app" />;

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <ToastContainer
        position="bottom-right"
        hideProgressBar={true}
        theme="colored"
      />
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          position: "relative",
        }}
      >
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
        <Box sx={{ flex: 1 }}>
          <Container>
            <Outlet />
          </Container>
        </Box>
        {/* <Footer /> */}
      </Box>
    </ThemeProvider>
  );
}

export default App;
