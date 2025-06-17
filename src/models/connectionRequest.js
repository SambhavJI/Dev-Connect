const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["accepted", "rejected", "ignored", "interested"],
            message: (props) => `${props.value} is an invalid status type`
        }
    }
}, {
    timestamps: true
});
connectionRequestSchema.index({
    fromUserId:1,toUserId:1
})
connectionRequestSchema.pre("save", function (next) {
    const connectionRequest = this;
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("Cannot Send Connection Request To Yourself");
    }
    next();
});

const ConnectionRequestModel = mongoose.model("connectionRequest", connectionRequestSchema);

module.exports = ConnectionRequestModel;
