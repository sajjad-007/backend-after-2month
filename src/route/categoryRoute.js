const express = require("express")
const _ = express.Router()
const {category,getCategory} = require("../controller/categoryController")
const {upload} = require("../middleware/multer")


_.route("/category").post(upload.fields(
    [
        {name: 'image',  maxCount: 1}
    ]
),category).get(getCategory)

module.exports = _