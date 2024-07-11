import { useState } from "react";
import "./App.css";
import Catalog from "./components/Catalog";
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

function App() {
  const [darkMode, setDarkMode] = useState(false);

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

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
