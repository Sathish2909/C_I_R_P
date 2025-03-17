const express = require("express");
const { getProjectDetails, addProject } = require("../controllers/projectController");
const upload = require("../utils/upload");

const router = express.Router();

// GET project details
router.get("/:topicId", getProjectDetails);

// POST add a new project (with file uploads)
router.post(
  "/",
  upload.fields([
    { name: "profilePhoto", maxCount: 1 }, // Single file for profile photo
    { name: "relatedImages", maxCount: 10 }, // Up to 10 files for related images
  ]),
  addProject
);

module.exports = router;