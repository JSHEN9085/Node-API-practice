const http = require('http'); // "import" the http package, this step is for every NodeJS server;
const app = require('./app');

const port = process.env.PORT || 3000; //set the port;

const server = http.createServer(app); //pass in the file (line 2) as the argument of createServer

server.listen(port);

//starting server by running
//nodemon server.js
