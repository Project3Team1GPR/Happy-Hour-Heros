const { User, Category } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password, isPremiumService }) => {
      const user = await User.create({ username, email, password, isPremiumService });
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    saveCocktail: async (parent, { cocktailInput }, context) => {
      // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
      console.log("HERE", cocktailInput);
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $push: { savedCocktails: cocktailInput },
          },
          {
            new: true,
            // runValidators: true,
          }
        );
        return updatedUser;
      }
      // If user attempts to execute this mutation and isn't logged in, throw an error
      throw AuthenticationError;
    },
    // Make it so a logged in user can only remove a cocktail from their own profile
    removeCocktail: async (parent, { drinkId }, context) => {
      if (context.user._id) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedCocktails: { drinkId } } },
          { new: true }
        );

        return updatedUser;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
