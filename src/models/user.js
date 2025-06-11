const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Not a valid email")
            }
        }
    },
    password: {
        type: String
    },
    gender: {
        type: String
    },
    age: {
        type: Number
    },
    photoUrl:{
        type:String,
        default:"User image"
    }
},{
    timestamps  :true
})

module.exports = mongoose.model("User", userSchema)