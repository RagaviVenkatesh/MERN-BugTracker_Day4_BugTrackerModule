import React, { useEffect, useState } from "react";
import api from "../api";
import { useAuth } from "../context/AuthContext";

// Projects component allows users to view and manage projects.
// Admin users can create new projects and assign users to them.
// It fetches the list of projects and users from the backend API
function Projects() {
  // useAuth hook provides access to the current user's authentication state.
  // It retrieves the user object, which contains user details like role and name.
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    assignedUsers: [],
  });
  const [users, setUsers] = useState([]);

  // fetchProjects retrieves the list of projects from the backend API.
  // It sends a GET request to the "/projects" endpoint and updates the projects state with the response data.
  // This function is called initially and after creating a new project to refresh the project list.
  // It uses the api instance to make the request, which is configured with the
  const fetchProjects = async () => {
    const res = await api.get("/projects");
    setProjects(res.data);
  };

  // fetchUsers retrieves the list of users from the backend API.
  // It sends a GET request to the "/auth/users" endpoint and updates the users state
  // with the response data. This is only called if the current user is an admin.
  const fetchUsers = async () => {
    const res = await api.get("/auth/users"); // You’ll create this route next
    setUsers(res.data);
  };

  // handleChange updates the form state when the user types in the input fields.
  // It takes an event object as an argument and updates the corresponding field in the form state
  // based on the name attribute of the input field. This allows the form to be a controlled component,
  // where the input values are managed by React state.
  // This function is used for both the project name and description fields.
  // It spreads the existing form state and updates the specific field that changed.
  // This ensures that the form state is always in sync with the input values.
  // This is essential for controlled components in React, where the input values are derived from the
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handleCheckbox toggles the assignedUsers array in the form state when a user checkbox is clicked.
  // It checks if the user ID is already in the assignedUsers array.
  // If it is, it removes the ID; if not, it adds the ID to the array.
  // This allows multiple users to be assigned to a project by checking or unchecking
  // the corresponding checkboxes in the form.
  const handleCheckbox = (id) => {
    setForm((prev) => {
      const assigned = prev.assignedUsers.includes(id)
        ? prev.assignedUsers.filter((uid) => uid !== id)
        : [...prev.assignedUsers, id];
      return { ...prev, assignedUsers: assigned };
    });
  };

  // handleSubmit is called when the form is submitted.
  // It prevents the default form submission behavior, sends a POST request to the backend API
  // to create a new project with the form data, and resets the form state after submission.
  // It also calls fetchProjects to refresh the project list after creating a new project.
  // This function is asynchronous because it involves a network request to the backend API.
  // The async/await syntax is used to handle the asynchronous nature of the request
  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/projects", form);
    setForm({ name: "", description: "", assignedUsers: [] });
    fetchProjects();
  };

  // useEffect is used to fetch the initial list of projects and users when the component mounts.
  // It calls fetchProjects to get the projects and fetchUsers if the current user is an
  useEffect(() => {
    fetchProjects();
    if (user.role === "admin") fetchUsers();
  }, []);

  // The component renders a form for creating new projects if the user is an admin.
  return (
    <div>
      <h2>Projects</h2>
      {user.role === "admin" && (
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Project Name"
            onChange={handleChange}
            value={form.name}
            required
          />
          <input
            name="description"
            placeholder="Description"
            onChange={handleChange}
            value={form.description}
          />
          <div>
            <h4>Assign Users:</h4>
            {users.map((u) => (
              <label key={u._id}>
                <input
                  type="checkbox"
                  value={u._id}
                  checked={form.assignedUsers.includes(u._id)}
                  onChange={() => handleCheckbox(u._id)}
                />
                {u.name} ({u.role})
              </label>
            ))}
          </div>
          <button type="submit">Create Project</button>
        </form>
      )}
      <h3>Project List</h3>
      {projects.map((p) => (
        <div
          key={p._id}
          style={{ border: "1px solid #ccc", padding: 10, margin: 10 }}
        >
          <strong>{p.name}</strong>
          <br />
          {p.description}
          <br />
          <small>Created by: {p.createdBy?.name}</small>
          <br />
          <span>Users: {p.assignedUsers?.map((u) => u.name).join(", ")}</span>
        </div>
      ))}
    </div>
  );
}

export default Projects;
