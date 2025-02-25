const {successResponse} = require("../utilitis/successResponse")
const {errorResponse} = require("../utilitis/errorResponse")
const { uploadFileCloudinary, deletFileCloudinary } = require("../utilitis/cloudinary")
const { productModel } = require("../model/productSchema")


const createProduct = async(req,res) =>{
    try {
        const {name, rating, color, price, stock, description } = req.body
        if (!name || !rating || !color || !price || !stock || !description) {
            return res
            .status(401)
            .json(new errorResponse(401,"Credential Missing!",null,true))
        }
        if (!req.files) {
            return res
            .status(401)
            .json(new errorResponse(401,"Image is missing",null,true))
        }
        //image upload on cloudinary
        const cloudinaryImgPath = []
        const uploadOnCloudinary = async(imagePath)=>{
            const {secure_url} = await uploadFileCloudinary(imagePath)
            cloudinaryImgPath.push(secure_url)
        }
        for(let image of req.files.image){
            await uploadOnCloudinary(image.path) ;
            
        }
        //create product database
        const saveProductDb = await productModel.create({
            name: name,
            rating: rating,
            color: color,
            price: price,
            stock: stock,
            description: description,
            image: cloudinaryImgPath,
        })
        if (!saveProductDb) {
            return res
            .status(401)
            .json(new errorResponse(401,"Database create Unsuccessfull",null,false))
        }
        
        return res
        .status(200)
        .json(new successResponse(200,"Successfully created product",saveProductDb,false))
    } catch (error) {
        return res
            .status(500)
            .json(new errorResponse(500,"Error,From create product failed!",null,false))
    }
}

//get all product
const getAllProduct = async(req,res) =>{
    try {
        const searchAllProduct = await productModel.find({})
        if (!searchAllProduct) {
            return res
            .status(401)
            .json(new errorResponse(401,"Data retrive unsuccessfull",null,false))
        }
        return res
        .status(200)
        .json(new successResponse(200,"Successfully created product",searchAllProduct,false))
    } catch (error) {
        return res
            .status(500)
            .json(new errorResponse(500,"Error,from get all product",null,false))
    }
}
//get a single product 
const getSingleProduct = async(req,res) =>{
    try {
        const {id} = req.params
        //find product
        const searchSingleProduct = await productModel.findById(id)
        if (!searchSingleProduct) {
            return res
            .status(401)
            .json(new errorResponse(401,"Couldn't find single product using id",null,true))
        }
            return res
            .status(200)
            .json(new errorResponse(200,"Successfully found my product",searchSingleProduct,false))
    } catch (error) {
        return res
        .status(200)
        .json(new successResponse(200,"Successfully created product",error,true))
    }
}
//update product information 
const updateProductInfo = async(req,res) =>{
    try {
        const {id} = req.params
        //find product { postman > body > raw, json }
        const updateProductInfo = await productModel.findByIdAndUpdate(
            {_id:id},{...req.body},{new: true}
        )
        if (!updateProductInfo) {
            return res
            .status(401)
            .json(new errorResponse(401,"Couldn't update my product info",null,true))
        }
            return res
            .status(200)
            .json(new errorResponse(200,"Successfully updated my product information",updateProductInfo,false))
    } catch (error) {
        return res
        .status(200)
        .json(new successResponse(200,"Successfully created product",error,true))
    }
}
//update prouduct image 
const updateProductImage = async(req,res) =>{
    try {
        const {id} = req.params
        const {imginfo} = req.body
        if(!imginfo){
            return res
            .status(401)
            .json(new errorResponse(401,"ImgInfo is not found",null,true))
        }
        if(!req.files){
            return res
            .status(401)
            .json(new errorResponse(401,"Multer not working",null,true))
        }

        //delete old img from cloudinary
        
        for(let img of imginfo){
            const cloudImgSplit = img.split('/')
            const cloudinaryPath = cloudImgSplit[cloudImgSplit.length - 1].split('.')[0]
            const cloudinaryFileDel = await deletFileCloudinary(cloudinaryPath)
            
        }
        //upload file on cloudinary

        const newImgArray = []
        for(let img of req.files.image){
            const newImgCloudPath = img.path;
            const {secure_url}= await uploadFileCloudinary(newImgCloudPath);
            newImgArray.push(secure_url)
            
        }
        // console.log(newImgArray)

        //delete old image from database
        const findOldImgFromDb = await productModel.findById(id)
        // console.log(findOldImgFromDb.image);
        if(!findOldImgFromDb){
            return res
            .status(401)
            .json(new errorResponse(401,"Couldn't retrive data from database",null,true))
        }
        // 3 ta image er modde 2 ta img delte hobe 1 ta img database e remaining thakbe
        for(let img of imginfo){
            const checkDelteImg = await findOldImgFromDb.image.pull(img)
        }
        //remaining thaka 1 ta img (findOldImgFromDb.image) ke spread kore database e save korte hobe
        findOldImgFromDb.image = [...findOldImgFromDb.image, ...newImgArray]
        const saveProductDb = await findOldImgFromDb.save()
        if (!saveProductDb) {
            return res
            .status(401)
            .json(new errorResponse(401,"Image couldn't save on database",null,true))
            
        }
        
        return res
            .status(200)
            .json(new errorResponse(200,"Successfully updated my product Image",saveProductDb,false))
    } catch (error) {
        return res
            .status(500)
            .json(new errorResponse(500,"Error,From Product Image update",null,error))
    }
}


module.exports = {createProduct,getAllProduct,getSingleProduct,updateProductInfo,updateProductImage}
