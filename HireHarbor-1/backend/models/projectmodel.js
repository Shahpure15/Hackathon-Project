const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  techStack: [String],
  lookingFor: [String],
  tags: [String],
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
  team: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' }],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', ProjectSchema);
