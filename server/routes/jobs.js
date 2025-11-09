const express = require('express');
const Job = require('../models/Job');
const { protect } = require('../middleware/auth');
const router = express.Router();


router.get('/', protect, async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id })
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});


router.get('/:id', protect, async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      postedBy: req.user._id
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    res.json({
      success: true,
      data: job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const { jobTitle, jobDescription, lastDateForApplication, companyName } = req.body;

    if (!jobTitle || !jobDescription || !lastDateForApplication || !companyName) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    const job = await Job.create({
      jobTitle,
      jobDescription,
      lastDateForApplication,
      companyName,
      postedBy: req.user._id
    });

    res.status(201).json({
      success: true,
      message: 'Job posted successfully',
      data: job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});


router.put('/:id', protect, async (req, res) => {
  try {
    const { jobTitle, jobDescription, lastDateForApplication, companyName } = req.body;

    let job = await Job.findOne({
      _id: req.params.id,
      postedBy: req.user._id
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    job.jobTitle = jobTitle || job.jobTitle;
    job.jobDescription = jobDescription || job.jobDescription;
    job.lastDateForApplication = lastDateForApplication || job.lastDateForApplication;
    job.companyName = companyName || job.companyName;

    await job.save();

    res.json({
      success: true,
      message: 'Job updated successfully',
      data: job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});


router.delete('/:id', protect, async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      postedBy: req.user._id
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    await job.deleteOne();

    res.json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;

