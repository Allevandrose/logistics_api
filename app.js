const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const shipmentRoutes = require('./routes/shipmentRoutes');
const agentRoutes = require('./routes/agentRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const roleMiddleware = require('./middleware/roleMiddleware');



// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/shipments', authMiddleware, shipmentRoutes);
app.use('/api/agents', authMiddleware, roleMiddleware(['admin']), agentRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Logistics API is running.');
});

module.exports = app;