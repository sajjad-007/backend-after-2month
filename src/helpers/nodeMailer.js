const nodemailer = require("nodemailer");
require('dotenv').config()

const transporter = nodemailer.createTransport({
    service:  "gmail",
    // port: process.env.PORT,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: process.env.HOST_MAIL,
      pass: process.env.APP_PASSWORD,
    },
});
const sendEmail = async()=>{
    const info = await transporter.sendMail({
        from: process.env.HOST_MAIL, // sender address
        to: "sajjadhossain8123@gmail.com", // list of receivers
        subject: "Email verification", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });
      return info.messageId
}
 
  
  sendEmail().catch(console.error);

module.exports = {sendEmail}