const { successResponse } = require("../utilitis/successResponse");
const { errorResponse } = require("../utilitis/errorResponse");
const { cartModel } = require("../model/addtocartSchema");

const createAddtocart = async (req, res) => {
  try {
    const { product, quantity } = req.body;
    if (!product) {
      return res
        .status(401)
        .json(new errorResponse(401, "Credential missing!", null, true));
    }
    //save information into database
    const order = await cartModel.create({
      user: req.user._id,
      product: product,
      quantity: quantity,
    });
    if (!order) {
      return res
        .status(401)
        .json(new errorResponse(401, "Data couldn't save in database", null, true));
    }
    return res
      .status(200)
      .json(new successResponse(200, "addtocart successfully", order, false));
  } catch (error) {
    return res
      .status(500)
      .json(
        new errorResponse(500, "Error from, placeOrder controller", null, error)
      );
  }
};
//gett all addtocart
const findAllAddtocart = async (req, res) => {
  try {
    const findAll = await cartModel.find({}).populate({path: 'user'}).populate({path: "product"})
    if (!findAll) {
      return res
        .status(401)
        .json(new errorResponse(401, "Couldn't find anything", null, true));
    }
    
    return res
      .status(200)
      .json(new successResponse(200, "addtocart successfully", findAll, false));
  } catch (error) {
    return res
      .status(500)
      .json(
        new errorResponse(500, "Error from, placeOrder controller", null, error)
      );
  }
};

module.exports = { createAddtocart, findAllAddtocart };
