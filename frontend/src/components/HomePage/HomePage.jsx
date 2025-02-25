import React, { useEffect } from "react";
import anime from "animejs/lib/anime.es.js";
import "./HomePage.css";

const HomePage = () => {
  useEffect(() => {
    // Text animation
    const heading = {
      opacityIn: [0, 1],
      scaleIn: [0.2, 1],
      scaleOut: 3,
      durationIn: 800,
      durationOut: 600,
      delay: 500,
    };

    anime
      .timeline({ loop: true })
      .add({
        targets: ".intro-1",
        opacity: heading.opacityIn,
        scale: heading.scaleIn,
        duration: heading.durationIn,
      })
      .add({
        targets: ".intro-1",
        opacity: 0,
        scale: heading.scaleOut,
        duration: heading.durationOut,
        easing: "easeInExpo",
        delay: heading.delay,
      })
      .add({
        targets: ".intro-2",
        opacity: heading.opacityIn,
        scale: heading.scaleIn,
        duration: heading.durationIn,
      })
      .add({
        targets: ".intro-2",
        opacity: 0,
        scale: heading.scaleOut,
        duration: heading.durationOut,
        easing: "easeInExpo",
        delay: heading.delay,
      })
      .add({
        targets: ".intro-3",
        opacity: heading.opacityIn,
        scale: heading.scaleIn,
        duration: heading.durationIn,
      })
      .add({
        targets: ".intro-3",
        opacity: 0,
        scale: heading.scaleOut,
        duration: heading.durationOut,
        easing: "easeInExpo",
        delay: heading.delay,
      });
  }, []);

  return (
    <section id="one">
      <div className="left">
        <div className="head-wrapper">
          <h1 className="heading">
            <span className="intro intro-1" style={{ color: "cyan" }}>
              Ideas
            </span>
            <span className="intro intro-2" style={{ color: "cyan" }}>
              Thoughts
            </span>
            <span className="intro intro-3" style={{ color: "cyan" }}>
              Perceptions
            </span>
          </h1>
        </div>
      </div>

      <div className="right">
        <div
          className="rotating-circle-container"
          style={{ width: "1000px", height: "1000px" }}
        ></div>
      </div>
    </section>
  );
};

export default HomePage;
