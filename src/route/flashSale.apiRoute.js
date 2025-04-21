const express = require("express");
const {
  createFlashSale,
  getAllFlashSale,
  getSingleFlashSale,
  updateFlashSale,
  deleteFlashSale,
} = require("../controller/flashSaleController");
const _ = express.Router();

_.route("/flashSale").post(createFlashSale).get(getAllFlashSale);
_.route("/flashSale/:id")
  .get(getSingleFlashSale)
  .put(updateFlashSale)
  .delete(deleteFlashSale);

module.exports = _;
