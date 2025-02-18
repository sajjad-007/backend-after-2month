const express = require("express")
const _ = express.Router()
const {category,getCategory,updateCategory} = require("../controller/categoryController")
const {upload} = require("../middleware/multer")


_.route("/category").post(upload.fields(
    [
        {name: 'image',  maxCount: 1}
    ]
),category).get(getCategory)

_.route("/category/:id").put(upload.fields(
    [
        {name: 'image',  maxCount: 1}
    ]
) ,updateCategory)

module.exports = _