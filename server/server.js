// server/server.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cron = require('node-cron');
const removeExpiredProducts = require('./utils/expiryCleanup');

dotenv.config();
connectDB();
// Run once immediately when server starts
removeExpiredProducts();

// Then run automatically every day at midnight
cron.schedule('0 0 * * *', () => {
  removeExpiredProducts();
});

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);


// Test route
app.get('/', (req, res) => {
  res.send('Smart Mall App Backend is running! 🚀');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);;
});