import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddProject.css";

const AddProject = () => {
  const navigate = useNavigate();
  const [domains, setDomains] = useState([]);
  const [formData, setFormData] = useState({
    domainId: "",
    title: "",
    description: "",
    content: "",
    level: "easy",
    author: {
      name: "",
      email: "",
      contact: "",
      profilePhoto: null,
    },
    publishedPapers: [],
    futureAdvancements: "",
    issuesFaced: "",
    referenceLinks: [],
    relatedImages: [],
  });

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/domains");
        setDomains(response.data);
      } catch (error) {
        console.error("Error fetching domains:", error);
      }
    };
    fetchDomains();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("author.")) {
      const authorField = name.split(".")[1];
      setFormData({
        ...formData,
        author: { ...formData.author, [authorField]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "profilePhoto") {
      setFormData({
        ...formData,
        author: { ...formData.author, profilePhoto: files[0] },
      });
    } else {
      setFormData({ ...formData, [name]: files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("domainId", formData.domainId);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("content", formData.content);
    formDataToSend.append("level", formData.level);
    formDataToSend.append("author", JSON.stringify(formData.author));
    formDataToSend.append("publishedPapers", JSON.stringify(formData.publishedPapers));
    formDataToSend.append("futureAdvancements", formData.futureAdvancements);
    formDataToSend.append("issuesFaced", formData.issuesFaced);
    formDataToSend.append("referenceLinks", JSON.stringify(formData.referenceLinks));
    formDataToSend.append("relatedImages", JSON.stringify(formData.relatedImages));

    try {
      const response = await axios.post("http://localhost:5000/api/projects", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Project added successfully:", response.data);
      navigate(`/domains/${formData.domainId}/${formData.level}`);
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  return (
    <div className="add-project-page">
      <h1>Add New Project</h1>
      <form onSubmit={handleSubmit} className="add-project-form">
        <div className="form-group">
          <label>Domain</label>
          <select
            name="domainId"
            value={formData.domainId}
            onChange={handleChange}
            required
          >
            <option value="">Select a Domain</option>
            {domains.map((domain) => (
              <option key={domain._id} value={domain._id}>
                {domain.title}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Level</label>
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            required
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="form-group">
          <label>Author Name</label>
          <input
            type="text"
            name="author.name"
            value={formData.author.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Author Email</label>
          <input
            type="email"
            name="author.email"
            value={formData.author.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Author Contact</label>
          <input
            type="text"
            name="author.contact"
            value={formData.author.contact}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Author Profile Photo</label>
          <input
            type="file"
            name="profilePhoto"
            onChange={handleFileChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Future Advancements</label>
          <textarea
            name="futureAdvancements"
            value={formData.futureAdvancements}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Issues Faced</label>
          <textarea
            name="issuesFaced"
            value={formData.issuesFaced}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Reference Links (comma-separated)</label>
          <input
            type="text"
            name="referenceLinks"
            value={formData.referenceLinks.join(", ")}
            onChange={(e) =>
              setFormData({
                ...formData,
                referenceLinks: e.target.value.split(",").map((link) => link.trim()),
              })
            }
          />
        </div>
        <div className="form-group">
          <label>Related Images</label>
          <input
            type="file"
            name="relatedImages"
            onChange={handleFileChange}
            multiple
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddProject;