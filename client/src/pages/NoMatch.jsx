import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Confetti from 'react-confetti'; 
import Jumbotron from '../components/Jumbotron';

const NoMatch = () => {
  useEffect(() => {

    setIsConfettiActive(true);

    const confettiTimeout = setTimeout(() => {
      setIsConfettiActive(false);
    }, 5000);
    return () => clearTimeout(confettiTimeout);
  }, []); 
  const [isConfettiActive, setIsConfettiActive] = React.useState(false);

  return (
    <div>
      {isConfettiActive && <Confetti />}

      <Jumbotron fluid style={{ backgroundColor: 'hotpink' }}>
        <h1 className="display-4">CHEERS!</h1>
        <h2 className="lead">You Must Be Tipsy</h2>
        <Link to="/">HAPPY HOUR UNCODED</Link>

        <h1>
          <span role="img" aria-label="Face With Rolling Eyes Emoji">
            🥂
          </span>
        </h1>
        <iframe
          src="https://giphy.com/embed/d3dIaJLb3TXRwxyg"
          width="480"
          height="360"
          className="giphy-embed"
          allowFullScreen
          title="Giphy Embed"
        ></iframe>
        <p>
          <a href="https://giphy.com/gifs/chandon-d3dIaJLb3TXRwxyg">via GIPHY</a>
        </p>
      </Jumbotron>
    </div>
  );
};

export default NoMatch;
