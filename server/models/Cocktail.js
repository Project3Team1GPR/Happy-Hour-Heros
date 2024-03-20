const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const ingredient = new Schema({
  name: {
    type: String
  },
  measurement: {
    type: String
  },
  _id: false
})

const cocktailSchema = new Schema({
  drinkId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  ingredients: {
    type: [ingredient]
  },
  instructions: {
    type: String
  },
  image: {
    type: String
  },
  category: {
    type: String
  }
});

const Cocktail = mongoose.model('cocktail', cocktailSchema);

module.exports = Cocktail;
