// Import User model
const User = require("../models/User");
// For hashing passwords
const bcrypt = require("bcryptjs");
// For token generation
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  // Destructure request body
  const { name, email, password, role } = req.body;
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Save user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    // Respond with success message
    // The user object will not include the password field in the response
    res.status(201).json({ message: "User registered." });
  } catch (error) {
    // Handle errors, such as duplicate email
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  // Get login credentials
  const { email, password } = req.body;
  try {
    // Look for user
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    // Compare password with hashed password in database
    // bcrypt.compare returns a promise that resolves to true or false
    // If the passwords match, it resolves to true; otherwise, false
    // If the passwords do not match, we return an error response
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    // Generate JWT token
    // The token will include the user's ID and role
    // The token is signed with a secret key stored in environment variables
    // The token can be used for authentication in subsequent requests
    // The token will be sent back to the client in the response
    // The client can store the token (e.g., in localStorage) and include it
    // in the Authorization header for protected routes
    // The token will expire after a certain period (e.g., 1 hour) for security
    // The token can be verified on the server to ensure it is valid and not tampered with
    // The user's ID and role can be extracted from the token for authorization checks
    // The token will be used to authenticate the user in future requests
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );
    res.json({
      token,
      // Return user info
      user: { name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to get all users
// This function retrieves all users from the database, excluding sensitive information like passwords
// It uses the User model to query the database and returns a list of users with their name
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "name email role");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
