const express = require("express");
const { authGuard } = require("../middleware/authguard.middleware");
const { createAddtocart, findAllAddtocart } = require("../controller/addtocartController");
const _ = express.Router();

_.route("/addtocart")
  .post(authGuard, createAddtocart)
  .get(authGuard, findAllAddtocart);

module.exports = _;
