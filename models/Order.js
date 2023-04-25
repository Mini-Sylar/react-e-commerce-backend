const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  items: {
    type: Array,
    required: [true, "Cart items are required"],
  },
  totalItemCount: {
    type: Number,
    required: [true, "Item Count is required"],
  },
  delivery_type: {
    type: String,
    required: [true, "Delivery type is required"],
  },
  delivery_type_cost: {
    type: Number,
    required: [true, "Delivery type cost is required"],
  },
  cost_before_delivery_rate: {
    type: Number,
  },
  cost_after_delivery_rate: {
    type: Number,
  },
  promo_code: {
    type: String,
    required: false,
  },
  contact_number: {
    type: String,
    required: [true, "Contact number is required"],
  },
  order_processed: {
    type: Boolean,
    default: false,
  },
});

const Order = mongoose.model("order", OrderSchema);

module.exports = Order;
