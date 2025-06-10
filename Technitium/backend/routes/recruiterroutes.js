const express = require('express');
const router = express.Router();
const recruiterController = require('../controllers/recruitercontroller');
const authMiddleware = require('../middleware/auth');

// Signup route - no auth required
router.post('/signup', recruiterController.signup);

// Protected routes - auth required
router.get('/profile', authMiddleware, recruiterController.getProfile);
router.put('/profile', authMiddleware, recruiterController.updateProfile);

module.exports = router;