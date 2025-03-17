const express = require("express");
const { getProjectDetails, addProject } = require("../controllers/projectController");

const router = express.Router();

// GET details of a specific project
router.get("/:topicId", getProjectDetails);

// POST add a new project
router.post("/", addProject);

module.exports = router;