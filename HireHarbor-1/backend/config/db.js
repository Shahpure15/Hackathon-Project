const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      process.env.CANDIDATE_MONGO_URI || 'mongodb://localhost:27017/hireharbor_db'
    );
    console.log("Sabka MongoDB connected successfully");

    return connection; // Ensure the promise resolves
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

// Export the connectDB function and connections
module.exports = connectDB;
