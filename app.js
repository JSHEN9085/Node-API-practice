const express = require('express');
const app = express();
const morgan = require('morgan'); //console.log the request in terminal while using postman, just a package
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const password = config.password;
require('dotenv').config()

const productRouters = require('./api/routes/products'); // require the module in this file route;
const orderRouters = require('./api/routes/orders'); // require the module in this file route;

mongoose.connect(`mongodb+srv://jshen9085:${process.env.password}@cluster0-h4nd4.mongodb.net/test?retryWrites=true`)

app.use(morgan('dev')) //execute line 3
app.use(bodyParser.urlencoded({extended: false})); //bodyParser need to be in front of Routers
app.use(bodyParser.json());//bodyParser need to be in front of Routers

//server send response header to browser and let clients have access
//so must set this part before routers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // '*' means giving access to anyone
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'PUT', 'POST', 'PATCH', 'DELETE', 'GET'); //notify browser what request it may send to the server
    return res.status(200).json({});
  }
  next(); //if nothing get into the if block, keep running to the next step
});

//app.use is a middleware, Middleware functions are functions that have access to the request object (req), the response object (res), and the next function in the application’s request-response cycle.
//reference: https://expressjs.com/en/guide/writing-middleware.html
app.use('/products', productRouters); //request match the 1st argument will processed by the 2nd argument;
app.use('/orders', orderRouters); //same as above line (line 8)

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status(400);
  next(error); //forware the error request;
})

app.use((error, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error:{
      message: error.message
    }
  })
})


module.exports = app
