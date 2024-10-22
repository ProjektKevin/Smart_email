const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

// Access your API key as an environment variable
const gemini = new GoogleGenerativeAI(process.env.GEMINI_APIKEY);

const model = gemini.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    candidateCount: 1,
    stopSequences: ["x"],
    maxOutputTokens: 20,
    temperature: 1.0,
  },
});

const result = model.generateContent({
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: "You are to act as a email assistant. Based on the following information that I provide to you, create an email that is formal and polite. ensure no information gets left out. You are to only respond with the email body contents and nothing more.",
          }
        ],
      },
      {
        role: 'user',
        parts: [
          {
            text: "ms Toe i want to go home tomorrow. i dont want to go to work anymore. its been 10 days and i havent seen my family",
          }
        ],
      }
    ],
    generationConfig: {
      maxOutputTokens: 1000,
      temperature: 0.1,
    },
  });
  console.log(result.response);
  