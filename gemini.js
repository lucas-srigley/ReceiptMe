// gemini.js
import fs from 'fs';
import path from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function runGemini() {
  // Read and encode image file (change the path and type if needed)
  const imagePath = path.resolve('./costco_receipt.jpg');  // your image file path
  const imageData = fs.readFileSync(imagePath, { encoding: 'base64' });

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const receiptJSON = `{
    "receiptId": "",
    "vendor": "",
    "date": "",
    "items": [
      {
        "itemId": "",
        "itemName": "",
        "category": "",
        "price": ""
      }
      // list other items if needed
    ]
  }`;

  const categories = 'Groceries, Dining and Takeout, Transportation, Housing/Rent, Travel,  Health & Wellness, Education, Clothes, Entertainment & Recreation, Charity & Giving, Miscellaneous';

  const result = await model.generateContent([
    {
      inlineData: {
        mimeType: 'image/jpeg',  // or 'image/png'
        data: imageData,
      }
    },
    {
      text: "For this receipt, extract into this JSON format:\n"
      + receiptJSON + "\nFor categories, choose one from this list:\n"
      + categories + "\nGenerate random 32 bit id for receiptId and itemId"
    }
  ]);

  const response = await result.response;
  return response.text();
}
