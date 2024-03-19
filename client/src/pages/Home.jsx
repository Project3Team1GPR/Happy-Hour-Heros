import { useEffect } from 'react';
import auth from '../utils/auth'
import { QUERY_GET_ME } from "../utils/queries";
import {useQuery} from '@apollo/client'
import { saveCocktailIds, getSavedCocktailIds } from "../utils/localStorage";

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
      <h1>Awesome Project</h1>
    </div>
  );
};

export default Home;
