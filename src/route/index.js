const express = require("express")
const _ = express.Router()
const authRoute = require("./auth.apiRoute")

_.use("/api/v1/home",authRoute)



module.exports = _