const { PDFParse } = require("pdf-parse");
const axios = require("axios");
const generateInterviewReport = require("../services/ai.service");
const interviewReportModel = require("../models/interviewmodel_report");
const userModel = require("../models/user_models");
const demoReport = require("../services/demoReport");

const DAILY_AI_LIMIT = 3; // Change this number if required

function getTodayDate() {
    return new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Kolkata"
    }).format(new Date());
}

async function reserveDailyUsage(userId) {
    const today = getTodayDate();

    const result = await userModel.updateOne(
        {
            _id: userId,
            $or: [
                { aiUsageDate: { $ne: today } },
                { aiUsageCount: { $lt: DAILY_AI_LIMIT } }
            ]
        },
        [
            {
                $set: {
                    aiUsageCount: {
                        $cond: [
                            { $eq: ["$aiUsageDate", today] },
                            { $add: [{ $ifNull: ["$aiUsageCount", 0] }, 1] },
                            1
                        ]
                    },
                    aiUsageDate: today
                }
            }
        ],
        { updatePipeline: true }
    );

    return result.modifiedCount === 1;
}

async function releaseDailyUsage(userId, today) {
    await userModel.updateOne(
        {
            _id: userId,
            aiUsageDate: today,
            aiUsageCount: { $gt: 0 }
        },
        {
            $inc: { aiUsageCount: -1 }
        }
    );
}


async function generateInterviewReportController(req, res) {
     console.log("🔥 CONTROLLER STARTED");
    const userId = req.user.id || req.user._id;
    const today = getTodayDate();
    let usageReserved = false;

    try {
        if (!req.file) {
            return res.status(400).json({
                error: "No file uploaded"
            });
        }

        const { selfDescription, jobDescription } = req.body;

        if (!jobDescription) {
            return res.status(400).json({
                error: "Please provide self description and job description"
            });
        }

        // Check and reserve the user's daily AI usage
        usageReserved = await reserveDailyUsage(userId);

        if (!usageReserved) {
            return res.status(429).json({
                code: "AI_DAILY_LIMIT_REACHED",
                message: "Your daily AI generation limit has been reached. Please try again tomorrow.",
                isDemo: true,
                interviewReport: demoReport
            });
        }

        // Extract resume text
        const resumeContent = await (
            new PDFParse(Uint8Array.from(req.file.buffer))
        ).getText();

        

        console.log("ML URL:", JSON.stringify(process.env.ML_API_URL));

console.log("HTTP_PROXY:", process.env.HTTP_PROXY);
console.log("HTTPS_PROXY:", process.env.HTTPS_PROXY);
console.log("ALL_PROXY:", process.env.ALL_PROXY);
      
// Run ML Resume-JD Analysis
const mlApiUrl = process.env.ML_API_URL;

if (!mlApiUrl) {
    throw new Error("ML_API_URL is not configured");
}

console.log("Calling ML Service:", mlApiUrl);

console.log("BACKEND PROCESS:", process.pid);
console.log("ACTUAL ML URL:", mlApiUrl);
console.log("REQUESTING RENDER ML SERVICE...");

try {
    const mlResponse = await axios.post(
        mlApiUrl,
        {
            resume: resumeContent.text,
            jobDescription
        },
        {
            timeout: 60000,
            proxy: false
        }
    );

    console.log("ML RESPONSE STATUS:", mlResponse.status);

    const mlAnalysis = mlResponse.data;

} catch (err) {
    console.error("ML REQUEST FAILED:", {
        message: err.message,
        url: err.config?.url,
        hostname: err.hostname,
        code: err.code
    });

    throw err;
}

const mlAnalysis = mlResponse.data;

console.log("ML Analysis received:", mlAnalysis);


        // Generate report using Gemini
        const interviewReportbyai = await generateInterviewReport({
            resume: resumeContent.text,
            selfDescription,
            jobDescription,
            mlAnalysis
        });

        // Save report in MongoDB
        const interviewReport = await interviewReportModel.create({
            user: userId,
            resume: resumeContent.text,
            selfDescription,
            jobDescription,
            ...interviewReportbyai,
            title: interviewReportbyai.title || "Software Engineer"
        });

        return res.status(201).json({
            message: "Interview Report generated successfully",
            interviewReport,
            isDemo: false
        });

    } catch (error) {
        console.error("INTERVIEW CONTROLLER ERROR:", error);

        // Give the reserved usage back if generation failed
        if (usageReserved) {
            try {
                await releaseDailyUsage(userId, today);
            } catch (releaseError) {
                console.error("Failed to release AI usage:", releaseError);
            }
        }

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