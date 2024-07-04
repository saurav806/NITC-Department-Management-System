const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  skill: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  listDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Completed'],
    default: 'Inactive'
  },
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty"
  }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
