import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";

const StripePage = () => {
  const [redirectToSuccess, setRedirectToSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvc, setCVC] = useState("");

  const handlePaymentSubmit = (event) => {
    event.preventDefault();

    // Perform validation
    if (!cardNumber || !expirationDate || !cvc) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    // Handle payment submission logic here
    // add actual payment logic here

    // If payment is successful, set state to redirect to success page
    setRedirectToSuccess(true);
  };

  if (redirectToSuccess) {
    // Redirect to success page with success message in the location state
    return <Navigate to="/success" />;
  }

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Premium Account</h1>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form onSubmit={handlePaymentSubmit}>
        <Form.Group controlId="cardNumber">
          <Form.Label>Card Number:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter card number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="expirationDate">
          <Form.Label>Expiration Date:</Form.Label>
          <Form.Control
            type="text"
            placeholder="MM/YY"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="cvc">
          <Form.Label>CVC:</Form.Label>
          <Form.Control
            type="text"
            placeholder="CVC"
            value={cvc}
            onChange={(e) => setCVC(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Pay $2.99/month
        </Button>
      </Form>
    </Container>
  );
};

export default StripePage;

