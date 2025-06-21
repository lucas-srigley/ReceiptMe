// server.js
import 'dotenv/config';
import express from 'express';
import { runGemini } from './gemini.js';

const app = express();
const PORT = 3000;

app.get('/', async (req, res) => {
  try {
    const geminiResponse = await runGemini();
    res.send(`<h1>Gemini says:</h1><pre>${geminiResponse}</pre>`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing Gemini request.');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
