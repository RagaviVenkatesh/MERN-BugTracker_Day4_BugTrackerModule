// Import Express
const express = require("express");
// Import the protect middleware
// This middleware is used to protect routes that require authentication
// It checks if the user is authenticated before allowing access to the route
const { protect } = require("../middleware/authMiddleware");

// Import the controller functions
// These functions handle the logic for user registration and login
// They will be used in the routes to process incoming requests
// The register function will handle user registration
// The login function will handle user login
const { register, login } = require("../controllers/authController");
const { getAllUsers } = require("../controllers/authController");
// Create a router instance
const router = express.Router();

// Route for registration
router.post("/register", register);
// Route for login
router.post("/login", login);

router.get("/users", protect, getAllUsers);

// Export router to use in server.js
module.exports = router;
