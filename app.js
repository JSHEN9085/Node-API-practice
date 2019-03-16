const express = require('express');
const app = express();

const productRouters = require('./api/routes/products'); // require the module in this file route;
const orderRouters = require('./api/routes/orders'); // require the module in this file route;

//app.use is a middleware, Middleware functions are functions that have access to the request object (req), the response object (res), and the next function in the application’s request-response cycle.
//reference: https://expressjs.com/en/guide/writing-middleware.html
app.use('/products', productRouters); //request match the 1st argument will processed by the 2nd argument;
app.use('/orders', orderRouters); //same as above line (line 8)




module.exports = app
