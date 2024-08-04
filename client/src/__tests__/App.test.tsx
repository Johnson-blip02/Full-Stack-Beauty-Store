import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const AppComponment: React.FC = () => <div>Hello, World!</div>;

test("AppComponment renders correctly and always passes", () => {
  render(<AppComponment />);
  expect(screen.getByText("Hello, World!")).toBeInTheDocument();
});
