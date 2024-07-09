const mongoose = require('mongoose');

const lockSchema = new mongoose.Schema({
  hallId: mongoose.Schema.Types.ObjectId,
  date: String,
  startTime: String,
  endTime: String,
  locked: { type: Boolean, default: true },
});

module.exports = mongoose.model('Lock', lockSchema);