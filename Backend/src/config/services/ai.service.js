
require("dotenv").config();

const Groq = require("groq-sdk");
const { z } = require("zod");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

// ==========================================
// 1. ZOD VALIDATION SCHEMA
// ==========================================

const questionSchema = z.object({
    question: z.string().trim().min(1),
    intention: z.string().trim().min(1),
    answer: z.string().trim().min(1)
}).strict();

const skillGapSchema = z.object({
    skill: z.string().trim().min(1),
    severity: z.enum(["low", "medium", "high"])
}).strict();

const preparationDaySchema = z.object({
    day: z.number().int().min(1).max(7),
    focus: z.string().trim().min(1),
    tasks: z.array(z.string().trim().min(1)).min(1)
}).strict();

const interviewReportSchema = z.object({
    matchScore: z.number().min(0).max(100),

    technicalquestion: z.array(questionSchema).length(3),

    behaviouralquestion: z.array(questionSchema).length(2),

    // Empty skill gaps are valid.
    skillGaps: z.array(skillGapSchema),

    preparationPlan: z.array(preparationDaySchema).length(7),

    title: z.string().trim().min(1)
}).strict();


// ==========================================
// 2. GROQ STRUCTURED OUTPUT JSON SCHEMA
// ==========================================

const groqResponseSchema = {
    type: "object",
    properties: {
        matchScore: {
            type: "number"
        },

        technicalquestion: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    question: { type: "string" },
                    intention: { type: "string" },
                    answer: { type: "string" }
                },
                required: ["question", "intention", "answer"],
                additionalProperties: false
            }
        },

        behaviouralquestion: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    question: { type: "string" },
                    intention: { type: "string" },
                    answer: { type: "string" }
                },
                required: ["question", "intention", "answer"],
                additionalProperties: false
            }
        },

        skillGaps: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    skill: { type: "string" },
                    severity: {
                        type: "string",
                        enum: ["low", "medium", "high"]
                    }
                },
                required: ["skill", "severity"],
                additionalProperties: false
            }
        },

        preparationPlan: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    day: { type: "integer" },
                    focus: { type: "string" },
                    tasks: {
                        type: "array",
                        items: { type: "string" }
                    }
                },
                required: ["day", "focus", "tasks"],
                additionalProperties: false
            }
        },

        title: {
            type: "string"
        }
    },

    required: [
        "matchScore",
        "technicalquestion",
        "behaviouralquestion",
        "skillGaps",
        "preparationPlan",
        "title"
    ],

    additionalProperties: false
};


// ==========================================
// 3. GENERATE INTERVIEW REPORT
// ==========================================

