const express = require("express")
const _ = express.Router()
const {registration,login,verifyOtp} = require("../controller/authController")
//post method er vitore thakbe controller
_.route("/registration").post(registration)
_.route("/login").post(login)
_.route("/otp-verify").post(verifyOtp)



module.exports = _