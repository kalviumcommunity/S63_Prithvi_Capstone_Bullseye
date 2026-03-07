import express from 'express';
import ShootingSession from '../models/ShootingSession.js';

const router = express.Router();

// GET /api - Read all sessions from MongoDB
router.get('/', async (req, res) => {
  try {
    const sessions = await ShootingSession.find();
    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});

// POST /api - Write new session to MongoDB
router.post('/', async (req, res) => {
  try {
    const { shooterName, score } = req.body;
    
    if (!shooterName || score === undefined) {
      return res.status(400).json({ error: 'Missing required fields: shooterName, score' });
    }

    const newSession = new ShootingSession({
      shooterName,
      score
    });

    const savedSession = await newSession.save();
    res.status(201).json(savedSession);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create session', details: err.message });
  }
});

export default router;

