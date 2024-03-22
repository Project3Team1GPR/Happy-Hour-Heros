import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Jumbotron from "../components/Jumbotron";
import { useMutation } from "@apollo/client";
import { SET_PREMIUM } from "../utils/mutations";
import { useGlobalContext } from "../utils/GlobalState";

function Success() {
  const navigate = useNavigate();
  const [redirectTimer, setRedirectTimer] = useState(null);
  const [setPremium, { error }] = useMutation(SET_PREMIUM);
  const [user, setUser] = useGlobalContext();

  useEffect(() => {
    setPremium();
    setUser({ ...user, isPremiumService: true });

    // Redirect to the saved page after a delay
    const timer = setTimeout(() => {
      navigate("/saved");
    }, 3000);

    // Set the timer in state
    setRedirectTimer(timer);

    // Clean up the timer to avoid memory leaks
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div>
      <Jumbotron>
        <h1>Success!</h1>
        <h2>
          Thank you for your purchase! Redirecting to the saved cocktails
          page...
        </h2>
      </Jumbotron>
    </div>
  );
}

export default Success;
