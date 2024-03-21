const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const bcrypt = require('bcrypt');
const cocktailSchema = require('./Cocktail');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  isPremiumService: {
    type: Boolean,
    default: false
  },
  savedCocktails:[{
    type: Schema.Types.ObjectId,
    ref: "cocktail"
  }]
},
{
  toJSON: {
    virtuals: true,
  },
}
);

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `cocktailCount` with the number of saved cocktails we have
userSchema.virtual('cocktailCount').get(function () {
  return this.savedCocktails.length;
});

const User = mongoose.model('user', userSchema);

module.exports = User;
