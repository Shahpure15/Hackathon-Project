const bcrypt = require("bcrypt");
const Candidate = require("../models/candidatemodel");
const User = require("../models/usermodel");

exports.signup = async (req, res) => {
  try {
    if (!Candidate) {
      return res.status(500).json({ message: "Database not initialized" });
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      gender,
      dateOfBirth,
      summary,
      skills,
      certifications,
      languages,
      workExperience,
      education,
      jobTypePreference,
      locationPreference,
      salaryExpectation,
      industryPreference,
      resumeLink,
      password,
      termsAccepted
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Check if candidate already exists
    const existingCandidate = await Candidate.findOne({ email });
    if (existingCandidate) {
      return res.status(400).json({ message: 'Email already registered as candidate' });
    }

    // 1. Create User account first
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
      role: 'candidate'
    });
    const savedUser = await newUser.save();

    // 2. Then create the Candidate profile
    const newCandidate = new Candidate({
      userId: savedUser._id,
      firstName,
      lastName,
      email,
      phone,
      gender,
      dateOfBirth,
      summary,
      // Convert comma-separated strings to arrays if needed
      skills: Array.isArray(skills) ? skills : skills.split(',').map(s => s.trim()),
      certifications: Array.isArray(certifications) ? certifications : certifications.split(',').map(c => c.trim()),
      languages: Array.isArray(languages) ? languages : languages.split(',').map(l => l.trim()),
      // Structured data
      workExperience: Array.isArray(workExperience) ? workExperience : [],
      education: Array.isArray(education) ? education : [],
      preferences: {
        jobType: jobTypePreference,
        location: locationPreference,
        salary: salaryExpectation,
        industry: industryPreference
      },
      resumeLink,
      // Other details
      createdAt: new Date()
    });

    await newCandidate.save();
    
    res.status(201).json({ 
      message: 'Candidate registration successful',
      success: true
    });

  } catch (error) {
    console.error('Candidate signup error:', error);
    res.status(500).json({ message: error.message || 'Server error during signup' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const candidate = await Candidate.findOne({ email: req.user.email });
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate profile not found' });
    }

    res.json(candidate);
  } catch (error) {
    console.error('Error fetching candidate profile:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const candidate = await Candidate.findOneAndUpdate(
      { email: req.user.email },
      { $set: req.body },
      { new: true }
    );

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate profile not found' });
    }

    res.json({ 
      message: 'Profile updated successfully',
      candidate
    });
  } catch (error) {
    console.error('Error updating candidate profile:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};