// This component checks if a user is authenticated before rendering the children components.
// If the user is not authenticated, it redirects to the login page.
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// PrivateRoute component is used to protect routes that require authentication.
// It checks if a user is authenticated by accessing the user state from AuthContext.
// If the user is authenticated, it renders the children components.
// If the user is not authenticated, it redirects to the login page using Navigate from react-router-dom.
// This ensures that only authenticated users can access certain parts of the application, enhancing security and user
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
