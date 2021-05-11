const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Contact = new Schema({
    name:{ type :String, required: true},
    email:{ type :String, required: true},
    phoneNo:{ type :Number, required: true},
    query:{ type :String, required: true},
},{ 
    timestamps:true
})

module.exports = mongoose.model('Contact', Contact);