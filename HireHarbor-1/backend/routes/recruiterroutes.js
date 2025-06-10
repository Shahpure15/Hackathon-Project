const express = require('express');
const router = express.Router();
const recruiterController = require('../controllers/recruitercontroller');
// const authMiddleware = require('../middleware/auth');

router.get('/profile', recruiterController.getProfile);

module.exports = router;