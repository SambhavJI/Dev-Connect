const express = require("express");
const app = express();

app.use("/home", (req, res, next) => {
    res.send("Hi this is dashboard....");
});

app.use((req, res) => {
    res.send("Hi this is Sambhav Trivedi....");
});

app.listen(3000, () => {
    console.log("The server was connected successfully at port 3000");
});
