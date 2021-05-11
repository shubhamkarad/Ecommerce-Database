const { Category } = require('../models');

// Get all Categories
const getProductCategories= async (req, res) => {
    try {
        message = await Category.find();
        status = 200;
      } catch(err) {
        console.log('Some error occured', err);
        console.log(err.stack);
        status = 400;
        message = 'Bad request'
      }
      res.status(status).send({ message: message.map((cat) => ({
        id: cat.id,
        name: cat.name
      })) });
}
// Adding the category
const addCategory = async (req, res) => {
    console.log('Add Category');
  
    const { id,name } = req.body;
  
    let status;
    let message;
  
    try {
      const cat = new Category({ id:id,name:name });
      await cat.save();
      status = 200;
      message = 'Category created successfully';
    } catch (err) {
      console.log('Some error occured', err);
      console.log(err.stack);
      status = 400;
      message = 'Bad request';
    }
  
    res.status(status).send({ message });
}
// Get category by id
const getCategory = async (req, res) => {
    const { id } = req.params;
  
    let status;
    let message;
  
    try {
      const cat = await Category.find({ id:id });
      status = 200;
      message = cat;
  
    } catch(err) {
      console.log('Some error occured', err);
      console.log(err.stack);
      status = 400;
      message = 'Bad request!!!'
    }
  
    res.status(status).send({ message });
  }

module.exports = {
    getProductCategories,
    addCategory,
    getCategory
}