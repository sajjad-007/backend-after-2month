const jwt = require('jsonwebtoken');

const tokenGenerate = async(playload)=>{
    try {
        const token = await jwt.sign(playload, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRY_DATE });
        return token   
    } catch (error) {
        console.log('error form jwtToken');
        
    }
     
    
}

module.exports = {tokenGenerate}