const mongoose = require("mongoose");
const { string } = require("zod");



const preparationShema = new mongoose.Schema({
    day:{
        type:Number,
        required:[true, "day is required"]
    },
    focus:{
        type:String,
        required:[true, "focus is required"]
    },
    tasks:[{
        type:String,
        required:[true,"tasks is required"]
    }]
},
{
    _id:false
})
const skillShema = new mongoose.Schema({
    skill:{
        type:String,
        required:[true, "Skill is required"]
    },
    severity:{
        type:String,
        enum :["low","medium","high"],
        required:[true ,"severity is required"]
    }
},{
    _id:false
})


const technicalquestionSchema = new mongoose.Schema({
    question :{
        type : String,
        required:[true, "technical question is required"]
    },
    intention:{
        type:String,
        required:[true,"Intention is required"]
    },
    answer:{
        type:String,
        required:[true,"answer is required"]
    }
},{
    _id:false
})
const behaviourquestionSchema = new mongoose.Schema({
    question :{
        type : String,
        required:[true, "technical question is required"]
    },
    intention:{
        type:String,
        required:[true,"Intention is required"]
    },
    answer:{
        type:String,
        required:[true,"answer is required"]
    }
},{
    _id:false
})

const interviewreportSchema = new mongoose.Schema({
    jobDescription : {
        type: String,
        required:[true, "job description is required"]
    },
    resume:{
        type : String
    },
    selfDescription:{
        type : String
    },
    matchScore:{
        type:Number,
        min : 0,
        max:100
    },
    technicalquestion:[technicalquestionSchema],
    behaviouralquestion:[behaviourquestionSchema],
    skillGaps:[skillShema],
    preparationPlan :[preparationShema],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    title:{
        type:String,
        required:[true , "Job title is required"]
    }
},
{
    timestamps : true
})


const interviewModelSchema = mongoose.model(
    "InterviewReport",
    interviewreportSchema
);

module.exports = interviewModelSchema;