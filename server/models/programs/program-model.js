const mongoose = require('mongoose');

// Define the schema for the program
const programSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

// Create the Project model using the schema
const Program = new mongoose.model('Program', programSchema);

module.exports = Program;
