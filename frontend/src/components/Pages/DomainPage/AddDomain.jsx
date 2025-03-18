import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddDomain.css";

const AddDomain = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    topics: {
      easy: [],
      medium: [],
      hard: [],
    },
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "topics") {
      const difficulty = e.target.dataset.difficulty;
      setFormData((prev) => ({
        ...prev,
        topics: {
          ...prev.topics,
          [difficulty]: value
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item),
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData((prev) => ({ ...prev, image: file }));
      setError("");
    } else {
      setError("Please upload a valid image file.");
    }
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError("Title is required");
      return false;
    }
    if (!formData.description.trim()) {
      setError("Description is required");
      return false;
    }
    if (!formData.image) {
      setError("Image is required");
      return false;
    }
    if (
      formData.topics.easy.length === 0 &&
      formData.topics.medium.length === 0 &&
      formData.topics.hard.length === 0
    ) {
      setError("At least one topic is required");
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
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("image", formData.image);
    formDataToSend.append("topics[easy]", formData.topics.easy.join(","));
    formDataToSend.append("topics[medium]", formData.topics.medium.join(","));
    formDataToSend.append("topics[hard]", formData.topics.hard.join(","));

    try {
      const response = await axios.post(
        "http://localhost:5000/api/domains",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Domain added successfully:", response.data);
      navigate("/domains");
    } catch (error) {
      console.error("Error adding domain:", error);
      setError(
        error.response?.data?.error || "Failed to add domain. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-domain-page">
      <h1>Add New Domain</h1>
      <form onSubmit={handleSubmit} className="add-domain-form">
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            maxLength={100}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            maxLength={500}
            rows={4}
          />
        </div>

        <div className="form-group">
          <label>Image</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            accept="image/*"
            required
          />
        </div>

        <div className="form-group">
          <label>Easy Topics (comma-separated)</label>
          <input
            type="text"
            name="topics"
            data-difficulty="easy"
            value={formData.topics.easy.join(", ")}
            onChange={handleChange}
            placeholder="e.g., Topic 1, Topic 2, Topic 3"
          />
        </div>

        <div className="form-group">
          <label>Medium Topics (comma-separated)</label>
          <input
            type="text"
            name="topics"
            data-difficulty="medium"
            value={formData.topics.medium.join(", ")}
            onChange={handleChange}
            placeholder="e.g., Topic 1, Topic 2, Topic 3"
          />
        </div>

        <div className="form-group">
          <label>Hard Topics (comma-separated)</label>
          <input
            type="text"
            name="topics"
            data-difficulty="hard"
            value={formData.topics.hard.join(", ")}
            onChange={handleChange}
            placeholder="e.g., Topic 1, Topic 2, Topic 3"
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Domain"}
        </button>
      </form>
    </div>
  );
};

export default AddDomain;