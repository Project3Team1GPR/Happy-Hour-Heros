import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Cookies from "js-cookie";

function AgeVerificationModal() {
  const ageVerified = Cookies.get("ageVerified");

  const [show, setShow] = useState(true);

  const verifyAge = () => {
    Cookies.set("ageVerified", "true", { expires: 7 });
    setShow(false);
  };
  const handleRedirect = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button> */}

      <Modal
        show={(ageVerified === null || ageVerified === undefined) && show}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>You must be 21 years or older to use this site</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={verifyAge}>
            I am 21 years or older
          </Button>
          <Button variant="primary" onClick={handleRedirect}>
            I'm too young
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AgeVerificationModal;
