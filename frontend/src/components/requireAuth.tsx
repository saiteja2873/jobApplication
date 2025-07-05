import React from "react";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }: { children: React.ReactElement }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

export default RequireAuth;
