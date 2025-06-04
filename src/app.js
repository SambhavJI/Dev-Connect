const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user")

app.post("/signup", async (req,res)=>{
    const user = new User({
        firstName : "rohan",
        lastName : "sharma",
        emailId : "sharma@gmail.com",
        password : "123",

    });
    try {
        await user.save();
        res.send("User Added Successfully")
    } catch (err) {
        console.error("An error occured...")
        res.status(400);
    }
})

connectDB()
  .then(() => {
    console.log("Database Connected Successfully...");

    app.listen(3000, () => {
      console.log("The server was connected successfully at port 3000");
    });
  })
  .catch((err) => {
    console.error("An error occurred while connecting to the database:", err);
  });
