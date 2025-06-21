const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const cartSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "user",
      required: true,
    },
    product: {
      type: Types.ObjectId,
      ref: "product",
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
      required: true,
    },
  },
  { timestamps: true }
);

const cartModel = mongoose.model("cart", cartSchema);

module.exports = { cartModel };
