const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth")
const ConnectionRequestModel = require("../models/connectionRequest")


userRouter.get("/user/requests", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connections = await ConnectionRequestModel.find({
            toUserId: loggedInUser._id, status: "interested"
        }).populate("fromUserId", ["firstName", "lastName"]);
        res.status(200).json(connections);

    } catch (err) {
        res.status(400).send("ERROR:" + err.message)
    }
})
userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequestModel.find({
            $or: [{ toUserId: loggedInUser._id },
            { fromUserId: loggedInUser._id }], status: "accepted"
        }).populate("fromUserId toUserId", ["firstName", "lastName", "photoUrl"]);
      
        const data = connectionRequest.map((row) => {
            if(row.fromUserId.equals(loggedInUser._id)){
                return row.toUserId;
            }
            return row.fromUserId;
        });
        res.json(data);
    } catch (err) {
        res.status(400).send("ERROR:" + err.message)
    }
});

module.exports = userRouter