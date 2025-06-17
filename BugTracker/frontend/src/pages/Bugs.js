import React, { useEffect, useState } from "react";
import api from "../api";
import { useAuth } from "../context/AuthContext";

function Bugs() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [bugs, setBugs] = useState([]);
  const [newBug, setNewBug] = useState({
    title: "",
    description: "",
    priority: "Medium",
    type: "Bug",
    assignedTo: "",
  });
  const [users, setUsers] = useState([]);

  const fetchProjects = async () => {
    const res = await api.get("/projects");
    setProjects(res.data);
  };

  const fetchUsers = async () => {
    const res = await api.get("/auth/users");
    setUsers(res.data);
  };

  const fetchBugs = async () => {
    if (!selectedProject) return;
    const res = await api.get(`/bugs/${selectedProject}`);
    setBugs(res.data);
  };

  const handleBugChange = (e) => {
    setNewBug({ ...newBug, [e.target.name]: e.target.value });
  };

  const handleBugSubmit = async (e) => {
    e.preventDefault();
    await api.post("/bugs", {
      ...newBug,
      project: selectedProject,
    });
    setNewBug({
      title: "",
      description: "",
      priority: "Medium",
      type: "Bug",
      assignedTo: "",
    });
    fetchBugs();
  };

  const handleStatusChange = async (bugId, newStatus) => {
    await api.patch(`/bugs/${bugId}/status`, { status: newStatus });
    fetchBugs();
  };

  useEffect(() => {
    fetchProjects();
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchBugs();
  }, [selectedProject]);

  return (
    <div>
      <h2>Bug Tracker</h2>

      <label>Select Project:</label>
      <select
        value={selectedProject}
        onChange={(e) => setSelectedProject(e.target.value)}
      >
        <option value="">-- Select --</option>
        {projects.map((p) => (
          <option key={p._id} value={p._id}>
            {p.name}
          </option>
        ))}
      </select>

      {selectedProject && (
        <form onSubmit={handleBugSubmit} style={{ marginTop: "20px" }}>
          <h3>Report a Bug</h3>
          <input
            name="title"
            placeholder="Title"
            onChange={handleBugChange}
            value={newBug.title}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            onChange={handleBugChange}
            value={newBug.description}
          />
          <select
            name="priority"
            onChange={handleBugChange}
            value={newBug.priority}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <select name="type" onChange={handleBugChange} value={newBug.type}>
            <option>Bug</option>
            <option>Feature Request</option>
          </select>
          <select
            name="assignedTo"
            onChange={handleBugChange}
            value={newBug.assignedTo}
          >
            <option value="">-- Assign Developer --</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name} ({u.role})
              </option>
            ))}
          </select>
          <button type="submit">Submit Bug</button>
        </form>
      )}

      <h3>Reported Bugs</h3>
      {bugs.map((bug) => (
        <div
          key={bug._id}
          style={{ border: "1px solid gray", padding: 10, margin: 10 }}
        >
          <strong>{bug.title}</strong> ({bug.status})<br />
          Priority: {bug.priority} | Type: {bug.type}
          <br />
          Assigned To: {bug.assignedTo?.name || "Unassigned"}
          <br />
          Reported By: {bug.reportedBy?.name}
          <br />
          <p>{bug.description}</p>
          {user.role !== "tester" && (
            <select
              value={bug.status}
              onChange={(e) => handleStatusChange(bug._id, e.target.value)}
            >
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
              <option>Closed</option>
            </select>
          )}
        </div>
      ))}
    </div>
  );
}

export default Bugs;
