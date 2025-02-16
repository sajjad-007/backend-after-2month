const mongoose = require('mongoose');
require('dotenv').config()

const databaseConnect = async()=>{
    try {
        const dbConnectAtlas = await mongoose.connect(process.env.DATABASE_URL)
        if (dbConnectAtlas) {
            console.log("Database connection successfull");
            
        }
    } catch (error) {
        console.log("Error from database connection",error);
        
    }
}

module.exports = { databaseConnect }