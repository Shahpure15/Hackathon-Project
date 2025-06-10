const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CandidateSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other', 'Prefer Not to Say']
  },
  dateOfBirth: {
    type: Date
  },
  summary: {
    type: String
  },
  skills: [{
    type: String,
    trim: true
  }],
  certifications: [String],
  jobTypePreference: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Remote', 'Internship', 'Contract', 'Freelance'],
  },
  locationPreference: {
    type: String,
    trim: true
  },
  salaryExpectation: {
    type: Number,
    default: 0
  },
  industryPreference: {
    type: String
  },
  resumeLink: {
    type: String
  },
  workExperience: [{
    company: String,
    position: String,
    startDate: Date,
    endDate: Date,
    description: String,
    currentlyWorking: Boolean
  }],
  education: [{
    institution: String,
    degree: String,
    field: String,
    startDate: Date,
    endDate: Date,
    grade: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Candidate', CandidateSchema);
