const {Cart} = require('../models');
  
  //Callback function for path localhost:8081/user/cart/
  //Gathers all the documents in the Cart collection
  //Only for checking the working of API
  const cartItems = async (req, res) => {
    try {
      message = await Cart.find();
      status = 200;
    } catch (err) {
      console.log('Some error occured', err);
      console.log(err.stack);
      status = 400;
      message = 'Bad request'
    }
    res.status(status).send({
      message: message.map((cat) => ({
        email:cat.email,
        products:cat.products
      }))
    });
  }

  //Function to check if product already exists in the cart or not
  function exists(products,productsToAdd){
      for(let i=0;i<products.length;i++){
          if(products[i][0]==productsToAdd[0]){
              return true;
          }
      }
      return false;
  }
  
  //Callback function for post on path localhost:8081/user/cart/
  const addItems = async (req, res) => {
    console.log('Add to  Cart');
  
    //Gather required information from request body
    const {
      email,
      productsToAdd
    } = req.body;

    let status;
    let message;
  
    try {
        //check if user has already entry in cart or not
        var cat = await Cart.findOne({
            email: email
        });
        //if user doesn't have a entry in cart
        if(cat==undefined){
            //Create a new document in Cart collection with specified product information
            const cart = new Cart({
                email: email,
                products: productsToAdd
              });
              await cart.save();
              status = 200;
              message = 'Cart created successfully';
        }
      else{
          //if user already has cart entry
          message="";
          let products=cat.products; //call existing cart items
          //check if existing cart includes specified product or not
          //if specified product already exists, keep the cart as it is
          if(exists(products,productsToAdd[0])){
            cat.products=products;
            await cat.save();
          }
          else{
            //if product doesn't exist in the cart of that user
            //add product to the cart and save changes
            products.push(productsToAdd[0]);
            cat.products=products;
            await cat.save();
          }
         status=200;
         message+='Cart updated successfully';
      }
    } catch (err) {
      console.log('Some error occured', err);
      console.log(err.stack);
      status = 400;
      message = 'Bad request';
    }
  
    res.status(status).send({
      message
    });
  }
  
  //Callback function for path localhost:8081/user/cart/id
  const getCartById = async (req, res) => {
    const {
      email
    } = req.body; //Gather user email from request body
  
    let status;
    let message;
  
    try {
      //call all the products in the cart for specified user
      const cat = await Cart.find({
        email: email
      });
      status = 200;
      message = cat;
  
    } catch (err) {
      console.log('Some error occured', err);
      console.log(err.stack);
      status = 400;
      message = 'Bad request!!!'
    }
  
    res.status(status).send({
      message
    });
  }

  //Callback function for path localhost:8081/user/cart/update
  const updateCart = async (req,res)=>{
    const {
      email,
      productsToUpdate
    } = req.body;

    let status;
    let message;

    try{
      //update cart with the specified values
      await Cart.updateOne({email:email},{products:productsToUpdate});
      status=200;
      message="Cart updated successfully";
      console.log(message);
    }
    catch(err){
      status=400;
      message=err;
    }
    return res.status(status).send(message);
  }

  //Callback function for path localhost:8081/user/cart/empty
  const emptyCart = async (req,res)=>{
    const {
      email
    } = req.body;

    let status;
    let message;

    try{
      //Empty the cart of specified user
      await Cart.updateOne({email:email},{products:[]});
      status=200;
      message="Products removed from cart successfully";
      console.log(message);
    }
    catch(err){
      status=400;
      message=err;
    }
    return res.status(status).send(message);
  }
  
  module.exports = {
    cartItems,
    addItems,
    getCartById,
    emptyCart,
    updateCart
  }