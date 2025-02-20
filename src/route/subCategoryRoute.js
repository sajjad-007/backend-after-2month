const express = require("express")
const _ = express.Router();
const {creatSubCategory,getAllSubCategory,getSingleSubCategory,updateSubCategory,deleteSubCategory} = require("../controller/subCategoryController")

_.route("/sub-category").post(creatSubCategory).get(getAllSubCategory)
_.route("/sub-category/:subid").get(getSingleSubCategory).put(updateSubCategory).delete(deleteSubCategory)

module.exports = _