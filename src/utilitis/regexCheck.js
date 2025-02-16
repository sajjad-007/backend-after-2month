const emailRegex = (email)=>{
    const emailChecker =  /^[a-z|0-9|A-Z]*([_][a-z|0-9|A-Z]+)*([.][a-z|0-9|A-Z]+)*([.][a-z|0-9|A-Z]+)*(([_][a-z|0-9|A-Z]+)*)?@[a-z][a-z|0-9|A-Z]*\.([a-z][a-z|0-9|A-Z]*(\.[a-z][a-z|0-9|A-Z]*)?)$/;
    return emailChecker.test(email.toLowerCase())
}
const passwordRegex = (password)=>{
    //Minimum eight characters, at least one letter and one number:
    const passChecker =  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passChecker.test(password)
}
const bdNumberRegex = (number)=> {
    const numberChecker = /^(?:(?:\+|00)88|01)?\d{11}$/;
    return numberChecker.test(number)
}
module.exports = {emailRegex, passwordRegex, bdNumberRegex}