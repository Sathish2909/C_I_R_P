const topics = require("../data/topics");

// Get details of a specific topic
const getTopicDetails = (req, res) => {
  const { topicId } = req.params;

  const topic = topics.find((t) => t.id === parseInt(topicId));
  if (!topic) {
    return res.status(404).json({ error: "Topic not found" });
  }

  res.json(topic);
};

module.exports = { getTopicDetails };
