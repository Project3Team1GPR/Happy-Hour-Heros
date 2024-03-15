const typeDefs = `
  type Category {
    _id: ID
    name: String
  }

  type User {
    _id: ID
    username: String
    email: String
    cocktailCount: Int
    savedCocktails: [Cocktail]
  }

  type Ingredient {
    name: String,
    measurement: String
  }

  type Cocktail {
    _id: ID
    name: String
    ingredients: [Ingredient]
    instructions: String
    image: String
    category: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
   me: User
  }

  input IngredientInput {
    name: String,
    measurement: String
  }

  input SavedCocktailInput {
    name: String
    ingredients: [IngredientInput]
    instructions: String
    image: String
    category: String
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveCocktail(cocktailInput: SavedCocktailInput): User
    removeCocktail(_id: ID): User
  }
`;

module.exports = typeDefs;
