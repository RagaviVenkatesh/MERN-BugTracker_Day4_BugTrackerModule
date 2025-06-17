import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Bugs from "./pages/Bugs";
import ReportBug from "./pages/ReportBug";
import PrivateRoute from "./utils/PrivateRoute";

// This is the main App component that sets up the routing for the application.
// It includes a Navbar and defines routes for different pages.
// The routes include public pages like Login and Register, and private pages like Projects, Bugs,
// and Report Bug, which are protected by the PrivateRoute component.
// The PrivateRoute component checks if the user is authenticated before allowing access to these pages.
// If the user is not authenticated, they will be redirected to the Login page.
// The Dashboard is the default route that is displayed when the user accesses the root path ("/
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/projects"
          element={
            <PrivateRoute>
              <Projects />
            </PrivateRoute>
          }
        />
        <Route
          path="/bugs"
          element={
            <PrivateRoute>
              <Bugs />
            </PrivateRoute>
          }
        />
        <Route
          path="/report"
          element={
            <PrivateRoute>
              <ReportBug />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
