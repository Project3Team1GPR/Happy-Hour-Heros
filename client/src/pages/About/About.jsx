import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import "./About.css";
// import AgeVerificationModal from "../../components/AgeVerificationModal";

function About() {
  return (
    <div className="about-container">
      {/* <AgeVerificationModal></AgeVerificationModal> */}

      <div className="vision">
        <div className="container">
          <div className="about-div"></div>
          <div></div>
          <div className="vision-div">
            <h1 className="text-center">About Us</h1>
            <h6 className="text-center">
              <p>
                Welcome to Happy Hour Uncoded, where passion for coding meets
                the joy of socializing over drinks. We are{" "}
                <span style={{ textDecoration: "underline" }}>
                  Happy Hour Heros
                </span>
                , a team of three junior software developers who share a common
                love for bringing people together and crafting delicious
                cocktails.
              </p>

              <p>
                Our journey began when we realized that our shared interests
                extended beyond lines of code and into the realm of mixology.
                Combining our coding skills with our enthusiasm for creating and
                sharing cocktail recipes, we embarked on a mission to make Happy
                Hour more enjoyable and accessible for everyone.
              </p>

              <p>
                At Happy Hour Uncoded, we strive to bring innovation to the
                world of cocktails by leveraging our technical expertise to
                curate a collection of unique and delicious drink recipes.
                Whether you're a seasoned mixologist or a novice looking to
                experiment with new flavors, our platform provides you with a
                plethora of cocktail options right at your fingertips.
              </p>

              <p>
                Join us on our journey as we blend our passion for software
                development with the art of mixology, one drink at a time.
                Cheers to coding, creativity, and unforgettable Happy Hours!
              </p>
            </h6>
          </div>
        </div>
      </div>

      <div className="members">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 mb-4">
              <div className="link-icons d-flex justify-content-center">
                <Card style={{ width: "20rem" }}>
                  <Card.Img
                    variant="top"
                    src="../src/assets/images/jenni.jpeg"
                    className="mx-auto d-block"
                    style={{ width: "225px", height: "260px" }}
                  />
                  <Card.Body>
                    <Card.Title>Jenni Park</Card.Title>
                    <Card.Text>My drink of choice is a Dirty Martini</Card.Text>
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
            </div>
            <div className="col-lg-4 mb-4">
              <div className="link-icons d-flex justify-content-center">
                <Card style={{ width: "20rem" }}>
                  <Card.Img
                    variant="top"
                    src="../src/assets/images/rachel.jpeg"
                    className="mx-auto d-block"
                    style={{ width: "235px", height: "260px" }}
                  />
                  <Card.Body>
                    <Card.Title>Rachel V</Card.Title>
                    <Card.Text>My drink of choice is a Japanese Whiskey Neat</Card.Text>
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
            </div>
            <div className="col-lg-4 mb-4">
              <div className="link-icons d-flex justify-content-center">
                <Card style={{ width: "20rem" }}>
                  <Card.Img
                    variant="top"
                    src="../src/assets/images/gavin.jpeg"
                    className="mx-auto d-block"
                    style={{ width: "225px", height: "260px" }}
                  />
                  <Card.Body>
                    <Card.Title>Gavin Meyer</Card.Title>
                    <Card.Text>My drink of choice is a Old Fashioned</Card.Text>
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
        </div>
      </div>
    </div>
  );
}

export default About;
