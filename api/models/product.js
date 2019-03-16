const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {type: String, required: true}, // required instead of require, don't forget the pass tense
  price: {type: Number, required: true}
});

module.exports = mongoose.model('Product', productSchema); //1st argument is the name you want to use, 2nd argument is the actual module it refer to
