const mongoose = require("mongoose")
const {Schema} = mongoose

const productSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    description:{
        type: String,
        required: true,
        trim: true,
    },
    stock:{
        type: Number,
        required: true,
    },
    price:{
        type: Number,
        required: true,
        trim: true,
    },
    color:{
        type: String,
        required: true,
        trim: true,
    },
    rating:{
        type: Number,
        required: true,
    },
    size: {
        type: String,
        default: "S",
        enum: ['XS','S','M','L','XL']
    },
    review:[
        {
            comment:{
                type: String,
                trim:true,
            },
            rating:{
                type: Number,
                trim: true,
            }
        }
    ],
    image:[{
        type:String,
        required: true,
        trim: true,
    }]
    

},
    {timestamps: true}
)

const productModel = mongoose.model('product',productSchema)

module.exports = {productModel}