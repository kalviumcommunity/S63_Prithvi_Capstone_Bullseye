import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import shootingRoutes from './routes/shootingRoutes.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mount routes
app.use('/api', shootingRoutes);

// Start server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

