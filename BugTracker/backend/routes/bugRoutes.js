const express = require("express");
const {
  createBug,
  getBugsByProject,
  updateBugStatus,
} = require("../controllers/bugController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createBug); // Report bug
router.get("/:projectId", protect, getBugsByProject); // List bugs for a project
router.patch("/:id/status", protect, updateBugStatus); // Update status

module.exports = router;
