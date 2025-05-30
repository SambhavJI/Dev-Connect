const express = require("express");
const app = express();

app.get("/home", (req, res, next) => {
    res.send("Hi this is dashboard....");
});

app.get("/home/abc/:userid",(req,res)=>{
    res.send("This is a sub dashboard...");
    console.log(req.params);
})

app.post("/home",(req,res)=>{
    res.send("Hii this is sambhav...");
    console.log(req.query);
})
app.listen(3000, () => {
    console.log("The server was connected successfully at port 3000");
})