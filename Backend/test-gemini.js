require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GEN_ApI_KEY
});

async function test() {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash-lite",
            contents: "Reply with exactly: API WORKING"
        });

        console.log(response.text);
    } catch (error) {
        console.error("GEMINI TEST ERROR:");
        console.error(error);
    }
}

test();