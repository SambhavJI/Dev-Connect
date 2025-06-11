const validator = require("validator")
const validateSignUpData = (req)=>{
    const{firstName,lastName,emailId,password}=req.body;

    if(!firstName || !lastName){
        throw new Error("Name Not Valid")
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email ID Not Valid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password Is Not Strong")
    }
}

module.exports = validateSignUpData; 