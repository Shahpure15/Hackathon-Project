const express = require("express");
const router = express.Router();
const authController = require("../controllers/authcontroller");
const passport = require("passport");

// Google OAuth routes
router.get('/google', authController.googleAuth);
router.get('/google/callback', authController.googleCallback);

// Traditional signup route
router.post("/signup", authController.signup);

// Traditional login route
router.post("/login", passport.authenticate('local', { failWithError: true }), (req, res) => {
  res.json({ 
    message: "Login successful",
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    }
  });
});

// Update user role
router.post("/update-role", authController.updateRole);

// Get current user
router.get("/user", authController.getUser);

// Logout route
router.get("/logout", (req, res) => {
  req.logout(function(err) {
    if (err) {
      return res.status(500).json({ message: "Error logging out" });
    }
    res.json({ message: "Logged out successfully" });
  });
});

module.exports = router;