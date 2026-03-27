import mongoose from 'mongoose';

const shootingSessionSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  shooterName: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  }
});

const ShootingSession = mongoose.model('ShootingSession', shootingSessionSchema);

export default ShootingSession;
