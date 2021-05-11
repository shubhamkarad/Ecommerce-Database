const {Orders} = require('../models');
const {Cart} = require('../models');
  
  //Callback function for path localhost:8081/user/order/
  const ordersByEmail = async (req, res) => {

    const {email} = req.body;
    
    try {
      //Querying all the orders of particular customer with the help of unique email
      message = await Orders.find({email:email});
      status = 200;
    } catch (err) {
      console.log('Some error occured', err);
      console.log(err.stack);
      status = 400;
      message = 'Bad request'
    }
    res.status(status).send({
        message: message
    });
  }

  
  
  //Callback function for path localhost:8081/user/order/add
  const addOrder = async (req, res) => {
    console.log('Proceeding to checkout');
  
    const {
      email,
      total_per_item,
      total
    } = req.body;
  
    let status;
    let message;
  
    try {
        //check if user already has any previous orders
        var cat = await Orders.findOne({
            email: email
        });
        var today = new Date();
        var month = new Array();
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";
        //store the date of order in format DD-Month-YYYY
        var date = today.getDate()+"-"+month[today.getMonth()]+"-"+today.getFullYear();
        //if user has no previous orders
        if(cat==undefined){
            //Call the products in the cart of the user
            const cart= await Cart.findOne({email:email});
            console.log(cart.products);
            
            //Create a new document in orders collection 
            //details is an array of Objects
            //Create an object for this order and save it in orders collection
            const order = new Orders({
                email: email,
                details: [{products:cart.products,total_per_item:total_per_item,total:total,orderedOn:date}]
              });
              await order.save();
              status = 200;
              message = 'Ordered successfully';
        }
      else{
        //If user already exists
        //Call the products in the cart of the user
        const cart= await Cart.findOne({email:email});

        //Create a new document in orders collection 
        //details is an array of Objects
        //Create an object for this order and save it in orders collection
        cat.details.push({products:cart.products,total_per_item:total_per_item,total:total,orderedOn:date});
        await cat.save();
        status=200;
        message='Orders updated successfully';
      }
     
    } catch (err) {
      console.log('Some error occured', err);
      console.log(err.stack);
      status = 400;
      message = 'Bad request';
    }
  
    res.status(200).send({
      message:message
    });
  }
  
  module.exports = {
    addOrder,
    ordersByEmail
  }