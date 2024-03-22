import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const StripePage = () => {
  const [redirectToSuccess, setRedirectToSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvc, setCVC] = useState('');

  const handlePaymentSubmit = (event) => {
    event.preventDefault();

    // Perform validation
    if (!cardNumber || !expirationDate || !cvc) {
      setErrorMessage('Please fill out all fields.');
      return;
    }

    // Handle payment submission logic here
    // Example: You can add actual payment logic here

    // If payment is successful, set state to redirect to success page
    setRedirectToSuccess(true);
  };

  if (redirectToSuccess) {
    // Redirect to success page with success message in the location state
    return <Navigate to="/success" />;
  }

  return (
    <>
    {redirectToSuccess ? (
        <Navigate to="/success" />
      ) : (
    <div>
      <h1>Stripe Payment Page</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handlePaymentSubmit}>
        <label>
          Card Number:
          <input
            type="text"
            placeholder="Enter card number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </label>
        <label>
          Expiration Date:
          <input
            type="text"
            placeholder="MM/YY"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
          />
        </label>
        <label>
          CVC:
          <input
            type="text"
            placeholder="CVC"
            value={cvc}
            onChange={(e) => setCVC(e.target.value)}
          />
        </label>
        <button type="submit">Pay $2.99/month</button>
      </form>
    </div>
  )}
  </>
  );
};

export default StripePage;

