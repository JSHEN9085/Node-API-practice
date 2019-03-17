const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');
const checkAuth = require('../auth/check-auth');

//get is tested
router.get('/', (req, res, next) => {
  Product.find()
  .select("name price _id") //ask mongoose to select specific data, no ",", just use space to separate them
  .exec()
  .then(products => {
    console.log(products);
    res.status(200).json({products})
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: err})
  })
})  //first argument is URL

//post is tested
router.post('/', checkAuth, (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(), //ObjectId make the id as unique;
    name: req.body.name,
    price: req.body.price
  });

  product.save()
  .then(result => {
    console.log(result);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });

  res.status(201).json({
    message: 'Handling post request to /products',
    createdProduct: product
  });
});

//get:id is tested
router.get('/:id', (req, res, next) => {
    const id = req.params.id; //get the id from the params
    Product.findById(id)
    .select("name price _id")
    .exec() //Mongoose will not execute a query until then or exec has been called upon it.
    .then(product => {
      console.log("From database", product);
      if(product){
        res.status(200).json(product)
      } else {
        res.status(400).json({message: "No valid entry found by id"});
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
})

//patch is tested
router.patch('/:id', checkAuth, (req, res, next) => {
  const id = req.params.id;

  const updateOps = {};
  for (const ops of req.body){
    updateOps[ops.propName] = ops.value;
  }
  //for the testing in postman, use below format to test
  //[ {"propName": "name", "value": "new name"} ] or [ {"propName": "price", "value": "new price"} ]

  Product.update({_id: id}, {$set: updateOps } )
  .exec() //exec() is a mongoose function, and it is just executing above function
  .then(result => {
    console.log(result);
    res.status(200).json({result})
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: err})
  });
})

//delete is tested
router.delete('/:id', checkAuth, (req, res, next) => {
  const id = req.params.id;
  Product.remove({_id: id})
  .exec()
  .then(result => {
    console.log(result);
    res.status(200).json({result})
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  })
})

module.exports = router;
