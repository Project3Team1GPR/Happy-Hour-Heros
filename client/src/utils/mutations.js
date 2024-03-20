import { gql } from "@apollo/client";

export const LOGIN = gql`
 mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
      email
      savedCocktails {
        _id
        category
        drinkId
        image
        ingredients {
          measurement
          name
        }
        instructions
        name
      }
    }
  }
}
`;

export const SAVE_COCKTAIL = gql`
  mutation saveCocktail($cocktailInput: SavedCocktailInput!) {
    saveCocktail(cocktailInput: $cocktailInput) {
      _id
      email
      username
      cocktailCount
      savedCocktails {
        _id
        drinkId
        name
        category
        ingredients {
          name
          measurement
        }
        instructions
        image
      }
    }
  }
`;

export const REMOVE_COCKTAIL = gql`
  mutation removeCockatil($cocktailId: ID!) {
    removeCocktail(cocktailId: $cocktailId) {
      _id
      email
      username
      cocktailCount
      savedCocktails {
        _id
        drinkId
        name
        category
        ingredients {
          name
          measurement
        }
        instructions
        image
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        cocktailCount
        savedCocktails {
          _id
          category
          drinkId
          image
          ingredients {
            measurement
            name
          }
          instructions
          name
        }
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;

// export const ADD_USER = gql`
//   mutation addUser(
//     $firstName: String!
//     $lastName: String!
//     $email: String!
//     $password: String!
//   ) {
//     addUser(
//       firstName: $firstName
//       lastName: $lastName
//       email: $email
//       password: $password
//     ) {
//       token
//       user {
//         _id
//       }
//     }
//   }
// `;
