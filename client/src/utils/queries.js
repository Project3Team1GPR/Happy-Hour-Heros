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

export const QUERY_GET_POSTS = gql`
  query posts {
    posts {
      _id
      title
      content
      author {
        _id
        username
      }
      createdAt
      updatedAt
    }
    me {
      _id
      username
    }
  }
`;