import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
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
            <h4 className="text-center">
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
            </h4>
          </div>
        </div>
      </div>

      <div className="members">
        <div>
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
              <Card.Link href="#">Github</Card.Link>
              <Card.Link href="#">LinkedIn</Card.Link>
            </Card.Body>
          </Card>
        </div>

        <div>
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
              <Card.Link href="#">Github</Card.Link>
              <Card.Link href="#">LinkedIn</Card.Link>
            </Card.Body>
          </Card>
        </div>

        <div>
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
              <Card.Link href="#">Github</Card.Link>
              <Card.Link href="#">LinkedIn</Card.Link>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default About;
