const express = require("express");
const { getDomains, getDomainTopics } = require("../controllers/domainController");

const router = express.Router();

// GET all domains
router.get("/", getDomains);

// GET topics for a specific domain and level
router.get("/:domainId/topics", getDomainTopics);

module.exports = router;
