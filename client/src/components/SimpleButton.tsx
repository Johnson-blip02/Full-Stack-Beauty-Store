// src/components/SimpleButton.tsx
import React from "react";

interface SimpleButtonProps {
  onClick: () => void;
}

const SimpleButton: React.FC<SimpleButtonProps> = ({ onClick }) => {
  return <button onClick={onClick}>Click me</button>;
};

export default SimpleButton;
