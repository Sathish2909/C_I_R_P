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
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/domains");
        setDomains(response.data);
      } catch (error) {
        console.error("Error fetching domains:", error);
        setError("Failed to load domains. Please try again later.");
      }
    };
    fetchDomains();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("author.")) {
      const authorField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        author: { ...prev.author, [authorField]: value },
      }));
    } else if (name === "referenceLinks") {
      setFormData((prev) => ({
        ...prev,
        referenceLinks: value.split(",").map((link) => link.trim()),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setError("");
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "profilePhoto") {
      if (files[0] && files[0].type.startsWith("image/")) {
        setFormData((prev) => ({
          ...prev,
          author: { ...prev.author, profilePhoto: files[0] },
        }));
      } else {
        setError("Please upload a valid image file for the profile photo.");
      }
    } else if (name === "relatedImages") {
      const validImages = Array.from(files).filter((file) =>
        file.type.startsWith("image/")
      );
      if (validImages.length > 0) {
        setFormData((prev) => ({ ...prev, relatedImages: validImages }));
      } else {
        setError("Please upload valid image files for related images.");
      }
    }
  };

  const validateForm = () => {
    if (!formData.domainId) {
      setError("Please select a domain.");
      return false;
    }
    if (!formData.title.trim()) {
      setError("Title is required.");
      return false;
    }
    if (!formData.description.trim()) {
      setError("Description is required.");
      return false;
    }
    if (!formData.content.trim()) {
      setError("Content is required.");
      return false;
    }
    if (!formData.author.name.trim()) {
      setError("Author name is required.");
      return false;
    }
    if (!formData.author.email.trim()) {
      setError("Author email is required.");
      return false;
    }
    if (!formData.author.contact.trim()) {
      setError("Author contact is required.");
      return false;
    }
    if (!formData.author.profilePhoto) {
      setError("Author profile photo is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setError("");

    const formDataToSend = new FormData();
    formDataToSend.append("domainId", formData.domainId);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("content", formData.content);
    formDataToSend.append("level", formData.level);
    formDataToSend.append("author[name]", formData.author.name);
    formDataToSend.append("author[email]", formData.author.email);
    formDataToSend.append("author[contact]", formData.author.contact);
    formDataToSend.append("author[profilePhoto]", formData.author.profilePhoto);
    formDataToSend.append("futureAdvancements", formData.futureAdvancements);
    formDataToSend.append("issuesFaced", formData.issuesFaced);

    formData.referenceLinks.forEach((link) => {
      formDataToSend.append("referenceLinks[]", link);
    });

    formData.relatedImages.forEach((image) => {
      formDataToSend.append("relatedImages", image);
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/projects",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Project added successfully:", response.data);
      navigate(`/domains/${formData.domainId}/${formData.level}`);
    } catch (error) {
      console.error("Error adding project:", error);
      setError(
        error.response?.data?.error || "Failed to add project. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-project-page">
      <h1>Add New Project</h1>
      {error && <div className="error-message">{error}</div>}
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
            accept="image/*"
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
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Related Images</label>
          <input
            type="file"
            name="relatedImages"
            onChange={handleFileChange}
            accept="image/*"
            multiple
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddProject;