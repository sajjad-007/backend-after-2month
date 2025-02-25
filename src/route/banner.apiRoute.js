const express = require('express')
const { createBanner, getAllBanner, getSingleBanner, deleteBanner, updateBanner } = require('../controller/bannerController')
const { upload } = require('../middleware/multer')
const _ = express.Router()

_.route("/banner").post(upload.fields(
    [
        {name: 'image',  maxCount: 1}
    ]
),createBanner).get(getAllBanner)

_.route("/banner/:id").get(getSingleBanner).delete(deleteBanner).put(upload.fields(
    [
        {name: 'image',  maxCount: 1}
    ]
),updateBanner)

module.exports = _