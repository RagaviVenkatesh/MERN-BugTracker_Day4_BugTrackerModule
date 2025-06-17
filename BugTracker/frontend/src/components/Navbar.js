import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Navbar component provides navigation links based on the user's authentication state.
// If the user is logged in, it shows links to Projects, Bugs, Report Bug,
// and a Logout button. If the user is not logged in, it shows links to Login
const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav style={{ padding: 10, borderBottom: "1px solid gray" }}>
      <Link to="/">Home</Link> |{" "}
      {user ? (
        <>
          <Link to="/projects">Projects</Link> | <Link to="/bugs">Bugs</Link> |{" "}
          <Link to="/report">Report Bug</Link> |{" "}
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
