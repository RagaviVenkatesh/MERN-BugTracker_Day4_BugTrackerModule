// This file defines the AuthContext for managing user authentication state in a React application.
// It provides a context for user data and functions to log in and log out.
// It uses localStorage to persist user data across sessions.
import { createContext, useContext, useState, useEffect } from "react";

// Importing necessary hooks and functions from React to create context and manage state.
// createContext is used to create a new context object.
const AuthContext = createContext();

// AuthProvider component wraps the application and provides authentication state and functions.
// It initializes the user state from localStorage and provides login and logout functions.
// The user state is updated whenever the login or logout functions are called, and the changes are
// persisted to localStorage for session management.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    // Providing the AuthContext to the children components.
    // This allows any component within the AuthProvider to access the user state and authentication functions.
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth is a custom hook that allows components to access the AuthContext easily.
// It uses useContext to retrieve the current context value, which includes user data and authentication functions
export const useAuth = () => useContext(AuthContext);
