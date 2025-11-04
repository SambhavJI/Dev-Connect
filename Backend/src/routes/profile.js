const express = require("express")
const { userAuth } = require("../middlewares/auth.js")
const profileRouter = express.Router();
const { validateEditData } = require("../utils/validation.js")
const bcrypt = require("bcrypt")
const validator = require("validator")

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {

        res.send(req.user)

    } catch (err) {
        console.error("An error occured...")
        res.status(400).json({
            error: err.message || "Something went wrong"
        });
    }
})
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if (!validateEditData(req)) {
            throw new Error("Invalid Field Updates")
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key) => {
            loggedInUser[key] = req.body[key]
        })

        await loggedInUser.save();
        res.send(`${loggedInUser.firstName} you have been updated successfully`);


    } catch (err) {
        res.status(401).send("ERROR:" + err.message)
    }
})
profileRouter.patch("/profile/changePassword", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const { currentPassword } = req.body;
        const { newPassword } = req.body;
        const isValid = await bcrypt.compare(currentPassword, loggedInUser.password)
        if (isValid) {
            const isStrong = validator.isStrongPassword(newPassword);
            if (!isStrong) {
                throw new Error("New Password must Be strong")
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            loggedInUser.password = hashedPassword;

            await loggedInUser.save();
            res.send(`User ${loggedInUser.firstName} updated their password`)
        }
        throw new Error("Passwords dont match")
    } catch (err) {
        res.status(400).send("ERROR:" + err.message)
    }
})
module.exports = profileRouter