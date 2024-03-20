const { User, Cocktail } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("savedCocktails");
      }
      throw AuthenticationError;
    },
    cocktails: async () => {
      return await Cocktail.find({});
    },
    users: async () => {
      return await User.find({}).populate;
    }
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const newUser = (await User.create({ username, email, password }));
      const user = await User.findById(newUser._id).populate("savedCocktails");
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email }).populate("savedCocktails");
      console.log("USER", user)
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
        let cocktail;
        // search Coctail collection for cocktainInput by ApiId
        cocktail = await Cocktail.findOne({drinkId: cocktailInput.drinkId})
        // if cocktail doesn't exist, add to Coctail collection
        if (!cocktail) {
          console.log("New Cocktail");
          cocktail = await Cocktail.create(cocktailInput)
        }
        // now, you have a Coctail document from database
        console.log(cocktail)

        const dbUser = await User.findById(context.user._id).populate("savedCocktails");
        console.log(dbUser)

        const foundCocktail = dbUser.savedCocktails.find(ct => ct.drinkId == cocktail.drinkId);
        console.log("FOUND", foundCocktail)
        if (foundCocktail) {
          return dbUser;
        }

        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            // change this to push the ID of the database cocktatil
            $push: { savedCocktails: cocktail._id },
          },
          {
            new: true,
            // runValidators: true,
            populate: { path: "savedCocktails" }
          }
        );
        console.log(updatedUser)
        return updatedUser;
      }
      // If user attempts to execute this mutation and isn't logged in, throw an error
      throw AuthenticationError;
    },
    // Make it so a logged in user can only remove a cocktail from their own profile
    removeCocktail: async (parent, { cocktailId }, context) => {
      console.log("id", cocktailId)
      if (context.user._id) {
        const dbUser = await User.findById(context.user._id);
        console.log(dbUser);

        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedCocktails:  cocktailId } },
          { new: true }
        ).populate("savedCocktails");

        return updatedUser;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
