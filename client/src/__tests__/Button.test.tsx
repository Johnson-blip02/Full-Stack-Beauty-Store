// src/__tests__/SimpleButton.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SimpleButton from "../components/SimpleButton"; // Adjust path as needed

test("Button click triggers the onClick handler", () => {
  // Create a mock function to test button click
  const mockOnClick = jest.fn();

  // Render the SimpleButton component with the mock function
  render(<SimpleButton onClick={mockOnClick} />);

  // Find the button
  const button = screen.getByText("Click me");

  // Click the button
  fireEvent.click(button);

  // Assert that the mock function was called
  expect(mockOnClick).toHaveBeenCalledTimes(1);
});
