const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

console.log(process.env.GEMINI_APIKEY);

// Access your API key as an environment variable
const gemini = new GoogleGenerativeAI(process.env.GEMINI_APIKEY);

async function generateEmail() {
  try {
    // Get the model (assuming getGenerativeModel returns a promise)
    const model = await gemini.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        candidateCount: 1,
        stopSequences: ["x"],
        maxOutputTokens: 20,
        temperature: 1.0,
      },
    });

    // Generate content using the model (also assuming this returns a promise)
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

    console.log(result.response.text()); // Log the actual result
  } catch (error) {
    console.error("Error generating email:", error); // Handle any errors
  }
}

// Call the async function to generate the email
generateEmail();