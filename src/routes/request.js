const express = require("express")
const {userAuth} = require("../middlewares/auth.js")
const requestRouter = express.Router()

requestRouter.post("/sendConnectionRequest",userAuth,async (req,res)=>{
  const user = req.user;
  res.send(user.firstName + " Sent a connection ")
})

module.exports= requestRouter