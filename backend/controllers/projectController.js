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
    console.error("Error fetching project details:", error);
    res.status(500).json({ error: "Error fetching project details" });
  }
};

// Add a new project
const addProject = async (req, res) => {
  try {
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
    } = req.body;

    // Handle file uploads
    const profilePhoto = req.files?.profilePhoto?.[0]?.path; // Path of the uploaded profile photo
    const relatedImages = req.files?.relatedImages?.map((file) => file.path); // Array of paths for related images

    // Parse JSON fields
    const parsedAuthor = JSON.parse(author);
    const parsedPublishedPapers = JSON.parse(publishedPapers);
    const parsedReferenceLinks = JSON.parse(referenceLinks);

    // Create a new project
    const newProject = new Project({
      domainId,
      title,
      description,
      content,
      level,
      author: {
        ...parsedAuthor,
        profilePhoto, // Add the profile photo path
      },
      publishedPapers: parsedPublishedPapers,
      futureAdvancements,
      issuesFaced,
      referenceLinks: parsedReferenceLinks,
      relatedImages, // Add the related images paths
    });

    // Save the project to the database
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    console.error("Error adding project:", error);
    res.status(500).json({ error: "Failed to add project. Please try again." });
  }
};

module.exports = { getProjectDetails, addProject };