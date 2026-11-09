const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        unique : [true , "username already exists"],
        required : [true , "username is required"]
    },
    email :{
        type : String,
        unique : [true , "email already exists"],
        required : [true , "email is required"]
    },
    password :{
        type : String,
        required : [true , "password is required"]
    },
    aiUsageDate: {
    type: String,
    default: null
    },
    aiUsageCount: {
        type: Number,
        default: 0
    }
})
const userModel = mongoose.model("Users" , UserSchema);

module.exports = userModel
