const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student' // Reference to the Student model
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project' // Reference to the Project model
  },
  applicationDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending'
  },
  preferenceOrder: {
    type: Number // If you want to track preference order
  }
});

module.exports = mongoose.model('Request', requestSchema);
