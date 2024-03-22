const { User, Cocktail, Post } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
          .populate("savedCocktails")
          .populate({
            path: "posts",
            populate: { path: "author", select: "username" }
          });
      }
      throw AuthenticationError;
    },
    cocktails: async () => {
      return await Cocktail.find({});
    },
    users: async () => {
      return await User.find({}).populate;
    },
    posts: async () => {
      return await Post.find({}).sort({ createdAt: -1 }).populate("author");
    },
  },

  Mutation: {
    addUser: async (
      parent,
      { username, email, password, isPremiumService }
    ) => {
      const newUser = await User.create({
        username,
        email,
        password,
        isPremiumService,
      });
      const user = await User.findById(newUser._id).populate("savedCocktails");
      const token = signToken(user);

      return { token, user };
    },
    premium: async (parent, args, context) => {
      const updateUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { isPremiumService: true },
        { new: true }
      );

      return updateUser;
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email }).populate("savedCocktails");
      console.log("USER", user);
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
        cocktail = await Cocktail.findOne({ drinkId: cocktailInput.drinkId });
        // if cocktail doesn't exist, add to Coctail collection
        if (!cocktail) {
          console.log("New Cocktail");
          cocktail = await Cocktail.create(cocktailInput);
        }
        // now, you have a Coctail document from database
        console.log(cocktail);

        const dbUser = await User.findById(context.user._id).populate(
          "savedCocktails"
        );
        console.log(dbUser);

        const foundCocktail = dbUser.savedCocktails.find(
          (ct) => ct.drinkId == cocktail.drinkId
        );
        console.log("FOUND", foundCocktail);
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
            populate: { path: "savedCocktails" },
          }
        );
        console.log(updatedUser);
        return updatedUser;
      }
      // If user attempts to execute this mutation and isn't logged in, throw an error
      throw AuthenticationError;
    },
    // Make it so a logged in user can only remove a cocktail from their own profile
    removeCocktail: async (parent, { cocktailId }, context) => {
      console.log("id", cocktailId);
      if (context.user._id) {
        const dbUser = await User.findById(context.user._id);
        console.log(dbUser);

        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedCocktails: cocktailId } },
          { new: true }
        ).populate("savedCocktails");

        return updatedUser;
      }
      throw AuthenticationError;
    },
    createPost: async (parent, { postInput }, context) => {
      const { title, content } = postInput;
      console.log("Title:", title);
      console.log("Content:", content);
      
      // Check if user is authenticated
      if (!context.user) {
        throw new AuthenticationError("User not authenticated");
      }
    
      try {
        // Create a new post
        let newPost = new Post({
          title,
          content,
          author: context.user._id,
        });
    
        // Save the new post to the database
        newPost = await newPost.save();
    
        // Populate the author field with the username
        newPost = await Post.findById(newPost._id).populate("author", "username");
    
        // Now, push the new post's ID to the user's posts array
        await User.findByIdAndUpdate(context.user._id, {
          $push: { posts: newPost._id },
        });
    
        console.log("New Post Created:", newPost);
        return newPost;
      } catch (error) {
        console.error("Error creating post:", error);
        throw error; // Re-throw the error to be handled by GraphQL
      }
    }
    
},
};

module.exports = resolvers;
