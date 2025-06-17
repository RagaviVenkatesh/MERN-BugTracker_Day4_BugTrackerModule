const Bug = require("../models/Bug");

// This code defines a controller for handling bug-related operations in a Node.js application.
// It includes functions to create a new bug, retrieve bugs by project, and update the status of a bug.
// The `createBug` function creates a new bug with the provided details and associates it with the user who reported it.
// The `getBugsByProject` function retrieves all bugs
exports.createBug = async (req, res) => {
  try {
    const bug = await Bug.create({
      ...req.body,
      reportedBy: req.user.id,
    });
    res.status(201).json(bug);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBugsByProject = async (req, res) => {
  try {
    const bugs = await Bug.find({ project: req.params.projectId })
      .populate("reportedBy", "name")
      .populate("assignedTo", "name")
      .populate("project", "name");
    res.json(bugs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBugStatus = async (req, res) => {
  try {
    const bug = await Bug.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(bug);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
