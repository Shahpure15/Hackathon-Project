const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobcontroller');
// const authMiddleware = require('../middleware/auth');

// All routes require authentication
// router.use(authMiddleware);

// Route to create a new job
router.post('/create', jobController.createJob);

// // Route to get all jobs
// router.get('/all', jobController.getAllJobs);

// // Route to get a job by ID
// router.get('/:id', jobController.getJobById);

// // Route to update a job by ID
// router.put('/:id', jobController.updateJobById);

// // Route to delete a job by ID
// router.delete('/:id', jobController.deleteJobById);

module.exports = router;