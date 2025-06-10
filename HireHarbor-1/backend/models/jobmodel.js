const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  jobType: { type: String, enum: ['Full-time', 'Part-time', 'Remote', 'Internship', 'Contract', 'Freelance']},
  location: String,
  mode: { type: String, enum: ['Remote', 'On-site', 'Hybrid'], default: 'Remote' },
  skillsRequired: [String],
  stipend: String, // optional string like "Unpaid", "10k/month"
  duration: String, // e.g. "3 months"
  recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recruiter', required: true },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', JobSchema);