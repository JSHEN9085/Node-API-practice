const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  product: {type: mongoose.Schema.Types.ObjectId, ref: "Product"}, //reference to "Product" model
  quantity: {type: Number, default: 1, required: true}
});

module.exports = mongoose.model('Order', orderSchema); //1st argument is the name you want to use, 2nd argument is the actual module it refer to
