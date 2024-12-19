// components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ element }) => {
  const { authToken } = useSelector((state) => state.user);

  // If the user is not authenticated, redirect them to login
  if (!authToken) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default PrivateRoute;
