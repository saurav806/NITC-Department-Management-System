const mongoose = require('mongoose');
const { Schema } = require('mongoose');

// Define the schema for the department
const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  hod: {
    type: String,
    required: true
  },
  manager: {
    type: String,
    required: true
  },
  subManager: {
    type: String,
    required: true
  },
});



// Create the Project model using the schema
const Department = new mongoose.model('Department', departmentSchema);

module.exports = Department;
