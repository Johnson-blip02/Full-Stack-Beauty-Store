import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserStatus from "../components/UserStatus"; // Adjust path as needed

test('Displays "User is logged in" when logged in', () => {
  render(<UserStatus isLoggedIn={true} />);
  expect(screen.getByText("User is logged in")).toBeInTheDocument();
});

test('Displays "User is not logged in" when not logged in', () => {
  render(<UserStatus isLoggedIn={false} />);
  expect(screen.getByText("User is not logged in")).toBeInTheDocument();
});
