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
    default: "",
  },
  order_processed: {
    type: Boolean,
    default: false,
  },
  order_cancelled: {
    type: Boolean,
    default: false,
  },
  user_id: {
    type: String,
    required: true,
  },
  percentage_complete: {
    type: Number,
    default: 0,
  },
  order_placement_date: {
    type: Date,
    default: Date.now,
  },
  expected_delivery_date: {
    type: Date,
    default: "",
  },
  delivery_address: {
    type: String,
    default: "",
  },
});

OrderSchema.pre("save", function (next) {
  if (this.delivery_type === "Standard") {
    this.expected_delivery_date = new Date(
      Date.now() + 3 * 24 * 60 * 60 * 1000
    );
  }

  if (this.delivery_type === "Express") {
    this.expected_delivery_date = new Date(
      Date.now() + 1 * 24 * 60 * 60 * 1000
    );
  }

  next();
});

const Order = mongoose.model("order", OrderSchema);

module.exports = Order;
