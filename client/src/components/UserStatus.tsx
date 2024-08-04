// src/components/UserStatus.tsx
import React from "react";

interface UserStatusProps {
  isLoggedIn: boolean;
}

const UserStatus: React.FC<UserStatusProps> = ({ isLoggedIn }) => {
  return (
    <div>{isLoggedIn ? "User is logged in" : "User is not logged in"}</div>
  );
};

export default UserStatus;
