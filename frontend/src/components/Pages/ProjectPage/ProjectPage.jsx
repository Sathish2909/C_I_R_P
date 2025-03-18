import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProjectPage.css";

const ProjectPage = () => {
  const { topicId } = useParams();
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopicDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/projects/${topicId}`
        );
        setTopic(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching topic details:", error);
        setError("Failed to load topic details. Please try again later.");
        setLoading(false);
      }
    };

    fetchTopicDetails();
  }, [topicId]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!topic) {
    return <div className="error">Topic not found.</div>;
  }

  return (
    <div className="project-page">
      <header className="project-header">
        <h1>{topic.title}</h1>
        <p className="project-subtitle">{topic.description}</p>
      </header>

      <div className="project-container">
        <div className="project-details">
          <div className="content-box">
            <h2>📖 Detailed Explanation</h2>
            <p>{topic.content}</p>
          </div>

          {topic.futureAdvancements && (
            <div className="content-box">
              <h2>🚀 Future Advancements</h2>
              <p>{topic.futureAdvancements}</p>
            </div>
          )}

          {topic.issuesFaced && (
            <div className="content-box">
              <h2>⚠️ Issues Faced</h2>
              <p>{topic.issuesFaced}</p>
            </div>
          )}

          {topic.referenceLinks.length > 0 && (
            <div className="content-box">
              <h2>🔗 Reference Links</h2>
              <ul>
                {topic.referenceLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {topic.publishedPapers.length > 0 && (
            <div className="content-box">
              <h2>📑 Published Papers</h2>
              <ul>
                {topic.publishedPapers.map((paper, index) => (
                  <li key={index}>
                    <strong>{paper.title}</strong> - {paper.date}
                    <a
                      href={paper.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View PDF
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <aside className="author-box">
          <h2>👤 Author</h2>
          <div className="author-info">
            <div className="author-avatar">
              <img src={topic.author.profilePhoto} alt={topic.author.name} />
            </div>
            <div className="author-text">
              <h3>{topic.author.name}</h3>
              <p>
                Email:{" "}
                <a href={`mailto:${topic.author.email}`}>{topic.author.email}</a>
              </p>
              <p>Contact: {topic.author.contact}</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ProjectPage;