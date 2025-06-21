const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const orderSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "user",
    },
    product: {
      type: Types.ObjectId,
      ref: "product",
    },
    customerInfo: {
      firstName: {
        type: String,
        trim: true,
        required: true,
      },
      companyName: {
        type: String,
        trim: true,
      },
      address: {
        type: String,
        trim: true,
        required: true,
      },
      city: {
        type: String,
        trim: true,
        required: true,
      },
      district: {
        type: String,
        trim: true,
        required: true,
      },
      phoneNumber: {
        type: Numebr,
        trim: true,
        required: true,
      },
      email: {
        type: String,
        trim: true,
        required: true,
      },
      postcode: {
        type: Number,
      },
    },
    paymentInfo: {
      paymentMethod: {
        type: String,
        required: true,
      },
      isPaid: {
        type: Boolean,
        default: false,
      },
      val_id: {
        type: String,
      },
      tran_id: {
        type: true,
      },
    },
    status: {
      type: String,
      enum: ["pending", "processing", "delevired", "cancel"],
      default: "pending",
      required: true,
      trim: true,
    },
    subtotalPrice: {
      type: Number,
      default: 0,
      required: true,
    },
    totalQuantity: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { timestamps: true }
);

const orderModel = mongoose.model("order", orderSchema);

module.exports = {orderModel}
