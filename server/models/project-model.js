const mongoose = require('mongoose');
const { Schema } = require('mongoose');

// Define the schema for the project
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
    required:true
  },
  type: {
    type: String,
    required:true
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
    type: Schema.ObjectId,
    ref: "User"
  },
});



// Create the Project model using the schema
const Project = new mongoose.model('Project', projectSchema);

module.exports = Project;
