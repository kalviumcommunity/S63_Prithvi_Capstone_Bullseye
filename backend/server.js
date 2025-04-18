const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


const shootingRoutes = require('./routes/shootingRoutes');
app.use('/api', shootingRoutes);


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Schema & Model
const ShootingSessionSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  shooterName: String,
  score: Number,
  shotsFired: Number,
  duration: Number,
  targetImageUrl: String
});
const ShootingSession = mongoose.model('shootingSession', ShootingSessionSchema);

// ===== GET Endpoints =====

// Get all sessions
app.get('/api/sessions', async (req, res) => {
  try {
    const sessions = await ShootingSession.find();
    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});

// Get session by ID
app.get('/api/sessions/:id', async (req, res) => {
  try {
    const session = await ShootingSession.findById(req.params.id);
    if (!session) return res.status(404).json({ error: 'Session not found' });
    res.status(200).json(session);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving session' });
  }
});


// Server Start
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
