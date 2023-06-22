const express = require("express");
const Product = require("../models/Product");
const Order = require("../models/Order");
const authController = require("../Controller/authController");
const checkAuth = require("../middleware/checkAuth");

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
router.post("/place-order", checkAuth, (req, res, next) => {
  Order.create(req.body)
    .then(() => {
      res.send({
        message: "Order Placed Successfully",
        order: req.body,
      });
    })
    .catch(next);
});

// get orders where user id matches
router.get("/get-orders/:id", checkAuth, (req, res, next) => {
  Order.find({ user_id: req.params.id })
    .then((orders) => {
      res.status(200).send({
        orders: orders,
        message: "Orders Fetched Successfully",
      });
    })
    .catch(next);
});

// Auth Routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

module.exports = router;
