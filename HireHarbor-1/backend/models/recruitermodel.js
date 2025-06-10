const mongoose = require("mongoose");

const RecruiterSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  phone: String,
  companyName: { type: String, required: true },
  companySize: String,
  industry: String,
  location: String,
  website: String,

  postedJobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  }],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Recruiter", RecruiterSchema);
