import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-container">
      <div className="container">
        <h1 className="text-center">About</h1>
        <h4 className="text-center">
          Center aligned text on all viewport sizes.
        </h4>
      </div>
      <div>
        <h1 className="text-center">Vision</h1>
        <h4 className="text-center">add later</h4>
      </div>
      <div>
        <h1 className="text-center">Jenni Park</h1>
        <h4 className="text-center">hey girl, add your bio</h4>
      </div>
      <div>
        <h1 className="text-center">Rachel V</h1>
        <h4 className="text-center">things</h4>
      </div>
      <div>
        <h1 className="text-center">Gavin Meyer</h1>
        <h4 className="text-center">pls put things here</h4>
      </div>
    </div>
  );
}

export default About;
