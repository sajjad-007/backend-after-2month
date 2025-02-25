const express = require("express")
const _ = express.Router()
const authRoute = require("./auth.apiRoute")
const categoryRoute = require("./categoryRoute")
const subCategoryRoute = require("./subCategoryRoute")
const productRoute = require("./product.apiRoute")
const { errorResponse } = require("../utilitis/errorResponse")
const bannerRoute = require('./banner.apiRoute')

_.use("/api/v1/home",authRoute)
_.use("/api/v1",categoryRoute)
_.use("/api/v1",subCategoryRoute)
_.use("/api/v1",productRoute)
_.use("/api/v1",bannerRoute)
_.use("*",(req,res)=>{
    return res.status(404)
        .json(new errorResponse(404,"Unwanted Route!",null,true))
})



module.exports = _