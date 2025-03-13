const express = require("express");
const { getTopicDetails } = require("../controllers/topicController");

const router = express.Router();

// GET details of a specific topic
router.get("/:topicId", getTopicDetails);

module.exports = router;
