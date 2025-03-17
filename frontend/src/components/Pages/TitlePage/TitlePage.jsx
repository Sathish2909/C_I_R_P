import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./TitlePage.css";

const TitlePage = () => {
  const { domainId, level } = useParams();
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/domains/${domainId}/topics`,
          {
            params: { level: level || "all" },
          }
        );

        // Check if the response data is valid
        if (response.data && Array.isArray(response.data)) {
          setTopics(response.data);
        } else {
          setError("Invalid data format received from the server.");
        }
      } catch (error) {
        console.error("Error fetching topics:", error);
        setError("Failed to load topics. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, [domainId, level]);

  const handleTopicClick = (topicId) => {
    navigate(`/domains/${domainId}/${level}/${topicId}`);
  };

  if (loading) {
    return <div className="loading">Loading topics...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="title-page">
      <h1 className="title-page-title">
        {domainId.charAt(0).toUpperCase() + domainId.slice(1)} -{" "}
        {level || "All Levels"}
      </h1>
      <h2 className="title-subtitle">Topics in this domain:</h2>

      {topics.length === 0 ? (
        <p className="no-topics">No topics available for this level.</p>
      ) : (
        <div className="topics-container">
          {topics.map((topic) => (
            <div
              key={topic._id}
              className="topic-card"
              onClick={() => handleTopicClick(topic._id)}
            >
              <div className="topic-content">
                <h2 className="topic-title">{topic.title}</h2>
                <p className="topic-description">{topic.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Project Card - Always visible at the end */}
      <div
        className="topic-card add-project-card"
        onClick={() => navigate(`/domains/${domainId}/${level}/add-project`)}
      >
        <div className="topic-content">
          <h2 className="topic-title">Add Project</h2>
          <p className="topic-description">Click to add a new project.</p>
        </div>
      </div>
    </div>
  );
};

export default TitlePage;