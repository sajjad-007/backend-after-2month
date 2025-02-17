const express = require("express")
const _ = express.Router()
const {category} = require("../controller/categoryController")


_.route("/category").post((req,res,next)=>{
    console.log(res.body = 'hello sajjad');
    if (true) {
        next()
    }
} ,category)

module.exports = _