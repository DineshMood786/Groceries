const mongoose = require("mongoose");

// New Products
const productSchema = mongoose.Schema({
  productName: String,
  category: String,
  image: String,
  price: Number,
  description: String,
});

const productModel = mongoose.model("newProducts", productSchema);

module.exports = productModel;
