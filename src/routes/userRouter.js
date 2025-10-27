const express = require("express");
const userRouter = express.Router();
const User = require("../models/user")
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
            $or: [
                { toUserId: loggedInUser._id },
                { fromUserId: loggedInUser._id }
            ],
            status: "accepted"
        }).populate("fromUserId toUserId", ["firstName", "lastName", "photoUrl"]);

        const data = connectionRequest.map((row) => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            return row.fromUserId;
        });

        res.json(data);
    } catch (err) {
        res.status(400).send("ERROR:" + err.message);
    }
});


userRouter.get("/user/feed", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const page = parseInt(req.query.page) || 1;
        const connectionRequest = await ConnectionRequestModel.find({
            $or: [{
                fromUserId: loggedInUser._id
            }, {
                toUserId: loggedInUser._id
            }]
        }).select("fromUserId toUserId");

        const hiddenUsers = new Set();
        connectionRequest.forEach((req) => {
            hiddenUsers.add(req.fromUserId.toString());
            hiddenUsers.add(req.toUserId.toString());
        });

        const users = await User.find({
            $and: [
                { _id: { $nin: Array.from(hiddenUsers) } },
                { _id: { $ne: loggedInUser._id } }
            ]
        }).select([
            "firstName",
            "lastName",
            "photoUrl",
            "age",
            "gender"
        ]);

        res.json(users);

    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
});

module.exports = userRouter