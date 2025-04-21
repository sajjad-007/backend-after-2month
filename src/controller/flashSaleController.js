const { errorResponse } = require("../utilitis/errorResponse");
const { flashSaleModel } = require("../model/flashSaleSchema");
const { successResponse } = require("../utilitis/successResponse");

const createFlashSale = async (req, res) => {
  try {
    const { name, product } = req.body;
    if (!name) {
      return res
        .status(401)
        .json(new errorResponse(401, "Credential Missing!", null, true));
    }
    if (!product) {
      return res
        .status(401)
        .json(new errorResponse(401, "Credential Missing!", null, true));
    }
    const isAlreadyExist = await flashSaleModel.find({ name: name });
    if (isAlreadyExist?.length) {
      return res
        .status(401)
        .json(new errorResponse(401, `${name} is already exist`, null, true));
    }
    const createFlaseSaleDB = await flashSaleModel.create({
      name: name,
      product: product,
    });
    return res
      .status(200)
      .json(
        new successResponse(
          200,
          "Flash Sale create Successfull",
          createFlaseSaleDB,
          false
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        new errorResponse(
          500,
          "Error,From create flash sale failed!",
          error,
          true
        )
      );
  }
};
//get all flash sale
const getAllFlashSale = async (req, res) => {
  try {
    const findAllFlashSaleDB = await flashSaleModel
      .find({})
      .populate("product");
    if (!findAllFlashSaleDB) {
      return res
        .status(404)
        .json(
          new errorResponse(
            404,
            "Couldn't find anything from Database",
            null,
            true
          )
        );
    }
    return res
      .status(200)
      .json(
        new successResponse(
          200,
          "Successfull retrive all flash sale",
          findAllFlashSaleDB,
          false
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        new errorResponse(
          500,
          "Error,From create Get All Flash Sale failed!",
          error,
          true
        )
      );
  }
};
// get single flash sale
const getSingleFlashSale = async (req, res) => {
  try {
    const { id } = req.params;
    const findSingleFlashSale = await flashSaleModel
      .findById({ _id: id })
      .populate("product");
    if (!findSingleFlashSale) {
      return res
        .status(404)
        .json(new errorResponse(404, "Couldn't find anything", null, true));
    }
    return res
      .status(200)
      .json(
        new successResponse(
          200,
          "Successfull retrive Single flash sale",
          findSingleFlashSale,
          false
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        new errorResponse(
          500,
          "Error,From create Get Single Flash Sale failed!",
          error,
          true
        )
      );
  }
};
//update flash sale
const updateFlashSale = async (req, res) => {
  try {
    const { name, product } = req.body;
    const { id } = req.params;
    const updateFlashSaleDB = await flashSaleModel.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );

    if (!updateFlashSaleDB) {
      return res
        .status(401)
        .json(
          new errorResponse(401, "Couldn't update flash fale", error, true)
        );
    }

    return res
      .status(200)
      .json(
        new successResponse(
          200,
          "Successfull Update Single flash sale",
          updateFlashSaleDB,
          false
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        new errorResponse(
          500,
          "Error,From create Update Flash Sale",
          error,
          true
        )
      );
  }
};
// delete flash sale
const deleteFlashSale = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteFlashSaleDB = await flashSaleModel.findByIdAndDelete({
      _id: id,
    });
    if (!deleteFlashSaleDB) {
      return res
        .status(401)
        .json(
          new errorResponse(401, "Couldn't deleted my flash sale!", null, true)
        );
    }
    return res
      .status(200)
      .json(
        new successResponse(200, "Successfully deleted flash sale", null, false)
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        new errorResponse(500, "Error,From Delete Flash Sale", error, true)
      );
  }
};

module.exports = {
  createFlashSale,
  getAllFlashSale,
  getSingleFlashSale,
  updateFlashSale,
  deleteFlashSale,
};
