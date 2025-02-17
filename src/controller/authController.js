const {successResponse} = require("../utilitis/successResponse")
const {errorResponse} = require("../utilitis/errorResponse")
const {userModel} = require("../model/authSchemal")
const {emailRegex,passwordRegex, bdNumberRegex} = require("../utilitis/regexCheck")
const { sendEmail } = require("../helpers/nodeMailer")
const {otpGenerator} = require("../helpers/otpGenerator")
const {passEncrypt,bcryptPassCompare} = require("../helpers/bcrypt")
const {tokenGenerate} = require("../helpers/jwtToken")


const registration = async (req,res)=>{
    try {
        const {firstName,address1,email,phoneNumber,password,lastName} = req.body
        if (!firstName || !address1 || !email || !phoneNumber || !password) {
            return res.status(401)
                .json(new errorResponse(401,"Missing credential",null,true))
        }
        if (!emailRegex(email) || !passwordRegex(password) || !bdNumberRegex(phoneNumber)) {
            return res.status(401)
                .json(new errorResponse(401,"Check your email,phone number or password format!",null,true))
        }
        //hassing password
        const hassPassword = await passEncrypt(password)
        //otp generator
        const Otp = await otpGenerator()
    
        //send email verification
        const messageId = await sendEmail(firstName,Otp,email)
        if (messageId) {
             //User info saved
            const saveUserInfo = await userModel.create({
                firstName,
                address1,
                email,
                phoneNumber,
                password: hassPassword,
                ...(lastName && {lastName : lastName})
            })
            //update user otp
            const updateUserInfo = await userModel.findOneAndUpdate(
                {email: email},
                {otp: Otp,
                    //minute > second > milisecond
                 expireOtp : new Date().getTime() + 40 * 60 * 1000,   
                },
                {new: true},
            ).select("-address1 -phoneNumber -lastName -otp -createdAt -updatedAt")

            return res.status(200)
            .json( new successResponse(200,'registration successfull',updateUserInfo,false))
        }
    } catch (error) {
        return res.status(500)
        .json(new errorResponse(404,"registration Unsuccessfull",null,error))
    }
}

const login = async(req,res) => {
    try {
        
        const {emailOrPhoneNumber, password} = req.body
        if (!emailOrPhoneNumber || !password) {
            return res.status(401)
            .json(new errorResponse(401,"Dosen't Match credential",null,true))
        }
        //check if user is register using email or phoneNumber
        const checkIsUserRegisterd = await userModel.findOne({
            $or: [
               
                {email : emailOrPhoneNumber},
                {phoneNumber : emailOrPhoneNumber},
            ]
        })
        if (checkIsUserRegisterd) {
            const checkIsPasswordCorrect = await bcryptPassCompare(password,checkIsUserRegisterd.password)
            if (!checkIsPasswordCorrect) {
                return res.status(401)
                .json(new errorResponse(401,"password is Incorrect",null,true))
            }
            //jwtToken
            const tokenInfo = {_id: checkIsUserRegisterd._id , email: checkIsUserRegisterd.email , phoneNumber: checkIsUserRegisterd.phoneNumber}
            const token =  await tokenGenerate(tokenInfo)

            return res
            .status(200)
            .cookie("token",token)
            .json(new successResponse(200,"login successful",{
                data:{
                    token: `Bearer ${token}`,
                    email: checkIsUserRegisterd.email,
                    firstName: checkIsUserRegisterd.firstName 
                }
            },false))
        }
    } catch (error) {
        return res.status(500)
        .json(new errorResponse(500,"login Unsuccessfull",null,error))
    }
}

const verifyOtp = async(req,res)=>{
    try {
        const {email,otp} = req.body
        const matchOtp = await userModel.findOne({email: email})
        if (matchOtp.otp === otp && matchOtp.expireOtp >= new Date().getTime()) {
            const removeOtpCredential = await userModel.findOneAndUpdate(
                {email: email},
                {otp: null,
                 expireOtp: null
                },
                {new: true}
            )
            if (removeOtpCredential) {
                return res
                .status(200)
                .json(new successResponse(200,"otp verify successfull",null,false))        
            }
        }
        return res
            .status(401)
            .json(new successResponse(401,"Couldn't success to verify or Already verified",null,false))
    } catch (error) {
        return res.status(500)
        .json(new errorResponse(500,"login Unsuccessfull",null,error))
    }
}

module.exports = {registration,login,verifyOtp}