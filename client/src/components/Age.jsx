import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Cookies from "js-cookie";

function Age() {
  //   Cookies.set("name", "value", { expires: 7 }); // Expires in 7 days
  Cookies.remove("age");
  const name = Cookies.get("name"); // => 'value'
  const age = Cookies.get("age");

  const [show, setShow] = useState(true); //general modal code starts here

  const handleClose = () => {
    Cookies.set("age", "value", { expires: 7 });
    setShow(false);
  };
  const handleShow = () => setShow(true);

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button> */}

      <Modal
        show={(age === null || age === undefined) && show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>{age}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Age;
