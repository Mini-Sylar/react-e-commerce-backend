const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

router.get("/get-products", (req, res, next) => {
  Product.find({})
    .then((products) => {
      res.send(products);
    })
    .catch(next);
});

router.post("/add-product", (req, res, next) => {
  Product.create(req.body)
    .then(() => {
      res.send("Product Added Successfully");
    })
    .catch(next);
});

module.exports = router;
