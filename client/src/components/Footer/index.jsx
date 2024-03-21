import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";

export default function Footer() {
  return (
  <footer className="bg-dark text-light py-2 text-center fixed-bottom mt-5">
      <div className="container footer-icons">
        <a
          href="https://linkedin.com/in/gavinpmeyer"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        <a
          href="https://www.linkedin.com/in/hjennip"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        <a
          href="https://www.linkedin.com/in/rjv123"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
      </div>
  </footer>
  );
}
