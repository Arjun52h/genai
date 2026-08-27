const express = require("express");
const cookieParser = require("cookie-parser");
const app = express(); // inititate server

const cors  = require("cors")
app.use(express.json()) // middleware , allow request body to json
app.use(cookieParser()) // middleware , allow to parse cookie from request header
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://genai-nine-chi.vercel.app"
    ],
    credentials: true
}));
const authRouter = require("./routes/auth.routs.js")
const interviewRouter = require("./routes/interview.routes.js")
app.use("/api/auth" , authRouter)
app.use("/api/interview",interviewRouter)

module.exports = app
 