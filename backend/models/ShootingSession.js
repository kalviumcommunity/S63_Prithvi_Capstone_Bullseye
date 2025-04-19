// models/shootingSession.js
const mongoose = require('mongoose');

const shootingSessionSchema = new mongoose.Schema({
  shooterName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  durationMinutes: Number,
  shotsFired: {
    type: Number,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  imageUrl: String // For uploading target image
});

const ShootingSession = mongoose.model('ShootingSession', shootingSessionSchema);

module.exports = ShootingSession;
