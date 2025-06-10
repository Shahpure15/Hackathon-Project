const Job = require('../models/jobmodel');
const User = require('../models/usermodel');
const Candidate = require('../models/candidatemodel');
const Recruiter = require('../models/recruitermodel');

exports.postJob = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    // Check if the user is a recruiter
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Only recruiters can post jobs' });
    }

    const {
      position,
      company,
      description,
      location,
      type,
      salary,
      skills,
      logo
    } = req.body;

    const newJob = new Job({
      position,
      company,
      description,
      location,
      type,
      salary,
      skills: Array.isArray(skills) ? skills : skills.split(',').map(s => s.trim()),
      logo,
      postedBy: req.user._id,
      createdAt: new Date()
    });

    const savedJob = await newJob.save();

    // Add this job to the recruiter's posted jobs
    await Recruiter.findOneAndUpdate(
      { email: req.user.email },
      { $push: { postedJobs: savedJob._id } }
    );

    res.status(201).json({
      message: 'Job posted successfully',
      job: savedJob
    });
  } catch (error) {
    console.error('Error posting job:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

exports.getJobs = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    // For candidates: Get jobs not already swiped
    if (req.user.role === 'candidate') {
      const candidate = await Candidate.findOne({ email: req.user.email });
      
      if (!candidate) {
        return res.status(404).json({ message: 'Candidate profile not found' });
      }
      
      // Get the IDs of jobs the candidate has already swiped on
      const swipedJobIds = candidate.swipedJobs.map(job => job.jobId);
      
      // Find jobs not in swipedJobIds
      const jobs = await Job.find({
        _id: { $nin: swipedJobIds }
      }).limit(10);
      
      return res.json(jobs);
    }
    
    // For recruiters: Get their posted jobs
    if (req.user.role === 'recruiter') {
      const recruiter = await Recruiter.findOne({ email: req.user.email });
      
      if (!recruiter) {
        return res.status(404).json({ message: 'Recruiter profile not found' });
      }
      
      const jobs = await Job.find({
        _id: { $in: recruiter.postedJobs }
      });
      
      return res.json(jobs);
    }
    
    // For any other role
    res.status(403).json({ message: 'Invalid role for this operation' });
    
  } catch (error) {
    console.error('Error getting jobs:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

exports.handleSwipe = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    // Only candidates can swipe
    if (req.user.role !== 'candidate') {
      return res.status(403).json({ message: 'Only candidates can swipe on jobs' });
    }

    const { jobId, action } = req.body;
    
    // Find candidate
    const candidate = await Candidate.findOne({ email: req.user.email });
    
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate profile not found' });
    }
    
    // Check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    // Add to swipedJobs
    await Candidate.findOneAndUpdate(
      { email: req.user.email },
      { 
        $push: { 
          swipedJobs: {
            jobId,
            action,
            timestamp: new Date()
          }
        }
      }
    );

    // If accepted, add to savedJobs
    if (action === 'accept') {
      await Candidate.findOneAndUpdate(
        { email: req.user.email },
        { $addToSet: { savedJobs: jobId } }
      );
      
      // Here you can add logic for matching
      // e.g., notify recruiter, add to matches collection, etc.
    }

    res.json({ success: true, message: `Job ${action}ed successfully` });
  } catch (error) {
    console.error('Error handling swipe:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

exports.getSavedJobs = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    // Only candidates can have saved jobs
    if (req.user.role !== 'candidate') {
      return res.status(403).json({ message: 'Only candidates can view saved jobs' });
    }

    const candidate = await Candidate.findOne({ email: req.user.email });
    
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate profile not found' });
    }
    
    // Get the saved jobs with full details
    const savedJobs = await Job.find({
      _id: { $in: candidate.savedJobs }
    });
    
    res.json(savedJobs);
  } catch (error) {
    console.error('Error getting saved jobs:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};