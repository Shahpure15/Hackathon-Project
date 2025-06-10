const express = require("express");
const router = express.Router();
const authController = require("../controllers/authcontroller");
const passport = require("passport");
const user = require("../models/usermodel");
const bcrypt = require("bcrypt");

// Google OAuth routes
router.get('/google', authController.googleAuth);
router.get('/google/callback', authController.googleCallback);

// Signup route for candidates
router.post("/signup-candidate", authController.signupCandidate);

// Signup route for recruiters
router.post("/signup-recruiter", authController.signupRecruiter);

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt with email:", email);
    console.log("Login attempt with password:", password);
    user.findOne({email: email}).then((foundUser) => {
      if(foundUser){
        console.log("Found user:", foundUser);
        if(foundUser.password === password){
          req.session.user = foundUser;
          res.json({
            message: "Login successful",
            user: {
              id: foundUser._id,
              name: foundUser.firstName + " " + foundUser.lastName,
              email: foundUser.email,
              role: foundUser.role
            }
          });
        }else{
          res.status(401).json({message: "Invalid credentials"});
        }
      }else{
        res.status(401).json({message: "Invalid credentials"});
      }
    }).catch((err) => {
      console.log(err);
      res.status(500).json({message: "Internal server error"});
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
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

// Route for editing user information
router.put("/edit-user-info", authController.editUserInfo);

module.exports = router;
