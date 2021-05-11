const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create User Schema
const Cart = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  products: {
    type: Array,
    required: true
  }
}, {
  timestamps: true
})

//Export User Schema
module.exports = mongoose.model('Cart', Cart);