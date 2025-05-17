const mongoose = require('mongoose');

const ShootingSessionSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
      },
      shooterName: String,
      score: Number,
      shotsFired: Number,
      duration: Number, // in minutes or seconds
      targetImageUrl: String // URL or path to img
});

module.exports = mongoose.models.ShootingSession || mongoose.model('ShootingSession', ShootingSessionSchema);