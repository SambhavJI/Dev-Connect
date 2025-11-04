const express = require("express");
const { userAuth } = require("../middlewares/auth.js");
const requestRouter = express.Router();
const ConnectionRequestModel = require("../models/connectionRequest.js");
const User = require("../models/user.js");

requestRouter.post("/request/send/:status/:toUserID", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const status = req.params.status;
    const toUserId = req.params.toUserID;

    const allowedStatus = ["interested", "ignored"];
    if (!allowedStatus.includes(status)) {
      throw new Error("Not A Valid Status Field");
    }

    const toUser = await User.findById(toUserId);
    if (!toUser) {
      throw new Error("User Not Found");
    }

    const existingConnectionRequest = await ConnectionRequestModel.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId }
      ]
    });

    if (existingConnectionRequest) {
      return res.status(400).send("Connection Request Already Exists");
    }

    const connectionRequest = new ConnectionRequestModel({
      fromUserId,
      toUserId,
      status
    });

    await connectionRequest.save();
    res.status(200).send(status + " Request Sent");

  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

requestRouter.post("/request/respond/:status/:requestID", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const { status, requestID } = req.params;

    const allowedStatus = ["accepted","ignored"];
    if(!allowedStatus.includes(status)){
      return res.status(400).send("Not a Valid Request Type")
    }

    const connectionRequest = await ConnectionRequestModel.findOne({
      _id : requestID,
      toUserId : loggedInUser._id,
      status : "interested"
    })
    if(!connectionRequest){
      return res.status(404).send("Request Not Found")
    }
    connectionRequest.status = status;

    const data = await connectionRequest.save();

    res.send({ message: `Connection Request is ${status}`, data })
  }catch(err){
    res.status(400).send("Something Went Wrong")
  }
})
module.exports = requestRouter;
