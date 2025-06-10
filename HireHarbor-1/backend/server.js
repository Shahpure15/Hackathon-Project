const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authroutes');
const candidateRoutes = require('./routes/candidateroutes');
const recruiterRoutes = require('./routes/recruiterroutes');
const jobRoutes = require('./routes/jobroutes');
const mongoose = require('mongoose');

require('dotenv').config();
require('./config/passport'); // You'll need to create this file

// Import models
const User = require('./models/usermodel');
const Candidate = require('./models/candidatemodel');
const Recruiter = require('./models/recruitermodel');
const Job = require('./models/jobmodel');

const startServer = async () => {
  try {
    const connection = await connectDB(); // Await database initialization
    if (!connection) {
      throw new Error("Database connections not initialized");
    }

    const app = express();

    // Middleware
    app.use(express.json());
    app.use(cors({
      origin: ['http://localhost:3000', 'http://localhost:3000', "http://localhost:5000"],
      credentials: true
    }));

    // Session configuration
    app.use(session({
      secret: process.env.SESSION_SECRET || 'your-secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
    }));

    // Passport middleware
    app.use(passport.initialize());
    app.use(passport.session());

    // Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/candidate', candidateRoutes);
    app.use('/api/recruiter', recruiterRoutes);
    app.use('/api/jobs', jobRoutes);

    // Test route
    app.get('/api/test', (req, res) => {
      res.json({ message: 'Backend is working!' });
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();