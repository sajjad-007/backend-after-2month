const {categoryModel} = require("../model/categorySchema")
const {successResponse} = require("../utilitis/successResponse")
const {errorResponse} = require("../utilitis/errorResponse")

const category = async(req,res) =>{
    try {
        const { name } = req.body
        console.log(name);
        
        return res
        .status(200)
        .json(new successResponse(200,"Category created successfully",null,false))
    } catch (error) {
        return res.status(500)
        .json(new errorResponse(500,"Error from Category Controller",null,error))
    }
}

module.exports = {category}