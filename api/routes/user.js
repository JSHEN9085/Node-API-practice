const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

//post is tested
router.post('/signup', (req, res, next) => {
  User.find({email: req.body.email})
  .exec()
  .then(user => {
    if(user.length >= 1){ //User.find will find an array, if it is empty, it means this user is not registered before
      res.status(409).json({
        message: "User already exists"
      })
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => { //The second argument(here is 10) is the number of rounds to use when generating a salt.
        if(err){
          return res.status(500).json({error: err})
        } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            });
            user
              .save()
              .then(result => res.status(201).json({message: "User Created", user: user}))
              .catch(err => res.status(500).json({error: err}) )
          };
        });
      };
    });
});

router.post('/login', (req, res, next) => {
  User.find({email: req.body.email})
    .exec()
    .then(user => {
      if(user.length < 1){ //the result we got after User.find() is an array
        return res.status(401).json({message: 'Mail not found, user doesn\'t exist'})
      }

      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if(err){
          return res.status(401).json({message: 'Password auth failed'});
        }

        if(result){
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h"
            }
          )
          return res.status(200).json({message: 'Auth succeed', token: token});
        }

        res.status(401).json({message: "Auth failed"});

      })
    })
    .catch(err => res.status(500).json({error: err}))
})

//delete is tested
router.delete('/:userId', (req, res, next) => {
  User.remove({_id: req.params.userId})
  .exec()
  .then(result => res.status(200).json({message: 'User deleted'}) )
  .catch(err => res.status(500).json({error: err}))
})

module.exports = router;
