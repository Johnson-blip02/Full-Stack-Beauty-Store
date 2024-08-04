// src/__tests__/App.test.tsx
import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../util/configureStore";
import App from "../App";

describe("App component", () => {
  test("renders App component without crashing", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // This test simply checks that the App component renders
    expect(true).toBe(true);
  });
});
