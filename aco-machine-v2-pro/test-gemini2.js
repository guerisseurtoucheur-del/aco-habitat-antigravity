require('dotenv').config({ path: '.env.local' });
const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function run() {
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: "Hello",
        config: { 
          temperature: 0.1,
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              nom: { type: "STRING" }
            },
            required: ["nom"]
          }
        }
    });
    console.log("RESPONSE:", response.text);
  } catch (err) {
    console.error("ERROR:", err.message);
  }
}
run();
