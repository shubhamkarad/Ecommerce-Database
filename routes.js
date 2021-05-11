const express = require('express');
//Controllers
const userController = require('./controllers/user.controller');
const productCategoryController = require('./controllers/productCategory.controller');
const productController = require('./controllers/product.controller');
const filterController = require('./controllers/filter.controller');
const contactController = require('./controllers/contact.controller');
const feedbackController = require('./controllers/feedback.controller');
const cartController = require('./controllers/cart.controller');
const orderController = require('./controllers/orders.controller');
const passport = require('passport');


const userRouter = express.Router();
//For protected routes
const option =passport.authenticate('jwt', {
  session: false
})
//Login routes
userRouter.post('/', userController.create);
userRouter.post('/login', userController.loginFunction);
userRouter.post('/logout', userController.logout);
userRouter.get('/login/auth', option, userController.auth);
//Products routes
userRouter.get('/product/', productController.getProducts);
userRouter.get('/product/:id', productController.getProduct);
userRouter.post('/product/add', option, productController.addProduct);
//Category routes
userRouter.post('/category/add', option, productCategoryController.addCategory);
userRouter.get('/category/', productCategoryController.getProductCategories);
userRouter.get('/category/:id', filterController.getProductByCategories);
userRouter.get('/categoryById/:id', productCategoryController.getCategory);
// Contact us form 
userRouter.post('/contact', contactController.saveResponse);
//Feedback form
userRouter.post('/feedback', feedbackController.saveFeedback);
// Cart routes
userRouter.post('/cart',option, cartController.addItems);
userRouter.get('/cart', option, cartController.cartItems);
userRouter.post('/cart/id', option,cartController.getCartById);
userRouter.put('/cart/empty', option,cartController.emptyCart);
userRouter.put('/cart/update', option, cartController.updateCart);
// Orders routes
userRouter.post('/order/add', option, orderController.addOrder);
userRouter.post('/order', option,orderController.ordersByEmail);
const routes = (app) => {
    // Default Route 
    app.use('/user', userRouter);
    // Check your Api
    app.get('/', (req, res) => {
        return res.send({ message: "Service is running!" });
    })
}

module.exports = routes;