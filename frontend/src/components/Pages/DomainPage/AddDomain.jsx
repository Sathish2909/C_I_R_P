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

  const handleChange = (e) => {
    if (e.target.name === "topics") {
      const { value, dataset } = e.target;
      const difficulty = dataset.difficulty;
      setFormData({
        ...formData,
        topics: {
          ...formData.topics,
          [difficulty]: value.split(",").map((item) => item.trim()),
        },
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("image", formData.image);
    formDataToSend.append("topics", JSON.stringify(formData.topics));

    try {
      const response = await axios.post("http://localhost:5000/api/domains", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Domain added successfully:", response.data);
      navigate("/domains");
    } catch (error) {
      console.error("Error adding domain:", error);
    }
  };

  return (
    <div className="add-domain-page">
      <h1>Add New Domain</h1>
      <form onSubmit={handleSubmit} className="add-domain-form">
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
          <label>Image</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
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
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddDomain;