const {successResponse} = require("../utilitis/successResponse")
const {errorResponse} = require("../utilitis/errorResponse")
const {userModel} = require("../model/authSchemal")
const {emailRegex,passwordRegex, bdNumberRegex} = require("../utilitis/regexCheck")
const { sendEmail } = require("../helpers/nodeMailer")


const registration = async (req,res)=>{
    try {
        const {firstName,address1,email,phoneNumber,password,lastName} = req.body
        if (!firstName || !address1 || !email || !phoneNumber || !password) {
            res.status(401)
                .json(new errorResponse(401,"Missing credential",null,true))
        }
        if (!emailRegex(email) || !passwordRegex(password) || !bdNumberRegex(phoneNumber)) {
            res.status(401)
                .json(new errorResponse(401,"Check your email,phone number or password format!",null,true))
        }
        const saveUserInfo = await userModel.create({
            firstName : firstName,
            address1 : address1,
            email : email,
            phoneNumber: phoneNumber,
            password: password,
            ...(lastName && {lastName : lastName})
        })
        //send email verification
        await sendEmail()
        res.status(200)
        .json( new successResponse(200,'registration successfull',saveUserInfo,false))
    } catch (error) {
        res.status(500)
        .json(new errorResponse(404,"registration Unsuccessfull",null,error))
    }
}

module.exports = {registration}