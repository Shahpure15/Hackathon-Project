const passport = require("passport");
const bcrypt = require("bcrypt");
const { candidateDB } = require("../config/db");
const User = require("../models/usermodel");
const Candidate = require("../models/candidatemodel");
const Recruiter = require("../models/recruitermodel");
const jwt = require('jsonwebtoken');

// Models 
const UserModel = require("../models/usermodel");
const CandidateModel = require("../models/candidatemodel");
const RecruiterModel = require("../models/recruitermodel");

exports.googleAuth = passport.authenticate("google", { scope: ["profile", "email"] });

exports.googleCallback = [
  passport.authenticate("google", { failureRedirect: "/" }),
  async (req, res) => {
    try {
      const email = req.user.email;
      const user = await User.findOne({ email });

      if (!user) return res.redirect('http://localhost:3000/auth?error=no-account');
      if (!user.role) return res.redirect('http://localhost:3000/role');

      if (user.role === 'candidate') {
        return res.redirect('http://localhost:3000/candidate-dashboard');
      } else if (user.role === 'recruiter') {
        return res.redirect('http://localhost:3000/recruiter-dashboard');
      }

      res.redirect('http://localhost:3000/role');
    } catch (err) {
      console.error("Error in Google callback:", err);
      res.redirect('http://localhost:3000/auth?error=server-error');
    }
  }
];

// candidateController.js


// Signup function for candidates
exports.signupCandidate = async (req, res) => {
  try {
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
      jobTypePreference,
      locationPreference,
      salaryExpectation,
      industryPreference,
      resumeLink,
      password,
      workExperience,
      education,
      role
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Create new user
    const newUser = new User({
      email,
      password: password,
      role: 'candidate'
    });
    
    const savedUser = await newUser.save();
    
    // Create candidate profile
    const newCandidate = new Candidate({
      user: savedUser._id,
      firstName,
      lastName,
      phone,
      gender,
      dateOfBirth,
      summary,
      skills,
      certifications,
      jobTypePreference,
      locationPreference,
      salaryExpectation: Number(salaryExpectation) || 0,
      industryPreference,
      resumeLink,
      workExperience,
      education
    });
    
    await newCandidate.save();
    
    return res.status(201).json({
      message: 'Candidate registered successfully',
      user: {
        id: savedUser._id,
        email: savedUser.email,
        role: savedUser.role
      }
    });

  } catch (error) {
    // remove created user if candidate creation fails
    return res.status(400).json({ message: error.message });
  }
};


exports.signupRecruiter = async (req, res) => {
  const { firstName, lastName, email, phone, companyName, companySize, industry, location ,password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = password;
    const user = new UserModel({ firstName, email, password: hashedPassword, role: 'recruiter'});
    await user.save();

    const recruiter = new RecruiterModel({ userId: user._id, firstName, lastName, email, phone, companyName, companySize, industry, location });
    await recruiter.save();

    req.login(user, (err) => {
      if (err) return res.status(500).json({ message: "Login failed after signup" });
      res.status(201).json({ message: "Account created", user });
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Signup failed" });
  }
};

exports.login = (req, res, next) => {
  passport.authenticate('local', async (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message || 'Auth failed' });

    req.login(user, async (err) => {
      if (err) return next(err);

      let profileComplete = false;

      if (user.role === 'candidate') {
        const profile = await Candidate.findOne({ userId: user._id });
        profileComplete = !!profile;
      } else if (user.role === 'recruiter') {
        const profile = await Recruiter.findOne({ userId: user._id });
        profileComplete = !!profile;
      }

      return res.json({
        message: 'Login successful',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          profileComplete
        }
      });
    });
  })(req, res, next);
};

exports.updateRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!req.user) return res.status(401).json({ message: "Not authenticated" });

    const updatedUser = await User.findByIdAndUpdate(req.user._id, { role }, { new: true });

    res.json({ message: "Role updated", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUser = (req, res) => {
  if (req.user) res.json(req.user);
  else res.status(401).json({ message: "Not logged in" });
};

exports.logout = (req, res) => {
  req.logout(function(err) {
    if (err) {
      return res.status(500).json({ message: "Error logging out" });
    }
    res.json({ message: "Logged out successfully" });
  });
};

exports.editUserInfo = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const { name, email, password } = req.body;

    const updatedData = {};
    if (name) updatedData.name = name;
    if (email) updatedData.email = email;
    if (password) updatedData.password = password;

    const updatedUser = await User.findByIdAndUpdate(req.user._id, { $set: updatedData }, { new: true });

    res.json({ 
      message: 'User information updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Error updating user information:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};
