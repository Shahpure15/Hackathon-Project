const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidatecontroller');
const authMiddleware = require('../middleware/auth');

// Signup route - no auth required
router.post('/signup', candidateController.signup);

// Protected routes - auth required
router.get('/profile', authMiddleware, candidateController.getProfile);
router.put('/profile', authMiddleware, candidateController.updateProfile);

module.exports = router;