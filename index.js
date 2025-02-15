const express = require('express')
const app = express()

app.use("*",(req,res)=>{
  res.json({
    name: "error",
    message: "Invalid route"
  })
})
app.get("/home/data",(req,res)=>{
  res.json({
    name: "sajjad",
    message: "Hi, I am sajjad"
  })
})

app.listen(7000,()=>{
    console.log("server is running on port: 7000");
    
})