const passport = require("passport");
const bcrypt = require("bcrypt");
const { candidateDB } = require("../config/db");
const User = require("../models/usermodel");
const Candidate = require("../models/candidatemodel");
const Recruiter = require("../models/recruitermodel");

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

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const User = candidateDB.model("User", require("../models/usermodel")); // Use candidateDB connection
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

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
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message || 'Authentication failed' });
    
    req.login(user, (err) => {
      if (err) return next(err);
      return res.json({ 
        message: 'Login successful', 
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
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