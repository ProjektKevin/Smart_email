const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

GEMINI_APIKEY = process.env.GEMINI_APIKEY;

module.exports.requestGemini = async (data, callback) => {
    const gemini = new GoogleGenerativeAI(GEMINI_APIKEY);

    try {
        const model = await gemini.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
            candidateCount: 1,
            stopSequences: ["x"],
            maxOutputTokens: 20,
            temperature: 1.0,
        },
        });

        const result = await model.generateContent({
            contents: [
                {
                    role: 'user',
                    parts: [
                        {
                            text: "You are to act as an email assistant. Based on the following information that I provide to you, create an email that is formal and polite. Ensure no information gets left out. You are to only respond with the email body contents and nothing more.",
                        }
                    ],
                },
                {
                    role: 'user',
                    parts: [
                        {
                            text: data,
                        }
                    ],
                }
            ],
            generationConfig: {
                maxOutputTokens: 1000,
                temperature: 0.1,
            },
        });

        return result.response.text();

    } catch (error) {
        console.error("Error generating gemini response:", error); 
        
    }

};