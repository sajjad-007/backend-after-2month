const {successResponse} = require("../utilitis/successResponse")
const {errorResponse} = require("../utilitis/errorResponse")
const {subCategoryModel} = require("../model/subCategorySchema")

//create sub category
const creatSubCategory = async(req,res) =>{
    try {
        const {name, category} = req.body
        if (!name || !category) {
            return res.status(401)
            .json(new errorResponse(401,"Credential missing",null,true))
        }
        //check is sub category already exist
        const isAlreadyExist = await subCategoryModel.find({name: name})
        if (isAlreadyExist?.length) {
            return res.status(401)
            .json(new errorResponse(401,"Already Exist this sub category",null,error))
        }
        //create sub category
        const saveSubCategory = await subCategoryModel.create({
            name: name,
            category: category
        })
        if (!saveSubCategory) {
            return res.status(401)
            .json(new errorResponse(401,"Couldn't create sub category",null,error))
        }
        
        return res
            .status(200)
            .json(new successResponse(200,"Sub Category created successfully",saveSubCategory,false))
    } catch (error) {
        return res.status(500)
        .json(new errorResponse(500,"Error, from sub category create failed!",null,error))
    }
}
//get all sub category
const getAllSubCategory = async(req,res) =>{
    try {
        
        const findAllSubCategory = await subCategoryModel.find({})
        if (!findAllSubCategory) {
            return res.status(401)
            .json(new errorResponse(401,"Couldn't find sub category",null,true))
        }
        
        return res
            .status(200)
            .json(new successResponse(200,"Successfully found all category",findAllSubCategory,false))
    } catch (error) {
        return res.status(500)
        .json(new errorResponse(500,"Error, from get all sub category failed!",null,error))
    }
}

//get a single sub category
const getSingleSubCategory = async(req,res) =>{
    try {
        const {subid} = req.params
        //populate('category) means main category refarance
        const findSingleSubCategory = await subCategoryModel.findById(subid).populate('category')
        if (!findSingleSubCategory) {
            return res.status(401)
            .json(new errorResponse(401,"Couldn't find sub category",null,true))
        }
        return res
            .status(200)
            .json(new successResponse(200,"Successfully found signle category",findSingleSubCategory,false))
    } catch (error) {
        return res.status(500)
        .json(new errorResponse(500,"Error, from get single sub category failed!",null,error))
    }
}

//update sub category
const updateSubCategory = async(req,res) =>{
    try {
        const {subid} = req.params
        // const {name,category} = req.body
        const updateSingleSubCategory = await subCategoryModel.findByIdAndUpdate({_id:subid},{...req.body},{new:true})
        if (!updateSingleSubCategory) {
            return res.status(401)
            .json(new errorResponse(401,"Couldn't update sub category",null,true))
        }
        return res
            .status(200)
            .json(new successResponse(200,"Successfully found update category",updateSingleSubCategory,false))
    } catch (error) {
        return res.status(500)
        .json(new errorResponse(500,"Error, from Update sub category failed!",null,error))
    }
}
//delete a sub category
const deleteSubCategory = async(req,res) =>{
    try {
        const {subid} = req.params
        // const {name,category} = req.body
        const deleteSingleSubCategory = await subCategoryModel.findByIdAndDelete(subid)
        if (!deleteSingleSubCategory) {
            return res.status(401)
            .json(new errorResponse(401,"Couldn't deleted sub category or don't exist this",null,true))
        }
        return res
            .status(200)
            .json(new successResponse(200,"Successfully deleted sub category ",deleteSingleSubCategory,false))
    } catch (error) {
        return res.status(500)
        .json(new errorResponse(500,"Error, from deleted sub category failed!",null,error))
    }
}


module.exports = {creatSubCategory,getAllSubCategory,getSingleSubCategory,updateSubCategory,deleteSubCategory}