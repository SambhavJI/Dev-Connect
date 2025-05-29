const express = require("express");
const app = express();

app.get("/home", (req, res, next) => {
    res.send("Hi this is dashboard....");
});

app.post("/user",(req,res)=>{
    res.send("Data Succesfully offloaded to DB")
})

app.listen(3000, () => {
    console.log("The server was connected successfully at port 3000");
})