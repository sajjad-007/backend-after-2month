const express = require("express")
const _ = express.Router()
const authRoute = require("./auth.apiRoute")
const categoryRoute = require("./categoryRoute")
const subCategoryRoute = require("./subCategoryRoute")
const productRoute = require("./product.apiRoute")
const { errorResponse } = require("../utilitis/errorResponse")

_.use("/api/v1/home",authRoute)
_.use("/api/v1",categoryRoute)
_.use("/api/v1",subCategoryRoute)
_.use("/api/v1",productRoute)
_.use("*",(req,res)=>{
    return res.status(500)
        .json(new errorResponse(500,"Unwanted Route!",null,true))
})



module.exports = _