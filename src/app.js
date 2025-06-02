const express = require("express");
const app = express();

const {adminAuth} = require("./middlewares/auth.js");

app.use("/admin",adminAuth);

app.get("/user",(req,res)=>{
    res.send("data sent succesfully");
});

app.get("/admin/userAdd",(req,res)=>{
    res.send("User added succesfully")
}
)

app.listen(3000, () => {
    console.log("The server was connected successfully at port 3000");
})