const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product')

//get is tested
router.get('/', (req, res, next) => {
  Order.find()
  .select("quantity product _id")
  .populate('product') //get the detail information of product instead of just ID, adding second argument .populate('product', 'name') will add name only
  .exec()
  .then(orders => {
    res.status(200).json(orders)
  })
  .catch(err => {
    res.status(500).json({error: err})
  })
});

//post is tested
router.post('/', (req, res, next) => {
  Product.findById(req.body.productId)
    .then(product => {
      if(!product){
        return res.status(404).json({
          message: "product not found"
        })
      }
      const order = new Order({
          _id: new mongoose.Types.ObjectId(),
          quantity: req.body.quantity,
          product: req.body.productId
      });
      return order.save() // no exec() is needed for save() function
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: 'Orders were created',
        createdOrder: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity
        }
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    })
});

//get by id is tested
router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Order.findById({_id: id})
  .select("quantity product _id")
  .exec()
  .then(order => {
    console.log("From database", order);
    if(order){
      res.status(200).json(order)
    } else {
      res.status(400).json({message: "This order is not existed"})
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  })
});

//delete is tested
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  Order.remove({_id: id})
  .exec()
  .then(result => {
    res.status(200).json({result});
  })
  .catch(err => {
    res.status(500).json({
      error: err
    })
  })
});


module.exports = router;
