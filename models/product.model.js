const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    id: {  type: String, required: true, unique: true },
    categoryId:{type: String, required: true},
    productName: { type: String, required: true},
    images:{type:Array,required:true},
    description: { type: String, required: true},
    price: { type:String, required: true}
}, {
  timestamps: true
})

module.exports = mongoose.model('Product', Product);

