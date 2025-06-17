const express = require("express");
const {
  createProject,
  getAllProjects,
} = require("../controllers/projectController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", protect, createProject); // Create project
router.get("/", protect, getAllProjects); // Get all projects

module.exports = router;
// This code sets up the project routes for a Node.js application using Express.
// It defines routes for creating a project and retrieving all projects.
// The `protect` middleware is used to ensure that only authenticated users can access these routes.
// The `createProject` function handles the creation of a new project, while the `getAllProjects` function retrieves all projects from the database.
// The routes are defined using the Express router, which allows for modular route handling in the application.
// The `protect` middleware is applied to both routes
// to ensure that only authenticated users can create or view projects.
// The router is then exported for use in the main application file, allowing it to be mounted
// on a specific path (e.g., `/api/projects`) in the application.
// This modular approach helps keep the code organized and maintainable, especially as the application grows in complexity.
