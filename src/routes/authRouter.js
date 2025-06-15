const express = require("express")
const bcrypt = require("bcrypt")
const User = require("../models/user")
const validateSignUpData = require("../utils/validation")
const authRouter = express.Router()
const validator = require("validator")
const jwt = require("jsonwebtoken")

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });



    await user.save();
    res.send("User Added Successfully")
  } catch (err) {
    console.error("An error occured...")
    res.status(400).json({
      error: err.message || "Something went wrong"
    });
  }
})
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;


    if (!validator.isEmail(emailId)) {
      throw new Error("Email ID not valid");
    }

    const user = await User.findOne({ emailId });

    if (user === null) {
      throw new Error("Invalid credentials");
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (isPassword) {
      const cookie = jwt.sign({ _id: user._id }, "Sambhav@12123",{
        expiresIn:"1d",
      })
      res.cookie("token", cookie)


      res.send("Login Successful");
    } else {
      throw new Error("Incorrect Password");
    }

  } catch (err) {
    console.error("Login error:", err.message);
    res.status(400).json({
      error: err.message || "Something went wrong"
    });
  }
});
authRouter.post("/logout",async (req,res)=>{
    res.cookie("token",null , {
        expires:new Date(Date.now())
    }).send("Logout succesfull")
})
module.exports =authRouter
    
