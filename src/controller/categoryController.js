const {categoryModel} = require("../model/categorySchema")
const {successResponse} = require("../utilitis/successResponse")
const {errorResponse} = require("../utilitis/errorResponse")
const {uploadFileCloudinary} = require("../utilitis/cloudinary")

//create categoroy
const category = async(req,res) =>{
    try {
        const { name } = req.body
       if (!req.files) {
           return res.status(404)
           .json(new errorResponse(404,"Image not found",null,error))
       }
       //cloudinary image sent
       const filePath = req.files?.image[0]?.path
       const {secure_url} = await uploadFileCloudinary(filePath)
       //database image and name set
       const saveImage = await categoryModel.create({
        name: name,
        image: secure_url,
       })
        return res
        .status(200)
        .json(new successResponse(200,"Category created successfully",null,false))
    } catch (error) {
        return res.status(500)
        .json(new errorResponse(500,"Error from Category Controller",null,error))
    }
}
//get all category
const getCategory = async(req,res)=>{
    try {
        
        const findAllCategory = await categoryModel.find()

        return res
        .status(200)
        .json(new successResponse(200,"Successfully found all category",findAllCategory,false))
    } catch (error) {
        return res.status(500)
        .json(new errorResponse(500,"getCategory Unsuccessful",null,error))
    }
}

module.exports = {category,getCategory}