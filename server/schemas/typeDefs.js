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
    isPremiumService: Boolean
    posts: [Post]
  }

  type Ingredient {
    name: String,
    measurement: String
  }

  type Cocktail {
    _id: ID
    drinkId: String
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

  type Post {
    _id: ID!
    title: String!
    content: String!
    author: User! 
    createdAt: String!
    updatedAt: String!
    comments: [Comment]
  }

  type Comment {
    _id: ID!
    content: String!
    author: User!          
    createdAt: String!
    post: Post!
  }

  input PostInput {
    title: String!
    content: String!
  }

  input CommentInput {
    content: String!
    postId: ID!           
  }

  type Query {
   cocktails: [Cocktail]
   users: [User]
   me: User
   posts: [Post]
   postById(postId: ID!): Post
   commentsByPost(postId: ID!): [Comment]
  }

  input IngredientInput {
    name: String,
    measurement: String
  }

  input SavedCocktailInput {
    drinkId: String
    name: String
    ingredients: [IngredientInput]
    instructions: String
    image: String
    category: String
  }


  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!, isPremiumService: Boolean): Auth
    saveCocktail(cocktailInput: SavedCocktailInput): User
    removeCocktail(cocktailId: ID): User
    premium: User
    createPost(postInput: PostInput): Post
    removePost(postId: ID!): Post
    createComment(commentInput: CommentInput!): Comment
    deleteComment(commentId: ID!): Comment
  }
`;

module.exports = typeDefs;
