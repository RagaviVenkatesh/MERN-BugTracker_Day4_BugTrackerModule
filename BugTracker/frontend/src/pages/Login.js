import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Login component handles user login functionality.
// It includes a form for email and password input, and handles form submission.
// On successful login, it saves the user and token in the AuthContext and redirects to the dashboard.
// If login fails, it alerts the user with an error message.
// The useAuth hook provides access to the authentication context, allowing us to manage user state and
// authentication functions like login and logout.
function Login() {
  // useNavigate is a hook from react-router-dom that allows us to programmatically navigate to different routes.
  // It is used here to redirect the user to the dashboard after a successful login.
  const navigate = useNavigate();
  // useAuth is a custom hook that provides access to the authentication context.
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  // handleChange updates the form state when the user types in the input fields.
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handleSubmit is called when the form is submitted.
  // It prevents the default form submission behavior, sends a POST request to the backend API to
  // authenticate the user, and handles the response.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      login(res.data.user, res.data.token); // Save user & token
      alert("Login successful");
      navigate("/"); // Redirect to dashboard
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  // The return statement renders the login form.
  // It includes input fields for email and password, each with an onChange event handler that
  // calls handleChange to update the form state when the user types in the field.
  // The form also has a submit button that triggers the handleSubmit function when clicked.
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
