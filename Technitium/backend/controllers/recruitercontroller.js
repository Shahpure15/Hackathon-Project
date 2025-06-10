const bcrypt = require("bcrypt");
const Recruiter = require("../models/recruitermodel");
const User = require("../models/usermodel");

exports.signup = async (req, res) => {
  try {
    if (!Recruiter) {
      return res.status(500).json({ message: "Database not initialized" });
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      company: companyName,
      password,
      termsAccepted
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Check if recruiter already exists
    const existingRecruiter = await Recruiter.findOne({ email });
    if (existingRecruiter) {
      return res.status(400).json({ message: 'Email already registered as recruiter' });
    }

    // 1. Create User account first
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
      role: 'recruiter'
    });
    const savedUser = await newUser.save();

    // 2. Then create the Recruiter profile
    const newRecruiter = new Recruiter({
      userId: savedUser._id,
      firstName,
      lastName,
      email,
      phone,
      companyName,
      postedJobs: []
    });

    await newRecruiter.save();
    
    res.status(201).json({ 
      message: 'Recruiter registration successful',
      success: true
    });

  } catch (error) {
    console.error('Recruiter signup error:', error);
    res.status(500).json({ message: error.message || 'Server error during signup' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const recruiter = await Recruiter.findOne({ email: req.user.email });
    if (!recruiter) {
      return res.status(404).json({ message: 'Recruiter profile not found' });
    }

    res.json(recruiter);
  } catch (error) {
    console.error('Error fetching recruiter profile:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const recruiter = await Recruiter.findOneAndUpdate(
      { email: req.user.email },
      { $set: req.body },
      { new: true }
    );

    if (!recruiter) {
      return res.status(404).json({ message: 'Recruiter profile not found' });
    }

    res.json({ 
      message: 'Profile updated successfully',
      recruiter
    });
  } catch (error) {
    console.error('Error updating recruiter profile:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};