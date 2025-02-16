const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema  = new Schema({
    firstName:{
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    address1:{
        type: String,
        required: true,
        trim: true
    },
    phoneNumber:{
        type: Number,
        required: true,
        unique: true,
        trim: true
    },
    isVerified:{
        type: Boolean,
    },
    image:{
        type: String,
    },
    otp: {
        type: Number
    },
    expireOtp: {
        type: Number
    }
},
    {timestamps: true}
)

const userModel = mongoose.model("user",userSchema)

module.exports = {userModel}