const bcrypt = require('bcrypt');

const passEncrypt = async(plainPassword)=>{
   return await bcrypt.hash(plainPassword, 10);
}

module.exports = {passEncrypt}