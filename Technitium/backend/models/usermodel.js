const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  googleId: { type: String, unique: true, sparse: true },
  role: { type: String, enum: ['candidate', 'recruiter'] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);
