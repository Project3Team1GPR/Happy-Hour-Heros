import { useEffect } from 'react';
import auth from '../utils/auth'
import { QUERY_GET_ME } from "../utils/queries";
import {useQuery} from '@apollo/client'
import { saveCocktailIds, getSavedCocktailIds } from "../utils/localStorage";

import React from "react";
import Carousel from "react-bootstrap/Carousel";


const Home = () => {


  if(auth.loggedIn()){
    const {  data } = useQuery(QUERY_GET_ME);
    const userData = data?.me.savedCocktails || [];
    const cocktailData =  userData.map((item)=> item.drinkId)
    saveCocktailIds(cocktailData);
    console.log(cocktailData);
  }

  return (
    <div className="container">
      <Carousel interval={4000}>
        {/* First Carousel Item */}
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.pngall.com/wp-content/uploads/5/Summer-Cocktail-PNG-Transparent-HD-Photo.png"
            alt="Summer Cocktail"
            style={{
              maxHeight: "500px",
              objectFit: "contain",
              width: "auto",
              margin: "0 auto",
            }}
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.pngall.com/wp-content/uploads/5/Summer-Cocktail-PNG-Transparent-HD-Photo.png"
            alt="Summer Cocktail"
            style={{
              maxHeight: "500px",
              objectFit: "contain",
              width: "auto",
              margin: "0 auto",
            }}
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.pngall.com/wp-content/uploads/5/Summer-Cocktail-PNG-Transparent-HD-Photo.png"
            alt="Summer Cocktail"
            style={{
              maxHeight: "500px",
              objectFit: "contain",
              width: "auto",
              margin: "0 auto",
            }}
          />
        </Carousel.Item>
      </Carousel>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h3 style={{ color: "black", fontSize: "24px" }}>
          WELCOME TO HAPPY HOUR UNCODED
        </h3>
        <p style={{ color: "black", fontSize: "18px" }}>YOUR COCKTAIL CODEX</p>
      </div>

      {/* Second Carousel Item */}

      {/* Add more Carousel.Item as needed */}
    </div>
  );
};

export default Home;
