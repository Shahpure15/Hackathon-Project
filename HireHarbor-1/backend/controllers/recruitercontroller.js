// controllers/recruiterController.js
const Recruiter = require('../models/recruitermodel');
const User = require('../models/usermodel');
const Job = require('../models/jobmodel');
const mongoose = require('mongoose');

exports.getProfile = async (req, res) => {
    try {
        const recruiterId = new mongoose.Types.ObjectId("67f75dc7020fc59377d91624");
        console.log(recruiterId);
        const recruiter = await Recruiter.findById(recruiterId);
        if (!recruiter) {
            return res.status(404).json({
                message: 'Recruiter not found'
            });
        }
        res.status(200).json(recruiter);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}