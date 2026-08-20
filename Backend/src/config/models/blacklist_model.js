const mongoose = require("mongoose")

const BlaklistSchema = new mongoose.Schema({
    token :{
        type : String ,
        required : [true, "token is required"]
    }
},
    {
        timestamps : true
    }
)

const blacklistModel = mongoose.model("blacklist" , BlaklistSchema)
module.exports = blacklistModel
