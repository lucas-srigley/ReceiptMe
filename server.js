// server.js
import 'dotenv/config';
import express from 'express';
import { runGemini } from './gemini.js';

const app = express();
const PORT = 3000;

app.get('/', async (req, res) => {
  await runGemini();
  res.send('Gemini response logged to console');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
