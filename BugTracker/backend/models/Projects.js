const mongoose = require("mongoose");

// This code defines a Mongoose schema for a Project model in a Node.js application.
// The schema includes fields for the project name, description, assigned users, and the user who created the project.
// It also includes timestamps to track when the project was created and last updated.
const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // The name of the project, required field
    description: String, // A brief description of the project
    assignedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // An array of ObjectIds referencing the User model, representing users assigned to the project
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // An ObjectId referencing the User model, representing the user who created the project
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt timestamps to the schema
);

module.exports = mongoose.model("Project", projectSchema);
