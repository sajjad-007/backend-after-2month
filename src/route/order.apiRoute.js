const express = require("express");
const { placeOrder } = require("../controller/orderController");
const { authGuard } = require("../middleware/authguard.middleware");
const _ = express.Router();

_.route("/order").post(authGuard, placeOrder);

module.exports = _;
