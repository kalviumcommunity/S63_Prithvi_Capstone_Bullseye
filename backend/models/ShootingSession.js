const mongoose = require('mongoose');

const ShootingSessionSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
      },
      shooterName: String,
      score: Number,
      shotsFired: Number,
      duration: Number, // 
      targetImageUrl: String
});

module.exports = mongoose.models.ShootingSession || mongoose.model('ShootingSession', ShootingSessionSchema);
