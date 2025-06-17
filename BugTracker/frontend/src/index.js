import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";

// This is the entry point of the React application.
// It renders the App component wrapped in BrowserRouter and AuthProvider.
// BrowserRouter is used for routing, allowing navigation between different components.
// AuthProvider is used to manage authentication state across the application.
// It provides the user authentication context to all components within the application.
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
