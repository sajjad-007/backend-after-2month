const { successResponse } = require("../utilitis/successResponse");
const { errorResponse } = require("../utilitis/errorResponse");
const { orderModel } = require("../model/orderSchema");
const { cartModel } = require("../model/addtocartSchema");
const placeOrder = async (req, res) => {
  try {
    const { paymentInfo, customerInfo } = req.body;
    const { paymentMethod } = paymentInfo;
    const { _id } = req.user;
    const { phoneNumber, email, address, city, district, firstName } =
      customerInfo;
    if (
      !phoneNumber ||
      !email ||
      !address ||
      !city ||
      !district ||
      !firstName
    ) {
      return res
        .status(401)
        .json(new errorResponse(401, "Credential missing!", null, true));
    }
    //find user cart
    const userCart = await cartModel
      .find({ user: _id })
      .populate({
        path: "user",
        select: "-password -createdAt -updatedAt -expireOtp -otp",
      })
      .populate({
        path: "product",
        select: "-createdAt -updatedAt -expireOtp -description",
      });
    if (!userCart) {
      return res
        .status(404)
        .json(new errorResponse(404, "User not found!", null, true));
    }
    const orderInfo = userCart.reduce(
      (initialItem, item) => {
        const { _id, product, quantity } = item;
        initialItem.cart.push(_id);
        initialItem.totalPrice += product.price;
        initialItem.totalQuantity += quantity;
        return initialItem;
      },
      {
        cart: [],
        totalPrice: 0,
        totalQuantity: 0,
      }
    );
    if (!orderInfo) {
      return res
        .status(404)
        .json(new errorResponse(404, "Order Info not found!", null, true));
    }
    // make payment with cash
    if (paymentMethod === "cash") {
      const saveInfoIntoDB = await orderModel.create({
        user: req.user._id,
        cart: orderInfo.cart,
        customerInfo: customerInfo,
        paymentInfo: paymentInfo,
        subtotalPrice: orderInfo.totalPrice,
        totalQuantity: orderInfo.totalQuantity,
      });
      if (!saveInfoIntoDB) {
        return res
          .status(401)
          .json(new errorResponse(401, "Database coundn't save", null, true));
      }
      return res
        .status(200)
        .json(
          new successResponse(200, "Order successfully", saveInfoIntoDB, false)
        );
    } else {
      return res
        .status(401)
        .json(
          new errorResponse(401, "payment method is not correct", null, true)
        );
    }
  } catch (error) {
    return res
      .status(500)
      .json(
        new errorResponse(500, "Error from, placeOrder Controller", null, error)
      );
  }
};

module.exports = { placeOrder };
