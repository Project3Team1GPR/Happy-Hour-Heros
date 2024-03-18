import React from "react";
import Carousel from "react-bootstrap/Carousel";

const Home = () => {
  return (
    <div className="container">
      <Carousel>
        {/* First Carousel Item */}
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.pngall.com/wp-content/uploads/5/Summer-Cocktail-PNG-Transparent-HD-Photo.png"
            alt="Summer Cocktail"
            style={{
              maxHeight: "500px",
              objectFit: "contain",
              width: "auto",
              margin: "0 auto",
            }}
          />
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h3 style={{ color: "black", fontSize: "24px" }}>
              WELCOME TO HAPPY HOUR UNCODED
            </h3>
            <p style={{ color: "black", fontSize: "18px" }}>
              YOUR COCKTAIL CODEX
            </p>
          </div>
        </Carousel.Item>
        {/* Second Carousel Item */}
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://example.com/your-second-image-url.jpg" // Replace with your actual image URL
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Second Slide Label</h3>
            <p>Some representative placeholder content for the second slide.</p>
          </Carousel.Caption>
        </Carousel.Item>
        {/* Add more Carousel.Item as needed */}
      </Carousel>
    </div>
  );
};

export default Home;
