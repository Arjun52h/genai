const express = require("express") 
const interviewRouter  = express.Router()
const authMiddleware = require("../middlewares/auth.middleware")
const interviewcontroller = require("../controller/interview.controller")
const upload = require("../middlewares/file.middleware")

/**
 * 
 * @routes POST/api/interview
 * @description generate new interview report on the basis of user self description,resume pdf and job description 
 * @access private
 */
interviewRouter.post("/",authMiddleware.authUser,upload.single("resume"),interviewcontroller.generateInterviewReportController) // forard request only if logged in user by middleware


/**
 * 
 */

interviewRouter.get(
    "/:interviewId",
    authMiddleware.authUser,
    interviewcontroller.generateInterviewReportByControllerId
)


/**
 * @description get all report
 */

interviewRouter.get("/" ,authMiddleware.authUser , interviewcontroller.getallinterviewReport)
module.exports = interviewRouter