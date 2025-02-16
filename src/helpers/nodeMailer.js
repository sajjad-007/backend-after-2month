const nodemailer = require("nodemailer");
require('dotenv').config()
const {emailTemplate} = require("./emailTemplate")

const transporter = nodemailer.createTransport({
    service:  "gmail",
    // port: process.env.PORT,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: process.env.HOST_MAIL,
      pass: process.env.APP_PASSWORD,
    },
});
const sendEmail = async(firstName,otp, email)=>{
  if (!email) {
    console.error("Error: Recipient email is missing!");
    return;
  }
  try {
    const info = await transporter.sendMail({
        from: process.env.HOST_MAIL, // sender address
        to: email , // list of receivers
        subject: "Email verification", // Subject line
        text: "Hello world?", // plain text body
        html: emailTemplate(firstName,otp), // html body
      });
      return info.messageId
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
 
  
  sendEmail().catch(console.error);

module.exports = {sendEmail}