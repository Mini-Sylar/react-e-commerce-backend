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
    .catch((error) => {
      res.status(400).send({
        message: "Products not found",
      });
    });
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
    .catch((error) => {
      res.status(400).send({
        message: "Order Failed",
      });
    });
});

router.post("/cancel-order", checkAuth, (req, res, next) => {
  Order.findByIdAndUpdate(req.body.order_id, {
    order_cancelled: true,
    percentage_complete: 0,
    expected_delivery_date: "",
  })
    .then(() => {
      res.status(200).send({
        message: "Order cancelled successfully",
        order: req.body.order_id,
      });
    })
    .catch(() => {
      res.status(400).send({
        message: "Order cancellation failed",
      });
    });
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
    .catch((error) => {
      res.status(400).send({
        message: "Orders not found",
      });
    });
});

// Auth Routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

module.exports = router;
