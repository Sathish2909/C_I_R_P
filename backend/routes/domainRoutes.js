const express = require("express");
const { getDomains, getDomainTopics, addDomain } = require("../controllers/domainController");
const upload = require("../utils/upload");

const router = express.Router();

// GET all domains
router.get("/", getDomains);

// GET topics for a specific domain and level
router.get("/:domainId/topics", getDomainTopics);

// POST add a new domain
router.post("/", upload.single("image"), addDomain);

module.exports = router;