import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

// This component handles user registration.
// It includes a form for users to input their name, email, password, and role.
// Upon submission, it sends a POST request to the backend API to register the user.
// If the registration is successful, it alerts the user and redirects them to the login page.
// If there is an error, it alerts the user with the error message.
// The role can be selected from a dropdown menu with options for tester, developer, and admin
function Register() {
  // useNavigate is a hook from react-router-dom that allows navigation programmatically.
  // It is used here to redirect the user to the login page after successful registration.
  const navigate = useNavigate();
  // useState is a React hook that allows you to add state to functional components.
  // It is used here to manage the form state for registration.
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "tester",
  });

  // handleChange is a function that updates the form state when the user types in the input fields.
  // It takes an event object as an argument and updates the corresponding field in the form state
  // based on the name attribute of the input field.
  // This allows the form to be a controlled component, where the input values are managed by
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handleSubmit is a function that is called when the form is submitted.
  // It prevents the default form submission behavior, sends a POST request to the backend API
  // with the form data, and handles the response.
  // If the registration is successful, it alerts the user and redirects them to the login page
  // If there is an error, it alerts the user with the error message from the response
  // or a generic error message if the response does not contain an error.
  // This function is asynchronous because it involves a network request to the backend API.
  // The async/await syntax is used to handle the asynchronous nature of the request.
  // The try/catch block is used to handle any errors that may occur during the request
  // and provide appropriate feedback to the user.
  // The form data is sent as JSON in the request body, and the backend is expected
  // to handle the registration logic, including validation and saving the user to the database.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed.");
    }
  };

  // The return statement renders the registration form.
  // It includes input fields for the user's name, email, password, and a dropdown for
  // selecting the user's role (tester, developer, or admin).
  // Each input field has an onChange event handler that calls handleChange to update the form
  // state when the user types in the field.
  // The form also has a submit button that triggers the handleSubmit function when clicked.
  // The form is wrapped in a <form> element with an onSubmit event handler that
  // calls handleSubmit to handle the form submission.
  // The form is styled with basic HTML elements, and can be further enhanced with CSS for
  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input
        name="name"
        type="text"
        placeholder="Name"
        onChange={handleChange}
        required
      />
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
      <select name="role" onChange={handleChange}>
        <option value="tester">Tester</option>
        <option value="developer">Developer</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
