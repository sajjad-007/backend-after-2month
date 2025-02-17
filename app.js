const express = require('express')
const app = express()
const allRoutes = require("./src/route/index")
const cookieParser = require('cookie-parser')

//to set cookies(json web token) into our websites
app.use(cookieParser())
//json object er value dekhar jonno eita use korbo
app.use(express.json())
//my all routes
app.use(allRoutes)

module.exports = {app}