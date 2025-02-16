const express = require('express')
const app = express()
const allRoutes = require("./src/route/index")


app.use(express.json())
app.use(allRoutes)

module.exports = {app}