const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            throw new Error("No token provided");
        }

        const decodeObj = jwt.verify(token, "Sambhav@12123"); // Secret should be in env
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
