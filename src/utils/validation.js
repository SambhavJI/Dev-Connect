const validator = require("validator")
const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("Name Not Valid")
    }
    else if (!validator.isEmail(emailId)) {
        throw new Error("Email ID Not Valid");
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("Password Is Not Strong")
    }
}
const validateEditData = (req) => {
    const allowedEdits = [
        "firstName", "lastName", "about", "gender", "skills", "photoUrl"
    ]
    const isAllowed = Object.keys(req.body).every((feild) => {
    return allowedEdits.includes(feild);
});
    return isAllowed
}

module.exports = {
    validateSignUpData,
    validateEditData
}