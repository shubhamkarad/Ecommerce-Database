const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const PORT = 8081;
const passport = require('passport');
const path = require('path');
const routes = require('./routes');
const cors = require('cors');

require('dotenv').config();

// Create the Express application
const app = express();

// Allows our  application to make HTTP requests to Express application
app.use(cors())
// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Pass the global passport object into the configuration function
require('./passport')(passport);

// This will initialize the passport object on every request
app.use(passport.initialize());

routes(app);
mongoose.connect(config.mongoUrl, { useNewUrlParser: true }, () => console.log("CONNECTED TO DATABASE"));

//  the output will go to the ./public directory
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log('Server listening on port: ' + PORT);
});