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
app.use(express.json());

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

    const receiptData = await handleReceiptUpload(req.file);
    const receipt = new Receipt(receiptData);
    await receipt.save();

    res.json({ parsed: receiptData, saved: true });
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

app.get('/api/receipts', async (req, res) => {
  try {
    const receipts = await Receipt.find();
    res.json(receipts);
  } catch (err) {
    console.error('Error fetching receipts:', err);
    res.status(500).send('Error fetching receipts');
  }
});

app.post('/api/expenses', async (req, res) => {
  console.log('Incoming expense:', req.body);
  try {
    const { vendor, items } = req.body;

    if (!vendor || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Invalid expense data' });
    }

    const receiptId = Math.floor(Math.random() * 1e9).toString(); // generate random receipt ID

    const receipt = new Receipt({
      receiptId,
      vendor,
      date: new Date(),
      items: items.map((item, index) => ({
        itemId: Math.floor(Math.random() * 1e9).toString(),
        name: item.description || 'Unknown',
        category: item.category || 'Other',
        price: parseFloat(item.amount) || 0,
      })),
    });

    await receipt.save();

    res.status(201).json({ success: true, message: 'Expense added', receipt });
  } catch (err) {
    console.error('Error saving manual expense:', err);
    res.status(500).json({ error: 'Failed to save expense' });
  }
});

app.get('/demographic-comparison', async (req, res) => {
  try {
    const scope = req.query.scope || 'global'; // 'global', 'country', 'city', 'age group'
    const currentUserId = req.query.userId; // optionally passed from frontend

    // Fetch current user's data (you may need user context)
    const userReceipts = await Receipt.find({ userId: currentUserId, date: { $gte: lastMonth } });

    // Aggregate all receipts matching the demographic scope
    let filters = { date: { $gte: lastMonth } };

    if (scope === 'country') {
      filters.country = 'Canada'; // You'll need user profile info
    } else if (scope === 'city') {
      filters.city = 'Toronto';
    } else if (scope === 'age group') {
      filters.ageGroup = '18-25';
    }

    const allReceipts = await Receipt.find(filters);

    // Calculate averages
    const categoryTotals = {};
    const categoryCounts = {};

    allReceipts.forEach((r) => {
      r.items.forEach((item) => {
        if (!categoryTotals[item.category]) {
          categoryTotals[item.category] = 0;
          categoryCounts[item.category] = 0;
        }
        categoryTotals[item.category] += item.price;
        categoryCounts[item.category]++;
      });
    });

    const avgByCategory = {};
    for (const cat in categoryTotals) {
      avgByCategory[cat] = categoryTotals[cat] / categoryCounts[cat];
    }

    // Compare to current user's totals
    const userCategoryTotals = {};
    userReceipts.forEach((r) => {
      r.items.forEach((item) => {
        userCategoryTotals[item.category] = (userCategoryTotals[item.category] || 0) + item.price;
      });
    });

    const comparison = Object.entries(avgByCategory).map(([category, avg]) => {
      const userSpent = userCategoryTotals[category] || 0;
      const difference = Math.round(((userSpent - avg) / avg) * 100);

      return {
        category,
        difference,
        isHigher: difference > 0
      };
    });

    res.json(comparison);
  } catch (err) {
    console.error('Error generating demographic comparison:', err);
    res.status(500).send('Error generating comparison');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
