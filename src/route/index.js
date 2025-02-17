const express = require("express")
const _ = express.Router()
const authRoute = require("./auth.apiRoute")
const categoryRoute = require("./categoryRoute")

_.use("/api/v1/home",authRoute)
_.use("/api/v1",categoryRoute)



module.exports = _