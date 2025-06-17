const mongoose = require("mongoose");

// This code defines a Mongoose schema for a Bug model in a Node.js application.
// The schema includes fields for the bug title, description, priority, status, type, and
// references to the user who reported it, the user assigned to it, and the project it belongs to.
const bugSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Resolved", "Closed"],
      default: "Open",
    },
    type: { type: String, enum: ["Bug", "Feature Request"], default: "Bug" },
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bug", bugSchema);
