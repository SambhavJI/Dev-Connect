const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config()

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            res.status(401);
            throw new Error("No token found. Please login to continue.");
        }

        const decodeObj = jwt.verify(token, process.env.SECRET_PASSCODE);
        const { _id } = decodeObj;

        const user = await User.findById(_id);
        if (!user) {
            throw new Error("User not found. Please login again.");
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(401).send("ERROR: " + err.message);
    }
};

module.exports = {
    userAuth
};
