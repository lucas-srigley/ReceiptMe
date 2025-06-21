// server.js
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import 'dotenv/config';
import { handleReceiptUpload } from './gemini.js';
import mongoose from 'mongoose';

const app = express();
const upload = multer({
  dest: 'uploads/',
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type'), false);
    }
  },
});

const PORT = 3001;

app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb+srv://jamie:able2332@receiptme.jrijp23.mongodb.net/?retryWrites=true&w=majority&appName=receiptMe', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Receipt Schema
const receiptSchema = new mongoose.Schema({
  receiptId: String,
  vendor: String,
  date: {type: Date},
  items: [{
    itemId: String,
    name: String,
    category: String,
    price: Number
  }]
});

const Receipt = mongoose.model('Receipt', receiptSchema);

app.post('/upload', upload.single('receipt'), async (req, res) => {
  try {
    const parsedText = await handleReceiptUpload(req.file);
    const receiptData = JSON.parse(parsedText.replace(/^```json\n/, '').replace(/\n```$/, ''));

    const receipt = new Receipt(receiptData);
    await receipt.save();

    res.json({ parsed: parsedText, saved: true });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error processing receipt');
  }
});

app.get('/spending-summary', async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const receipts = await Receipt.find({ date: { $gte: thirtyDaysAgo } });


    const categoryTotals = {};

    receipts.forEach(receipt => {
      receipt.items.forEach(item => {
        const category = item.category || 'Other';
        if (!categoryTotals[category]) {
          categoryTotals[category] = 0;
        }
        categoryTotals[category] += item.price;
      });
    });

    const totalSpent = Object.values(categoryTotals).reduce((sum, val) => sum + val, 0);

    const summary = Object.entries(categoryTotals).map(([name, amount]) => ({
      name,
      amount,
      percentage: Math.round((amount / totalSpent) * 100),
    }));

    res.json(summary);
  } catch (err) {
    console.error('Error generating spending summary:', err);
    res.status(500).send('Error generating summary');
  }
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
