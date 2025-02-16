const {app} = require("./app")
const {databaseConnect} = require("./src/database/db")
require('dotenv').config()


databaseConnect().then(()=>{
  app.listen(process.env.PORT,()=>{
      console.log("Server is running on port 7000");
      
  })
})
