import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/Route.tsx";
import { Provider } from "react-redux";
import { store } from "./util/configureStore.ts";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);

// ReactDOM.createRoot(document.getElementById("root")!).render(
// <React.StrictMode>
//   <Provider store={store}>
//     <RouterProvider router={router}></RouterProvider>
//   </Provider>
// </React.StrictMode>
// );
