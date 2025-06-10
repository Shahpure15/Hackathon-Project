const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumecontroller');
const multer = require('multer');

// Configure Multer to store uploaded files in memory.
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define the POST endpoint for resume upload. Expects one file under "resume".
router.post('/upload', upload.single('resume'), resumeController.uploadResume);

module.exports = router;
