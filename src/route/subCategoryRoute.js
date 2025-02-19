const express = require("express")
const _ = express.Router();
const {creatSubCategory,getAllSubCategory} = require("../controller/subCategoryController")

_.route("/sub-category").post(creatSubCategory).get(getAllSubCategory)

module.exports = _