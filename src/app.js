const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user")

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User Added Successfully")
  } catch (err) {
    console.error("An error occured...")
    res.status(400).json({
  error: err.message || "Something went wrong"
});
  }
})
app.get("/user", async (req, res) => {
  const emailId = req.body.emailId;
  try {
    const user = await User.find({
      emailId,
    })

    res.send(user)
  } catch (err) {
    res.status(404).send("something went wrong")
  }
})
app.get("/userAll", async (req, res) => {
  try {
    const user = await User.find({
    })

    res.send(user)
  } catch (err) {
    res.status(404).send("something went wrong")
  }
})

app.get("/userDelete",async (req,res)=>{
  const userId = req.body.userId;

  try{
   const user =  await User.findByIdAndDelete(userId);
   res.send("User deleted succesfully")
  }catch(err){
    res.status(400);
  }
})

app.patch("/updateUser",async (req,res)=>{
const userId= req.body.userId;
const data = req.body;

const ALLOWED_UPDATES=[
  "photoUrl","gender","userId"
]

const isUpdateAllowed = Object.keys(data).every((k) =>
  ALLOWED_UPDATES.includes(k)
);

if(!isUpdateAllowed){
  return res.status(400).send({ error: "Update contains invalid fields" });

}

try{
  await User.findByIdAndUpdate(userId,data,{
    returnDocument : "after",
    runValidators : true
  });
  res.send("User updated succesfully")
}catch(err){
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
