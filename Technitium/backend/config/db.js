const mongoose = require("mongoose");
require('dotenv').config();

let candidateDB;
let recruiterDB;

const connectDB = async () => {
  try {
    candidateDB = await mongoose.createConnection(
      process.env.CANDIDATE_MONGO_URI || 'mongodb://localhost:27017/candidate_db',
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("Candidate MongoDB connected successfully");

    recruiterDB = await mongoose.createConnection(
      process.env.RECRUITER_MONGO_URI || 'mongodb://localhost:27017/recruiter_db',
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("Recruiter MongoDB connected successfully");

    return { candidateDB, recruiterDB }; // Ensure the promise resolves
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

// Export the connectDB function and connections
module.exports = { connectDB, candidateDB, recruiterDB };
