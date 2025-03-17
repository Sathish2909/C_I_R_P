const Project = require("../models/Project");

// Get details of a specific project
const getProjectDetails = async (req, res) => {
  const { topicId } = req.params;

  try {
    const project = await Project.findById(topicId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: "Error fetching project details" });
  }
};

// Add a new project
const addProject = async (req, res) => {
  const {
    domainId,
    title,
    description,
    content,
    level,
    author,
    publishedPapers,
    futureAdvancements,
    issuesFaced,
    referenceLinks,
    relatedImages,
  } = req.body;

  try {
    const newProject = new Project({
      domainId,
      title,
      description,
      content,
      level,
      author,
      publishedPapers,
      futureAdvancements,
      issuesFaced,
      referenceLinks,
      relatedImages,
    });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: "Error adding project" });
  }
};

module.exports = { getProjectDetails, addProject };