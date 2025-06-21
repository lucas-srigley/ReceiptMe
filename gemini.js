// gemini.js
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function runGemini() {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent("Give me 3 fun facts about Canada.");
  const response = await result.response;
  console.log('logging')
  console.log(response.text());
}
