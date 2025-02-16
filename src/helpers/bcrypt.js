const bcrypt = require('bcrypt');

const passEncrypt = async(plainPassword)=>{
   return await bcrypt.hash(plainPassword, 10);
}
const bcryptPassCompare = async(plainPassword,hassPassword)=>{
   return await bcrypt.compare(plainPassword, hassPassword);
}

module.exports = {passEncrypt, bcryptPassCompare}