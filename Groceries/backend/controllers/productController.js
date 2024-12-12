const productModel = require("../models/productModel");

// Save product
exports.newProducts = async (req, res) => {
  const newProducts = new productModel(req.body);
  newProducts
    .save()
    .then(() => {
      res.send({ message: "Product created successfully" });
    })
    .catch((err) => {
      res.send({ error: err });
    });
};

//Get Products

exports.getProducts = async (req, res) => {
  productModel
    .find()
    .then((products) => {
      res.send(products);
    })
    .catch((err) => {
      res.json({ message: "Error retrieving data", error: err });
    });
};
