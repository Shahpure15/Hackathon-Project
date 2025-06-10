const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobcontroller');
const authMiddleware = require('../middleware/auth');

// All routes require authentication
router.use(authMiddleware);

// Job listing and swiping
router.get('/', jobController.getJobs);
router.post('/swipe', jobController.handleSwipe);
router.get('/saved', jobController.getSavedJobs);

// Job posting (for recruiters)
router.post('/post', jobController.postJob);

module.exports = router;