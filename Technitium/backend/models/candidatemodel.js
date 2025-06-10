// candidatemodel.js
const mongoose = require("mongoose");
const { candidateDB } = require("../config/db");

const CandidateSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  firstName: String,
  lastName: String,
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  phone: String,
  gender: String,
  dateOfBirth: Date,
  summary: String,
  skills: [String],
  certifications: [String],
  languages: [String],
  
  education: [{
    institution: String,
    degree: String,
    startYear: String,
    endYear: String
  }],
  
  workExperience: [{
    title: String,
    company: String,
    startDate: Date,
    endDate: Date,
    description: String
  }],
  
  preferences: {
    jobType: String,
    location: String,
    salary: Number,
    industry: String
  },
  
  resumeLink: String,
  swipedJobs: [{
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job'
    },
    action: {
      type: String,
      enum: ['accept', 'reject']
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  savedJobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Safe initialization that checks if DB connection is ready
let Candidate;
if (candidateDB) {
  Candidate = candidateDB.model("Candidate", CandidateSchema);
} else {
  console.warn("candidateDB not ready. Model not created.");
}

module.exports = Candidate;