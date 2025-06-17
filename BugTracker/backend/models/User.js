// Import Mongoose
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Required string field
  email: { type: String, unique: true, required: true }, // Must be unique
  password: { type: String, required: true }, // Will store hashed password
  role: {
    type: String,
    enum: ["admin", "developer", "tester"], // Restrict to these values
    default: "tester", // Default if not provided
  },
});

// Create a Mongoose model from the schema
// This will create a collection named "users" in the database
// Mongoose automatically pluralizes the model name
// so "User" becomes "users"
// The model provides an interface to interact with the database
// It allows us to create, read, update, and delete user documents
// Each document in the "users" collection will follow the userSchema structure
// The model can be used in other parts of the application to perform database operations
// Export the User model so it can be used in other files
// This is the main interface for interacting with user data in the database
// The model will handle validation, type checking, and other database operations
module.exports = mongoose.model("User", userSchema);
