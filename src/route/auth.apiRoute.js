const express = require("express")
const _ = express.Router()
const {registration} = require("../controller/authController")
//post method er vitore thakbe controller
_.route("/registration").post(registration)


module.exports = _