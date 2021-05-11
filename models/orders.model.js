const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Orders Schema
const Orders = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  details: {
    type: Array,
    required: true
  }
}, {
  timestamps: true
})

//Export Orders Schema
module.exports = mongoose.model('Orders', Orders);