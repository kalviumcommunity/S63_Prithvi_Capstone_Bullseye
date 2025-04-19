const express = require('express');
const router = express.Router();
const ShootingSession = require('../models/ShootingSession.js');

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

// POST a new session
router.post('/sessions', async (req, res) => {
    try {
        const { shooterName, score, shotsFired, duration, targetImageUrl } = req.body;
        
        // Validate required fields
        if (!shooterName || !score || !shotsFired) {
            return res.status(400).json({ error: 'Missing required fields: shooterName, score, shotsFired' });
        }

        const newSession = new ShootingSession({
            shooterName,
            score,
            shotsFired,
            duration: duration || 0,  // Default to 0 if not provided
            targetImageUrl: targetImageUrl || ''  // Optional field
        });

        const savedSession = await newSession.save();
        res.status(201).json(savedSession);

    } catch (err) {
        res.status(500).json({ error: 'Failed to create session', details: err.message });
    }
});

// PUT endpoint to update a session by ID
router.put('/sessions/:id', async (req, res) => {
  try {
    // Validate request body
    const { shooterName, score, shotsFired, duration, targetImageUrl } = req.body;
    
    // Create object with only provided fields
    const updateData = {};
    if (shooterName) updateData.shooterName = shooterName;
    if (score !== undefined) updateData.score = score;
    if (shotsFired !== undefined) updateData.shotsFired = shotsFired;
    if (duration !== undefined) updateData.duration = duration;
    if (targetImageUrl) updateData.targetImageUrl = targetImageUrl;
    
    const updatedSession = await ShootingSession.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true } // returns the updated document and runs validators
    );
    
    if (!updatedSession) {
      return res.status(404).json({ message: 'Session not found' });
    }
    
    res.status(200).json(updatedSession);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update session', details: error.message });
  }
});


module.exports = router;  // Don't forget to export!

