const Job = require('../models/jobmodel');
const User = require('../models/usermodel');
const Candidate = require('../models/candidatemodel');
const Recruiter = require('../models/recruitermodel');

// Create a new job
exports.createJob = async (req, res) => {
    try {
        const {
            title,
            description,
            company,
            location,
            salary,
            jobType,
            skills,
            recruiterId,
            deadline,
            experience,
            education
        } = req.body;

        // Validate required fields
        if (!title || !description || !recruiterId) {
            return res.status(400).json({
                success: false,
                message: 'Please provide required job details'
            });
        }

        // Check if recruiter exists
        const recruiter = await Recruiter.findById(recruiterId);
        if (!recruiter) {
            return res.status(404).json({
                success: false,
                message: 'Recruiter not found'
            });
        }

        // Create new job
        const job = await Job.create({
            title,
            description,
            company,
            location,
            salary,
            jobType,
            skills,
            recruiter: recruiterId,
            deadline,
            experience,
            education,
            createdAt: Date.now()
        });

        res.status(201).json({
            success: true,
            message: 'Job created successfully',
            data: job
        });
    } catch (error) {
        console.error('Error creating job:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};
