// server.js
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import 'dotenv/config';
import { handleReceiptUpload } from './gemini.js';

const app = express();
const upload = multer({ dest: 'uploads/' });
const PORT = 3001;

app.use(cors());

app.post('/upload', upload.single('receipt'), async (req, res) => {
  try {
    const parsedText = await handleReceiptUpload(req.file);
    res.json({ parsed: parsedText });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error processing receipt');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
