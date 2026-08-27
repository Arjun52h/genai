const {GoogleGenAI} =require('@google/genai')
 const {z} = require("zod")
 const {zodToJsonSchema} = require("zod-to-json-schema")

 const ai = new GoogleGenAI({
    apiKey : process.env.GOOGLE_GEN_ApI_KEY
 })


 const interviewReportSchema = z.object({
    matchScore:z.number().describe("give  A overall score   based on candidate resume and score between 0 to 100 indicating how well the candidate profile matches the job description"),
    technicalquestion:z.array(z.object({
        question:z.string().describe("The technical Question can be ask in Interview"),
        intention:z.string().describe("The Intention of Interviwer behind asking the questions"),
        answer:z.string().describe("How to answer this question wht points to cover ,what approach to take etc ")
    })).describe("Technical question that can be asked in the interview along with their intention and how to answer them").min(1),
    behaviouralquestion:z.array(z.object({
        question:z.string().describe("The behavioural Question can be ask in Interview"),
        intention:z.string().describe("The Intention of Interviwer behind asking the questions"),
        answer:z.string().describe("How to answer this question wht points to cover ,what approach should be used ")
    })).describe("Behavioural question that can be asked in the interview along with their intention and how to answer them").min(1),
    skillGaps : z.array(z.object({
        skill : z.string().describe("The skill which the candidate is lacking ") ,
        severity: z.enum(["low", "medium","high"]).describe("The severity of skill gap i.e. ")
    })).describe("List of skill gap in the candidate's profile along with their severity ").min(1),
    preparationPlan: z.array(z.object({
        day : z.number().describe("The sequential preparation day number, starting from 1"),
        focus:z.string().describe("The main skill, topic, or interview area to focus on during this day "),
        tasks: z.array(z.string()).describe(
    "List of specific and actionable tasks the candidate should complete on this day"
).min(1)
    })).describe("A personalized day-wise preparation plan based on the candidate's resume, self-description, skill gaps, and job description").length(7),
    title: z.string().describe("The title of the job   for which the interview  report is generated")
    
 })

 async function generateInterviewReport({resume , selfDescription , jobDescription}){
       const prompt = `
You are an expert technical interviewer and career coach.

Analyze the candidate based on:

RESUME:
${resume}

SELF DESCRIPTION:
${selfDescription || "No self-description provided."}

JOB DESCRIPTION:
${jobDescription}

Generate a complete interview preparation report.

IMPORTANT:
You MUST follow the exact JSON structure provided by the schema.

1. matchScore
Give an overall score from 0 to 100.

2. technicalquestion
Generate at least 8 technical questions.

Each item MUST be an object:

{
  "question": "Question text",
  "intention": "Why interviewer asks this",
  "answer": "How the candidate should answer"
}

DO NOT return technical questions as strings.

3. behaviouralquestion
Generate at least 5 behavioural questions.

Each item MUST be:

{
  "question": "Question text",
  "intention": "Why interviewer asks this",
  "answer": "How the candidate should answer"
}

DO NOT return behavioural questions as strings.

4. skillGaps
Compare the candidate's resume against the job description.

Each skill gap MUST be an object:

{
  "skill": "TypeScript",
  "severity": "medium"
}

severity MUST be one of:
"low", "medium", "high"

DO NOT return skillGaps as strings.

5. preparationPlan
Generate exactly 7 days.

Each day MUST be an object:

{
  "day": 1,
  "focus": "JavaScript fundamentals",
  "tasks": [
    "Revise closures",
    "Practice promises",
    "Solve 5 JavaScript problems"
  ]
}

The tasks field MUST be an array of strings.

DO NOT return preparationPlan as strings.

6. title
Extract the actual job title from the job description.

For example:
"Software Engineer"

IMPORTANT:
Use these EXACT field names:

matchScore
technicalquestion
behaviouralquestion
skillGaps
preparationPlan
title

Do NOT use:

jobTitle
technicalQuestions
behavioralQuestions

Do NOT return empty arrays.

Return ONLY valid JSON matching the schema.
`;

    

        
        const response = await ai.models.generateContent({
        model:"gemini-3.6-flash",
        contents:prompt,
        config:{
            responseMimeType:"application/json",
            // responseJsonSchema:zodToJsonSchema(interviewReportSchema),
            
        }
         })

    //    console.log("🔥 GEMINI RESPONSE OBJECT:");
    //     console.log(response);

       const interviewReport = JSON.parse(response.text);

        console.log("🔥🔥 ACTUAL GEMINI JSON 🔥🔥");
        console.log(JSON.stringify(interviewReport, null, 2));

        const validatedReport = interviewReportSchema.parse(interviewReport);

        return validatedReport;
      
     
 }

// 

 module.exports = generateInterviewReport