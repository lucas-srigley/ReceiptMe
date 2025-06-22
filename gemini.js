import fs from 'fs';
import path from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function handleReceiptUpload(file) {
  const imagePath = path.resolve(file.path);
  const imageData = fs.readFileSync(imagePath, { encoding: 'base64' });

  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const categories = 'Groceries, Dining & Takeout, Entertainment, Shopping, Transportation, Housing, Health & Wellness, Other (Type Category)';

  const prompt = `Extract the receipt data and return it in this JSON format:
  {
    "receiptId": "",
    "vendor": "",
    "date": "",
    "items": [
      {
        "itemId": "",
        "name": "",
        "category": "",
        "price": ""
      }
    ]
  } Generate random 32 bit id for receiptId and itemId. For category, choose one from here ` + categories;

  const result = await model.generateContent([
    {
      inlineData: {
        mimeType: file.mimetype,
        data: imageData,
      },
    },
    {
      text: prompt,
    },
  ]);

  const response = await result.response;
const text = response.text();
console.log('api called');

fs.unlinkSync(imagePath);

  const parsed = JSON.parse(text.replace(/^```json\n/, '').replace(/\n```$/, ''));
  
  parsed.date = new Date();

  return parsed;

}

export async function generateAISpendingSummary(receiptSummary) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const prompt = `Based on this JSON spending breakdown over the last 30 days, give a short AI-generated financial insight, trends, and advice:
  
  ${JSON.stringify(receiptSummary)}

  Return only one paragraph of advice.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  console.log('Gemini called for spending summary');
  return text;
}
