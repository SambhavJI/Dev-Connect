const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user")
const validateSignUpData = require("./utils/validation")
const bcrypt = require("bcrypt")
const validator = require("validator")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const {userAuth} = require("./middlewares/auth.js")

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
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
app.post("/login", async (req, res) => {
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

app.get("/profile",userAuth, async (req, res) => {
  try {
   
    res.send(req.user)

  } catch (err) {
    console.error("An error occured...")
    res.status(400).json({
      error: err.message || "Something went wrong"
    });
  }
})
app.post("/sendConnectionRequest",userAuth,async (req,res)=>{
  const user = req.user;
  res.send(user.firstName + " Sent a connection ")
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
