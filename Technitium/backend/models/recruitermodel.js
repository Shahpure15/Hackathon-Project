// recruitermodel.js
const mongoose = require("mongoose");
const { recruiterDB } = require("../config/db");

const RecruiterSchema = new mongoose.Schema({
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
  companyName: String,
  industry: String,
  companySize: String,
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

// Safe initialization
let Recruiter;
if (recruiterDB) {
  Recruiter = recruiterDB.model("Recruiter", RecruiterSchema);
} else {
  console.error("❌ recruiterDB not ready. Recruiter model not initialized.");
}

module.exports = Recruiter;