async function generateInterviewReport({
    resume,
    selfDescription,
    jobDescription,
    mlAnalysis
}) {

    console.log("🔥 AI SERVICE CALLED");
    console.log(
        "Groq key loaded:",
        process.env.GROQ_API_KEY ? "YES" : "NO"
    );

    if (!process.env.GROQ_API_KEY) {
        throw new Error("GROQ_API_KEY is missing in environment variables.");
    }

    if (!jobDescription || !String(jobDescription).trim()) {
        throw new Error("Job description is required.");
    }

    if (!resume || !String(resume).trim()) {
        throw new Error("Resume content is required.");
    }

    // Use the ML-generated score without recalculating it.
    const mlMatchScore = Number(mlAnalysis?.matchScore ?? 0);

    if (
        !Number.isFinite(mlMatchScore) ||
        mlMatchScore < 0 ||
        mlMatchScore > 100
    ) {
        throw new Error("Invalid match score received from ML service.");
    }

    const resumeForAI = String(resume).slice(0, 8000);

    const matchedSkills = Array.isArray(mlAnalysis?.matchedSkills)
        ? mlAnalysis.matchedSkills.join(", ")
        : "None";

    const missingSkills = Array.isArray(mlAnalysis?.missingSkills)
        ? mlAnalysis.missingSkills
        : [];

    const missingSkillsText = missingSkills.length
        ? missingSkills.join(", ")
        : "None";

    const prompt = `
You are an expert technical interviewer and career coach.

Generate a personalized interview preparation report using the candidate's actual information.

CANDIDATE RESUME:
${resumeForAI}

SELF DESCRIPTION:
${selfDescription || "No self-description provided."}

JOB DESCRIPTION:
${jobDescription}

ML ANALYSIS:
Match Score: ${mlMatchScore}
Match Level: ${mlAnalysis?.matchLevel ?? "Not available"}
Matched Skills: ${matchedSkills}
Missing Skills: ${missingSkillsText}

IMPORTANT MATCH SCORE RULE:
The ML model has already calculated the match score.
Return exactly ${mlMatchScore} as matchScore.
Do not calculate or modify this score.

TECHNICAL QUESTIONS:
Generate exactly 3 relevant technical interview questions.
Each question must have:
- question
- intention
- answer

BEHAVIOURAL QUESTIONS:
Generate exactly 2 relevant behavioural interview questions.
Each question must have:
- question
- intention
- answer

For answers:
- Explain the important points the candidate should cover.
- Provide a useful answer structure or sample response.
- Use the candidate's actual experience only.
- Never invent internships, companies, clients, achievements, or projects.
- If actual experience is unavailable, provide an answer framework the candidate can personalize.
- Use plain text only.
- Do not include Markdown, code fences, or code blocks.
- Avoid unnecessary quotation marks.

SKILL GAPS:
Use only the ML model's missing skills.
For every missing skill, provide:
- skill
- severity: low, medium, or high

If there are no missing skills, return an empty array [].
Do not invent missing skills.

PREPARATION PLAN:
Generate exactly 7 preparation days.
Use sequential numeric day values: 1, 2, 3, 4, 5, 6, 7.
Each day must contain:
- day: number
- focus: string
- tasks: array of at least 2 actionable strings

The plan must address the job description, missing skills, and candidate's existing knowledge.

JOB TITLE:
Extract the most appropriate job title from the job description.
Do not use a generic title if an actual title is available.

OUTPUT:
Return exactly these six top-level fields:
matchScore
technicalquestion
behaviouralquestion
skillGaps
preparationPlan
title

Return only the structured JSON object.
Do not add explanations outside the JSON.
`;

    console.log("🔥 ABOUT TO CALL GROQ");

    try {

        // ==========================================
        // 4. GROQ API CALL WITH STRICT JSON SCHEMA
        // ==========================================

        const response = await groq.chat.completions.create({
            model: "openai/gpt-oss-120b",

            messages: [
                {
                    role: "system",
                    content:
                        "You are a professional technical interviewer. " +
                        "Generate accurate, personalized interview reports. " +
                        "Follow the supplied response schema exactly. " +
                        "Never invent candidate experience."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],

            response_format: {
                type: "json_schema",
                json_schema: {
                    name: "interview_report",
                    strict: true,
                    schema: groqResponseSchema
                }
            },

            temperature: 0.2
        });

        console.log("🔥 GROQ RESPONSE RECEIVED");

        const content = response.choices?.[0]?.message?.content;

        if (!content) {
            throw new Error("Groq returned an empty response.");
        }

        // ==========================================
        // 5. PARSE JSON
        // ==========================================

        const interviewReport = JSON.parse(content);

        // Always preserve the ML-generated match score.
        interviewReport.matchScore = mlMatchScore;

        // ==========================================
        // 6. ZOD VALIDATION
        // ==========================================

        const validationResult =
            interviewReportSchema.safeParse(interviewReport);

        if (!validationResult.success) {
            console.error(
                "❌ INTERVIEW REPORT VALIDATION FAILED:",
                validationResult.error.flatten()
            );

            throw new Error(
                "AI generated a report that did not meet the required format. Please try again."
            );
        }

        const validatedReport = validationResult.data;

        // ==========================================
        // 7. FINAL REPORT
        // ==========================================

        console.log("✅ INTERVIEW REPORT VALIDATED SUCCESSFULLY");

        console.log("Technical Questions:",
            validatedReport.technicalquestion.length
        );

        console.log("Behavioural Questions:",
            validatedReport.behaviouralquestion.length
        );

        console.log("Skill Gaps:",
            validatedReport.skillGaps.length
        );

        console.log("Preparation Days:",
            validatedReport.preparationPlan.length
        );

        return validatedReport;

    } catch (error) {

        console.error("🔥 GROQ / AI SERVICE ERROR:");

        if (error instanceof SyntaxError) {
            console.error("Invalid JSON received from Groq.");
        }

        console.error(error);

        throw error;
    }
}


// ==========================================
// 8. EXPORT
// ==========================================

module.exports = generateInterviewReport;
