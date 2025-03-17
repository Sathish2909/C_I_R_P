const Domain = require("../models/Domain");

// Get all domains
const getDomains = async (req, res) => {
  try {
    const domains = await Domain.find();
    res.status(200).json(domains);
  } catch (error) {
    res.status(500).json({ error: "Error fetching domains" });
  }
};

// Get topics for a specific domain and level
const getDomainTopics = async (req, res) => {
  const { domainId } = req.params;
  const { level } = req.query;

  try {
    const domain = await Domain.findById(domainId);
    if (!domain) {
      return res.status(404).json({ error: "Domain not found" });
    }

    let topics = [];
    if (level && domain.topics[level]) {
      topics = domain.topics[level];
    } else {
      topics = [...domain.topics.easy, ...domain.topics.medium, ...domain.topics.hard];
    }

    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json({ error: "Error fetching topics" });
  }
};

// Add a new domain
const addDomain = async (req, res) => {
  const { title, description, topics } = req.body;
  const imageurl = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const newDomain = new Domain({ title, description, imageurl, topics });
    await newDomain.save();
    res.status(201).json(newDomain);
  } catch (error) {
    res.status(500).json({ error: "Error adding domain" });
  }
};

module.exports = { getDomains, getDomainTopics, addDomain };