const cloudinary = require("cloudinary").v2
const fs = require('fs')
// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRECT // Click 'View API Keys' above to copy your API secret
});

const uploadFileCloudinary = async(filepath)=>{
    try {
        const uploadResult = await cloudinary.uploader.upload(filepath)
    if (uploadResult) {
        fs.unlinkSync(filepath)
    }
    return uploadResult;
    } catch (error) {
        console.log("error from cloudinary file upload");
    }
}

module.exports = {uploadFileCloudinary}