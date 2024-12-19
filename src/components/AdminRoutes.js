// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";

// const AdminRoute = ({ children }) => {
//   const { isLoggedIn, isAdmin } = useSelector((state) => state.user);

//   if (!isLoggedIn || !isAdmin) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// };

// export default AdminRoute;

// components/AdminRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ element }) => {
  const { authToken, isAdmin } = useSelector((state) => state.user);

  // If the user is not authenticated or not an admin, redirect them to homepage
  if (!authToken || !isAdmin) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default AdminRoute;
