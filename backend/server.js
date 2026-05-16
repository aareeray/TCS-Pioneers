const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { errorHandler, notFound } = require('./middleware/errorHandler');

// Load env variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://tcs-pioneers1.onrender.com',
  'http://localhost:5173'
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/admin', require('./routes/authRoutes'));
app.use('/api/pioneers', require('./routes/pioneerRoutes'));
app.use('/api/timelineEvents', require('./routes/timelineRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/search', require('./routes/searchRoutes'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Pioneers of TCS API is running' });
});

// One-time seed endpoint — protected by SEED_SECRET env variable
app.get('/api/seed', async (req, res) => {
  const secret = req.query.secret;
  if (!secret || secret !== process.env.SEED_SECRET) {
    return res.status(401).json({ message: 'Unauthorized. Provide ?secret=YOUR_SEED_SECRET' });
  }
  try {
    const { runSeed } = require('./seed/seedData');
    const result = await runSeed();
    res.json({ success: true, message: 'Database seeded successfully!', result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
