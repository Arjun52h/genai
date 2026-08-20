const { PDFParse } = require("pdf-parse");
const generateInterviewReport = require("../services/ai.service")
const interviewReportModel = require("../models/interviewmodel_report")
async function generateInterviewReportController(req,res){ 
    console.log("🔥 CONTROLLER HIT");

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    try {
        if(!req.file) {
            return res.status(400).json({error : "No file uploaded"});
        }
        const resumeContent = await (new  PDFParse(Uint8Array.from(req.file.buffer))).getText();
        const {selfDescription , jobDescription}  = req.body
        const interviewReportbyai = await generateInterviewReport({
            resume : resumeContent.text,
            selfDescription,
            jobDescription
        }) 
        const interviewReport = await interviewReportModel.create({
            user : req.user._id,
            resume:resumeContent.text,
            selfDescription,
            jobDescription,
            ...interviewReportbyai,
            title: interviewReportbyai.title || "Software Engineer",

        })
        res.status(201).json({
            message:"Interview Report generated Succesfully", 
            interviewReport 
        });
    }catch (error) {
    console.error("🔥 INTERVIEW CONTROLLER ERROR:", error);

    return res.status(500).json({
        message: "Failed to generate interview report",
        error: error.message
    });
}
    }
    
/**
 * @description controller to get interview report by interviewId . 
 */
async function generateInterviewReportByControllerId(req,res){
    const {interviewId} = req.params
    const interviewReport = await interviewReportModel.findOne({_id : interviewId , user : req.user.id})

    if(!interviewReport){
        return res.status(404).json({
            message: "Interview report not found"
        })
    }

    res.status(200).json({
        message: "Interview Report fetched Successfully",
        interviewReport
    })
    
}


async function getallinterviewReport(req, res) {
    const interviewReports = await interviewReportModel.findOne({user : req.user.id}).sort({createdAt }).select("-resume -selfDescription -jobDescription -_v -technicalQuestion -behaviouralquestion -skillGaps -preparationPlan")

    res.status(200).json({
        message: "Interview Report fetched Successfully",
        interviewReports
    })
}

module.exports = {generateInterviewReportController  , generateInterviewReportByControllerId , getallinterviewReport}