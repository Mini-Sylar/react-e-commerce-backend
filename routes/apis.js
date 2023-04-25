const express = require("express");
const Product = require("../models/Product");
const Order = require("../models/Order");

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

// place order
router.post("/place-order", (req, res, next) => {
  Order.create(req.body)
    .then(() => {
      res.send({
        message: "Order Placed Successfully",
        order: req.body,
      });
    })
    .catch(next);
});

module.exports = router;
