import React from 'react';
import { Link } from 'react-router-dom';
import Jumbotron from '../components/Jumbotron';

const NoMatch = () => {
  return (
    <div>
      <Jumbotron style={{ backgroundColor: 'hotpink' }}>
        <h1>CHEERS!</h1>
        <h2>You Must Be Tipsy</h2>
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

