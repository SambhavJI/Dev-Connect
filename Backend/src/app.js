const express = require("express");
const app = express();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser")
const userRouter = require("./routes/userRouter")
const cors = require("cors")

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

const requestRouter = require("./routes/request")
const profileRouter = require("./routes/profile")
const authRouter = require("./routes/authRouter")

app.use("/",requestRouter)
app.use("/",profileRouter)
app.use("/",authRouter)
app.use("/",userRouter);

connectDB()
  .then(() => {
    console.log("Database Connected Successfully...");

    app.listen(3000, () => {
      console.log("The server was started successfully at port 3000");
    });
  })
  .catch((err) => {
    console.error("An error occurred while connecting to the database:", err);
  });
