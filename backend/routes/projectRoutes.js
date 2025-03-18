const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const upload = require("../utils/upload"); // Import Multer configuration

// Route to add a new project
router.post(
  "/projects",
  upload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "relatedImages", maxCount: 10 },
  ]),
  projectController.addProject
);

// Route to get project details
router.get("/projects/:topicId", projectController.getProjectDetails);

module.exports = router;