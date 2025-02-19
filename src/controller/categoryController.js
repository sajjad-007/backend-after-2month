const {categoryModel} = require("../model/categorySchema")
const {successResponse} = require("../utilitis/successResponse")
const {errorResponse} = require("../utilitis/errorResponse")
const {uploadFileCloudinary,deletFileCloudinary} = require("../utilitis/cloudinary")

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
        if(!findAllCategory){
            return res.status(404)
            .json(new errorResponse(404,"Couldn't find anything",null,error))
        }
        return res
        .status(200)
        .json(new successResponse(200,"Successfully found all category",findAllCategory,false))
    } catch (error) {
        return res.status(500)
        .json(new errorResponse(500,"getCategory Unsuccessful",null,error))
    }
}
// update my category

const updateCategory =async(req,res) =>{
    try {
        
        const { id } = req.params;
        const {name} = req.body;
        
        const findCategory = await categoryModel.findById(id);
        if (!findCategory) {
            return res
            .status(200)
            .json(new successResponse(200,"Couldn't find anything",null,false))
        }
        const updateImgName = {}
        if (name) {
            updateImgName.name = name
        }
        
        
        if (req.files.image) {
            const {path} = req.files?.image[0];

            //old image( database) path destructuring
            const findOldImg = await categoryModel.findOne({_id:id})
            const findOldImgSplit = findOldImg.image.split('/')
            const cloudinaryLocalPath = findOldImgSplit[findOldImgSplit.length -1].split('.')[0]
            const itemDeleteCloudinary= await deletFileCloudinary(cloudinaryLocalPath)
            
            if (itemDeleteCloudinary) {
               const {secure_url} = await uploadFileCloudinary(path)
               updateImgName.image = secure_url
            }
        }
        
        const uploadNewNameImgDb = await categoryModel.findByIdAndUpdate(
            {_id:id},{...updateImgName},{new: true}
        )
        
        return res
        .status(200)
        .json(new successResponse(200,"Successfully updated my category",uploadNewNameImgDb,false))
    } catch (error) {
        return res.status(500)
        .json(new errorResponse(500,"Update Category Unsuccessful",null,error))
    }
}
//get a single category
const getSingleCategory =async(req,res) =>{
    try {
        
        const { id } = req.params;
        
        const findSingleCategory = await categoryModel.findById(id);
        if (!findSingleCategory) {
            return res
            .status(200)
            .json(new successResponse(200,"Couldn't find anything",null,false))
        }
        
        
        return res
        .status(200)
        .json(new successResponse(200,"Successfully updated my category",findSingleCategory,false))
    } catch (error) {
        return res.status(500)
        .json(new errorResponse(500,"Update Category Unsuccessful",null,error))
    }
}
//delete category
const deleteCategory =async(req,res) =>{
    try {
        
        const { id } = req.params;
        
        const deleteSingleCategory = await categoryModel.findByIdAndDelete(id);
        if (!deleteSingleCategory) {
            return res
            .status(200)
            .json(new successResponse(200,"Couldn't find anything",null,false))
        }
        
        
        return res
        .status(200)
        .json(new successResponse(200,"Successfully updated my category",deleteSingleCategory,false))
    } catch (error) {
        return res.status(500)
        .json(new errorResponse(500,"Update Category Unsuccessful",null,error))
    }
}

module.exports = {category,getCategory,updateCategory,getSingleCategory,deleteCategory}