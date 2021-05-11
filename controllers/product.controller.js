const { Product } = require('../models');
//Add a Product
const addProduct = async (req, res) => {
    console.log('Add Product');
    const { id,categoryId,productName,images,description,price } = req.body;
    let status;
    let message;
  
    try {
      const prod = new Product({ id:id,categoryId:categoryId,productName:productName,images:images,description:description,price:price });
      await prod.save();
      status = 200;
      message = 'Product created successfully';
    } catch (err) {
      console.log('Some error occured', err);
      console.log(err.stack);
      status = 400;
      message = 'Bad request';
    }
  
    res.status(status).send({ message });
}
// Get all Products
const getProducts= async (req, res) => {
    try {
        message = await Product.find();
        status = 200;
      } catch(err) {
        console.log('Some error occured', err);
        console.log(err.stack);
        status = 400;
        message = 'Bad request'
      }
      res.status(status).send({ message: message.map((prod) => ({
        id:prod.id,categoryId:prod.categoryId,productName:prod.productName,images:prod.images,description:prod.description,price:prod.price
      })) 
    });
}
// Get Product by Id
const getProduct = async (req, res) => {
    const { id } = req.params;
  
    let status;
    let message;
  
    try {
      const prod = await Product.find({ id:id });
      status = 200;
      message = prod;
  
    } catch(err) {
      console.log('Some error occured', err);
      console.log(err.stack);
      status = 400;
      message = 'Bad request!!!'
    }
  
    res.status(status).send({ message });
  }

  module.exports = {
    getProducts,
    getProduct,
    addProduct
}