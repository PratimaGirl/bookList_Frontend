import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  // Check token in localStorage
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
