const domains = require("../data/domains");

// Get all domains
const getDomains = (req, res) => {
  res.json(domains);
};

// Get topics for a specific domain and level
const getDomainTopics = (req, res) => {
  const { domainId } = req.params;
  const { level } = req.query;

  // Find domain by title (case insensitive)
  const domain = domains.find((d) => d.title.toLowerCase() === domainId.toLowerCase());
  if (!domain) {
    return res.status(404).json({ error: "Domain not found" });
  }

  // Return topics based on level
  let topics = [];
  if (level && domain.topics[level]) {
    topics = domain.topics[level]; // Return only the selected level
  } else {
    topics = [...domain.topics.easy, ...domain.topics.medium, ...domain.topics.hard]; // Return all topics
  }

  res.json(topics);
};

module.exports = { getDomains, getDomainTopics };
