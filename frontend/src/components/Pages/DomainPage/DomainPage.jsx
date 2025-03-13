import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DomainPage.css";

const DomainPage = () => {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState(null); // For top-level filter

  // Mock data for domains and their topics
  const domains = [
    {
      id: 1,
      title: "Water",
      imageUrl: "/images/water.png",
      description: "Explore water-related projects and innovations in water purification, harvesting, and energy generation.",
      topics: {
        easy: ["Purify Water", "Rain Harvesting"],
        medium: ["Energy from Water", "Turbine Design"],
        hard: ["Hydroelectric Power", "Water Desalination"],
      },
    },
    {
      id: 2,
      title: "Solar Energy",
      imageUrl: "/images/solar.svg",
      description: "Discover solar energy innovations",
      topics: {
        easy: ["Solar Panels", "Solar Farms"],
        medium: ["Solar Storage", "Solar Efficiency"],
        hard: ["Solar Grid Integration", "Solar Tracking Systems"],
      },
    },
    {
      id: 3,
      title: "Wind Power",
      imageUrl: "/images/wind.svg",
      description: "Learn about wind energy technologies",
      topics: {
        easy: ["Wind Turbines", "Wind Farms"],
        medium: ["Wind Efficiency", "Offshore Wind"],
        hard: ["Wind Energy Storage", "Wind Turbine Design"],
      },
    },
    // Add more domains as needed
  ];

  // Handle level selection within a domain card
  const handleLevelClick = (domainId, level) => {
    const domain = domains.find((d) => d.id === domainId);
    if (domain) {
      // Navigate to TitlePage with domainId and level
      navigate(`/domains/${domain.title.toLowerCase()}/${level}`);
    }
  };

  // Handle domain card click (for "Click Here" button)
  const handleDomainClick = (domainId) => {
    const domain = domains.find((d) => d.id === domainId);
    if (domain) {
      if (selectedLevel) {
        // Navigate to TitlePage with domainId and selected level
        navigate(`/domains/${domain.title.toLowerCase()}/${selectedLevel}`);
      } else {
        // Navigate to TitlePage with domainId and "all" level
        navigate(`/domains/${domain.title.toLowerCase()}/all`);
      }
    }
  };

  // Handle top-level filter click
  const handleTopLevelClick = (level) => {
    setSelectedLevel(level === selectedLevel ? null : level);
  };

  return (
    <div className="domain-page">
      <h1 className="domain-page-title">All Domains</h1>

      {/* Level Filters */}
      <div className="level-filters">
        <button
          className={`level-filter ${selectedLevel === "easy" ? "active" : ""}`}
          onClick={() => handleTopLevelClick("easy")}
        >
          Easy
        </button>
        <button
          className={`level-filter ${selectedLevel === "medium" ? "active" : ""}`}
          onClick={() => handleTopLevelClick("medium")}
        >
          Medium
        </button>
        <button
          className={`level-filter ${selectedLevel === "hard" ? "active" : ""}`}
          onClick={() => handleTopLevelClick("hard")}
        >
          Hard
        </button>
      </div>

      {/* Domain Cards */}
      <div className="domains-container">
        {domains.map((domain) => (
          <div
            key={domain.id}
            className="domain-card"
            onClick={() => handleDomainClick(domain.id)}
          >
            <div className="top-image">
              <img src={domain.imageUrl} alt={domain.title} />
            </div>
            <h2 className="domain-title">{domain.title}</h2>
            <p className="domain-description">{domain.description}</p>

            {/* Hover Effect: Show Topics and Levels */}
            <div className="hover-content">
              <h2 className="hover-domain-title">{domain.title}</h2>
              <div className="hover-topics">
                {selectedLevel ? (
                  // Show topics for the selected level
                  domain.topics[selectedLevel].map((topic, index) => (
                    <p key={index}>{topic}</p>
                  ))
                ) : (
                  // Show 2 random topics from each level (6 topics total)
                  <>
                    {domain.topics.easy.slice(0, 2).map((topic, index) => (
                      <p key={`easy-${index}`}>{topic}</p>
                    ))}
                    {domain.topics.medium.slice(0, 2).map((topic, index) => (
                      <p key={`medium-${index}`}>{topic}</p>
                    ))}
                    {domain.topics.hard.slice(0, 2).map((topic, index) => (
                      <p key={`hard-${index}`}>{topic}</p>
                    ))}
                  </>
                )}
              </div>
              {!selectedLevel && (
                <div className="hover-levels">
                  <button onClick={(e) => { e.stopPropagation(); handleLevelClick(domain.id, "easy"); }}>Easy</button>
                  <button onClick={(e) => { e.stopPropagation(); handleLevelClick(domain.id, "medium"); }}>Medium</button>
                  <button onClick={(e) => { e.stopPropagation(); handleLevelClick(domain.id, "hard"); }}>Hard</button>
                </div>
              )}
            </div>

            {/* Click Here Button */}
            <button className="click-button">Click Here</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DomainPage;