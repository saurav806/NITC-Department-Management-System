const mongoose = require('mongoose');

const appliedProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  projectID:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Project"
  },
  applyDate: {
    type: Date,
    default: Date.now
  },
  preference: {
    type: Number,
    required: true
  },
  projectStatus: {
    type: String,
    enum: ['Active', 'Inactive', 'Completed'],
    default: 'Inactive'
  },
  appliedStatus: {
    type: String,
    enum: ['Applied', 'Pending', 'Assigned'],
    default: 'Applied'
  },
  mentorID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Faculty"
  },
  studentID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true, // Assuming studentID is required
    refPath: 'studentModel'
  },
  studentModel: {
    type: String,
    required: true,
    enum: ['Btech', 'Mtech', 'Phd']
  }
});

const AppliedProject = mongoose.model('AppliedProject', appliedProjectSchema);

module.exports = AppliedProject;
