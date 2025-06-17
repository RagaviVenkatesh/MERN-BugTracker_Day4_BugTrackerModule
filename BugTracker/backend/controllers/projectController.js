const Project = require("../models/Projects");

// This code defines a controller for managing projects in a Node.js application using Express.
// It includes functions to create a new project and retrieve all projects from the database.
// The createProject function handles the creation of a new project, including the project name, description, and assigned users.
// It uses the Project model to interact with the MongoDB database.
// The getAllProjects function retrieves all projects from the database, populating the assigned users and the user who created the project.
// It returns the projects in JSON format, allowing the frontend to display
exports.createProject = async (req, res) => {
  const { name, description, assignedUsers } = req.body;

  try {
    const project = await Project.create({
      name,
      description,
      assignedUsers,
      createdBy: req.user.id,
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("assignedUsers", "name email role")
      .populate("createdBy", "name email");
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
