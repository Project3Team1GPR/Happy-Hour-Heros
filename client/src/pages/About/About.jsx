import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import "./About.css";

function About() {
  return (
    <div className="about-container">
      <div className="vision">
        <div className="container">
          <div className="about-div">
            <h1 className="text-center">About</h1>

            <h4 className="text-center">
              Center aligned text on all viewport sizes.
            </h4>
          </div>
          <div></div>
          <div className="vision-div">
            <h1 className="text-center">Vision</h1>
            <h6 className="text-center">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for 'lorem ipsum' will
              uncover many web sites still in their infancy. Various versions
              have evolved over the years, sometimes by accident, sometimes on
              purpose (injected humour and the like).
            </h6>
          </div>
        </div>
      </div>

      <div className="members">
        <div className="link-icons">
          <Card style={{ width: "20rem" }}>
            <Card.Img
              variant="top"
              src="https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg"
            />
            <Card.Body>
              <Card.Title>Jenni Park</Card.Title>
              <Card.Text>Hi I'm Jenni.</Card.Text>
            </Card.Body>
            <Card.Body>
              <a
                href="https://github.com/hjenp22"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a
                href="https://www.linkedin.com/in/hjennip"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </Card.Body>
          </Card>
        </div>

        <div className="link-icons">
          <Card style={{ width: "20rem" }}>
            <Card.Img
              variant="top"
              src="https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg"
            />
            <Card.Body>
              <Card.Title>Rachel V</Card.Title>
              <Card.Text>Hi I'm Rachel.</Card.Text>
            </Card.Body>
            <Card.Body>
              <a
                href="https://github.com/1122c"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a
                href="https://www.linkedin.com/in/rjv123"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </Card.Body>
          </Card>
        </div>

        <div className="link-icons">
          <Card style={{ width: "20rem" }}>
            <Card.Img
              variant="top"
              src="https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg"
            />
            <Card.Body>
              <Card.Title>Gavin Meyer</Card.Title>
              <Card.Text>Hi I'm Gavin.</Card.Text>
            </Card.Body>
            <Card.Body>
              <a
                href="https://github.com/gmeyer24"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a
                href="https://linkedin.com/in/gavinpmeyer"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default About;
