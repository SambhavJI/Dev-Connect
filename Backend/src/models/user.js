const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength : 4,
        maxLength : 50

    },
    lastName: {
        type: String,
        minLength : 4,
        maxLength : 50
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
        type: String,
        required: true,
    },
    gender: {
        type: String
    },
    age: {
        type: Number
    },
    photoUrl:{
        type:String,
        default:"User image",
        maxLength:255
    },
    about:{
        type:String,
        maxLength:500
    },
    skills:{
        type:[String]
    }
},{
    timestamps  :true
},
)

module.exports = mongoose.model("User", userSchema)