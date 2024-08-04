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
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./components/Loading";
import { useAppDispatch } from "./util/configureStore";
import { fetchCartAsync } from "./pages/cart/cartSlice";
import { fetchCurrentUser } from "./components/slice/accountSlice";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // async function initApp() {
  //   try {
  //     await dispatch(fetchCurrentUser());
  //     await dispatch(fetchCartAsync());
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  useEffect(() => {
    (async function initApp() {
      try {
        await dispatch(fetchCurrentUser());
        await dispatch(fetchCartAsync());
      } catch (error) {
        console.log(error);
      }
    })().then(() => setLoading(false));
  }, [dispatch]);

  // useEffect(() => {
  //   initApp().then(() => setLoading(false));
  //   // const buyerId = getCookie("buyerId");
  //   // dispatch(fetchCurrentUser());
  //   // if (buyerId) {
  //   //   agent.Cart.get()
  //   //     .then((cart) => dispatch(setCart(cart)))
  //   //     .catch((error) => console.log(error))
  //   //     .finally(() => setLoading(false));
  //   // } else {
  //   //   setLoading(false);
  //   // }
  // }, [initApp]);

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
        <Box sx={{ flex: 1 }} data-testid="theme-element">
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
