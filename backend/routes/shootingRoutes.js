const express = require('express');
const router = express.Router();
const ShootingSession = require('../models/shootingSession.js');

// GET all sessions
router.get('/sessions', async (req, res) => {
  try {
    const sessions = await ShootingSession.find();
    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});

// GET a specific session by ID
router.get('/sessions/:id', async (req, res) => {
  try {
    const session = await ShootingSession.findById(req.params.id);
    if (!session) return res.status(404).json({ error: 'Session not found' });
    res.status(200).json(session);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving session' });
  }
});

module.exports = router;
