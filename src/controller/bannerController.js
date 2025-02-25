const {successResponse} = require("../utilitis/successResponse")
const {errorResponse} = require("../utilitis/errorResponse")
const {bannerModel} = require("../model/bannerSchema")
const { uploadFileCloudinary, deletFileCloudinary } = require("../utilitis/cloudinary")

const createBanner = async(req,res) =>{
    try {
        const {title} = req.body
        if(!title){
            return res
            .status(401)
            .json(new errorResponse(401,"ImgInfo is not found",null,true))
        }
        if(!req.files){
            return res
            .status(404)
            .json(new errorResponse(404,"Image Not Found",null,true))
        }
        //search is banner already exist
        const findBanner = await bannerModel.find({title : title})
        if(findBanner?.length){
            return res
            .status(404)
            .json(new errorResponse(404,`${title} is already exist` ,null,true))
        }
        //upload file on cloudinary
        const cloudinaryPath = req.files?.image[0].path
        const {secure_url} = await uploadFileCloudinary(cloudinaryPath)
        //now create a database
        const createBannerDB = await bannerModel.create({
            title: title,
            image: secure_url,
        })
        if(!createBannerDB){
            return res
            .status(404)
            .json(new errorResponse(404,"Database create failed" ,null,true))
        }
        return res
            .status(200)
            .json(new errorResponse(200,"Successfully created banner database",createBannerDB,false))
    } catch (error) {
        return res
            .status(500)
            .json(new errorResponse(500,"Error,Banner create",null,error))
    }
}
//get all banner from database
const getAllBanner = async(req,res) =>{
    try {
        const searchAllBanner = await bannerModel.find({})
        if (!searchAllBanner) {
            return res
            .status(401)
            .json(new errorResponse(401,"Data retrive unsuccessfull",null,true))
        }
        return res
        .status(200)
        .json(new successResponse(200,"Successfully find all banners",searchAllBanner,false))
    } catch (error) {
        return res
            .status(500)
            .json(new errorResponse(500,"Error,from get all banners",null,true))
    }
}
//get single banner
const getSingleBanner = async(req,res) =>{
    try {
        const {id} = req.params
        //find product
        const searchSingleBanner = await bannerModel.findById(id)
        if (!searchSingleBanner) {
            return res
            .status(401)
            .json(new errorResponse(401,"Couldn't find single banner using id",null,true))
        }
            return res
            .status(200)
            .json(new errorResponse(200,"Successfully found my banner",searchSingleBanner,false))
    } catch (error) {
        return res
        .status(200)
        .json(new successResponse(200,"Successfully created banner",error,true))
    }
}
//delete a banner
const deleteBanner = async(req,res) =>{
    try {
        const {id} = req.params
        //first delet image from cloudinary then database
        const findOldImg = await bannerModel.findById({_id: id})
        const imgSplit = findOldImg.image.split('/')
        const oldImgPath = imgSplit[imgSplit.length -1].split('.')[0]
        //now delete old image from cloudinary
        const oldImgDeleted = await deletFileCloudinary(oldImgPath)
        if(oldImgDeleted){
            const deleteBanner = await bannerModel.findByIdAndDelete(id)
            if (!deleteBanner) {
                return res
                .status(401)
                .json(new errorResponse(401,"Couldn't deleted this",null,true))
            }
            return res
            .status(200)
            .json(new errorResponse(200,"Successfully Deleted this banner",null,false))

        }
        if (!oldImgDeleted) {
            return res
            .status(400)
            .json(new successResponse(400,"Cloudinary img delete unsuccessfull",null,true))
        }
           
    } catch (error) {
        return res
        .status(500)
        .json(new successResponse(500,"Banner Delete Unsuccessfull",error,true))
    }
}
//update banner
const updateBanner = async(req,res) =>{
    try {
        const {id} = req.params
        const {title} = req.body
        if(!title){
            return res
            .status(401)
            .json(new errorResponse(401,"Credential is missing",null,true))
        }
        if(!req.files){
            return res
            .status(404)
            .json(new errorResponse(404,"Image Not Found",null,true))
        }
        const updateNameImg = []
        if (title) {
            updateNameImg.title = title
            
        }
        if(req.files?.image){
            //new Image path
            const newImgPath = req.files?.image[0].path
            //delete old img from cloudinary
            //first delet image from cloudinary then database
            const findOldImg = await bannerModel.findById({_id: id})
            const imgSplit = findOldImg.image.split('/')
            const oldImgPath = imgSplit[imgSplit.length - 1].split('.')[0]
            //now delete old image from cloudinary
            const oldImgDeleted = await deletFileCloudinary(oldImgPath)
            if (oldImgDeleted) {
                const {secure_url} = await  uploadFileCloudinary(newImgPath)
                updateNameImg.image = secure_url
            }
        }
            
        /// now update my banner
        const upDateBanner = await bannerModel.findByIdAndUpdate({_id: id},{...updateNameImg},{new: true})
        if(!upDateBanner){
            return res
            .status(401)
            .json(new errorResponse(401,"Couldn't updated my banner",null,true))
        }
        return res
        .status(200)
        .json(new errorResponse(200,"Successfully updated this banner",upDateBanner,false))
    } catch (error) {
        return res
        .status(500)
        .json(new successResponse(500,"Banner Update Unsuccessfull",error,true))
    }
}

module.exports = {createBanner,getAllBanner, getSingleBanner,deleteBanner,updateBanner}