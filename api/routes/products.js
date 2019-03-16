const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
      message: 'Handling get request to /products'
    })
})  //first argument is URL

router.post('/', (req, res, next) => {
  const product = {
    name: req.body.name,
    price: req.body.price
  }
    res.status(201).json({
      message: 'Handling post request to /products',
      createdProduct: product
    })
})

router.get('/:id', (req, res, next) => {
    const id = req.params.id; //get the id from the params
    if (id === 'special'){
      res.status(200).json({
        message: 'You found the special ID',
        id: id
      })
    } else {
      res.status(200).json({
        message: 'You passed an ID'
      })
    }
})

router.patch('/:id', (req, res, next) => {
    res.status(200).json({
      message: 'Updated product'
    });
})

router.delete('/:id', (req, res, next) => {
    res.status(200).json({
      message: 'Delete product'
    });
})

module.exports = router;
