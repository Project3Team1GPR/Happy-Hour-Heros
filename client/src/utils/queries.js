import { gql } from '@apollo/client';

export const QUERY_GET_ME = gql`
  query me {
    me {
      _id
    username
    cocktailCount
    isPremiumService
    savedCocktails {
      _id
      name
      category
      instructions
      image
      drinkId
      ingredients {
        name
        measurement
      }
    }
  }
}
`;
