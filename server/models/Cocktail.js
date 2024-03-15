const { Schema } = require('mongoose');

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

module.exports = cocktailSchema;
