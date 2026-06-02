/**
 * Job Management Controller
 * Handles all job-related operations for recruiters and job seekers
 */

const Job = require('../models/Job');
const User = require('../models/User');
const JobApplication = require('../models/JobApplication');
const { scoreJobForCandidate } = require('../services/intelligentScoringService');

// ================ RECRUITER ENDPOINTS ================

// Create a new job posting
const createJob = async (req, res) => {
  try {
    const {
      title, description, requirements, responsibilities, requiredSkills, 
      preferredSkills, experience, experienceYears, education, salary, 
      location, remote, jobType, industry, seniority, benefits, 
      companyName, mentoring, training, deadline
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const job = new Job({
      userId: req.userId,
      title,
      description,
      requirements: requirements || [],
      responsibilities: responsibilities || [],
      requiredSkills: requiredSkills || [],
      preferredSkills: preferredSkills || [],
      experience,
      experienceYears: experienceYears || 0,
      education,
      salary: salary || {},
      location,
      remote: remote || false,
      jobType,
      industry,
      seniority,
      benefits: benefits || {},
      companyName,
      mentoring: mentoring || false,
      training: training || false,
      applicationDeadline: deadline,
      status: 'draft'
    });

    await job.save();

    res.status(201).json({
      success: true,
      message: 'Job created successfully',
      job
    });
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get recruiter's jobs
const getRecruiterJobs = async (req, res) => {
  try {
    const { status, limit = 10, skip = 0 } = req.query;
    
    const filter = { userId: req.userId };
    if (status) filter.status = status;

    const jobs = await Job.find(filter)
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Job.countDocuments(filter);

    res.json({
      success: true,
      jobs,
      pagination: { total, skip: parseInt(skip), limit: parseInt(limit) }
    });
  } catch (error) {
    console.error('Get recruiter jobs error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Publish a job
const publishJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job || job.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    job.status = 'published';
    job.postedAt = new Date();
    await job.save();

    res.json({
      success: true,
      message: 'Job published successfully',
      job
    });
  } catch (error) {
    console.error('Publish job error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get job applications for recruiter
const getJobApplications = async (req, res) => {
  try {
    const { jobId, status, limit = 20, skip = 0 } = req.query;

    const filter = { recruiterId: req.userId };
    if (jobId) filter.jobId = jobId;
    if (status) filter.status = status;

    const applications = await JobApplication.find(filter)
      .populate('candidateId', 'firstName lastName email')
      .populate('jobId', 'title')
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .sort({ appliedAt: -1 });

    const total = await JobApplication.countDocuments(filter);

    res.json({
      success: true,
      applications,
      pagination: { total, skip: parseInt(skip), limit: parseInt(limit) }
    });
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Update application status
const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status, notes, ratings } = req.body;

    const application = await JobApplication.findById(applicationId);
    if (!application || application.recruiterId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    application.status = status;
    if (notes) {
      application.recruiterNotes.push({
        note: notes,
        createdBy: req.userId
      });
    }
    if (ratings) {
      application.ratings = { ...application.ratings, ...ratings };
    }

    if (status === 'shortlisted') {
      application.shortlistedAt = new Date();
    } else if (status === 'rejected') {
      application.rejectedAt = new Date();
    }

    await application.save();

    res.json({
      success: true,
      message: 'Application updated',
      application
    });
  } catch (error) {
    console.error('Update application error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get recruiter analytics
const getRecruiterAnalytics = async (req, res) => {
  try {
    const jobs = await Job.find({ userId: req.userId, status: 'published' });
    const jobIds = jobs.map(j => j._id);

    const applications = await JobApplication.find({ jobId: { $in: jobIds } });
    const shortlisted = applications.filter(a => a.status === 'shortlisted').length;
    const rejected = applications.filter(a => a.status === 'rejected').length;
    const offered = applications.filter(a => a.status === 'offered').length;

    const totalViews = jobs.reduce((sum, j) => sum + (j.viewCount || 0), 0);
    const avgApplicationsPerJob = applications.length / jobs.length;

    res.json({
      success: true,
      analytics: {
        totalJobsPosted: jobs.length,
        totalApplications: applications.length,
        shortlistedCandidates: shortlisted,
        rejectedCandidates: rejected,
        offeredCandidates: offered,
        totalViews,
        avgApplicationsPerJob: Math.round(avgApplicationsPerJob * 100) / 100,
        conversionRate: Math.round((offered / applications.length * 100) || 0)
      }
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({ error: error.message });
  }
};

// ================ JOB SEEKER ENDPOINTS ================

// Search jobs with advanced filters
const searchJobs = async (req, res) => {
  try {
    const {
      query,
      location,
      remote,
      jobType,
      salaryMin,
      salaryMax,
      seniority,
      industry,
      requiredSkills,
      limit = 20,
      skip = 0
    } = req.query;

    const filter = { status: 'published' };

    // Text search
    if (query) {
      filter.$text = { $search: query };
    }

    // Filters
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (remote === 'true') filter.remote = true;
    if (jobType) filter.jobType = jobType;
    if (seniority) filter.seniority = seniority;
    if (industry) filter.industry = { $regex: industry, $options: 'i' };

    // Salary range
    if (salaryMin || salaryMax) {
      filter.$or = [];
      if (salaryMin) {
        filter.$or.push({ 'salary.max': { $gte: parseInt(salaryMin) } });
      }
      if (salaryMax) {
        filter.$or.push({ 'salary.min': { $lte: parseInt(salaryMax) } });
      }
    }

    // Skills matching
    if (requiredSkills) {
      const skills = requiredSkills.split(',').map(s => s.trim());
      filter.requiredSkills = { $in: skills };
    }

    const jobs = await Job.find(filter)
      .select('-candidates')
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .sort({ postedAt: -1 })
      .populate('userId', 'firstName lastName company');

    const total = await Job.countDocuments(filter);

    res.json({
      success: true,
      jobs,
      pagination: { total, skip: parseInt(skip), limit: parseInt(limit) }
    });
  } catch (error) {
    console.error('Search jobs error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get recommended jobs for job seeker
const getRecommendedJobs = async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const user = await User.findById(req.userId);
    if (!user?.jobSeekerProfile) {
      return res.status(400).json({ error: 'Job seeker profile not found' });
    }

    const profile = user.jobSeekerProfile;
    const recommendedJobs = [];

    // Find jobs matching preferences
    const candidateSkills = profile.skills.map(s => s.name);
    const locations = profile.locationPreference || [];

    let filter = {
      status: 'published',
      $or: [
        { requiredSkills: { $in: candidateSkills } },
        { location: { $in: locations } }
      ]
    };

    if (profile.jobTypePreference?.length > 0) {
      filter.jobType = { $in: profile.jobTypePreference };
    }

    const jobs = await Job.find(filter)
      .limit(parseInt(limit) * 2)
      .sort({ postedAt: -1 });

    // Score and rank jobs
    const scoredJobs = jobs.map(job => {
      const score = scoreJobForCandidate(job, user);
      return { ...job.toObject(), matchScore: score };
    }).sort((a, b) => b.matchScore.score - a.matchScore.score);

    res.json({
      success: true,
      jobs: scoredJobs.slice(0, limit),
      totalRecommended: jobs.length
    });
  } catch (error) {
    console.error('Get recommended jobs error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Apply for a job
const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { notes } = req.body;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Check if already applied
    const existingApplication = await JobApplication.findOne({
      jobId,
      candidateId: req.userId
    });

    if (existingApplication) {
      return res.status(400).json({ error: 'Already applied to this job' });
    }

    const candidate = await User.findById(req.userId);
    const application = new JobApplication({
      jobId,
      candidateId: req.userId,
      recruiterId: job.userId,
      applicationNotes: notes || '',
      matchScore: {
        overall: scoreJobForCandidate(job, candidate).score
      }
    });

    await application.save();

    // Update job and user records
    job.applicationCount = (job.applicationCount || 0) + 1;
    await job.save();

    candidate.jobSeekerProfile.appliedJobs.push(jobId);
    await candidate.save();

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      application
    });
  } catch (error) {
    console.error('Apply for job error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get job details
const getJobDetails = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId).populate('userId', 'firstName lastName company companyDescription');
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Increment view count
    job.viewCount = (job.viewCount || 0) + 1;
    await job.save();

    // Check if user has applied
    let userApplication = null;
    if (req.userId) {
      userApplication = await JobApplication.findOne({
        jobId,
        candidateId: req.userId
      });
    }

    res.json({
      success: true,
      job: { ...job.toObject(), userApplication }
    });
  } catch (error) {
    console.error('Get job details error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Save/favorite job
const saveJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const user = await User.findById(req.userId);
    if (!user.jobSeekerProfile.savedJobs.includes(jobId)) {
      user.jobSeekerProfile.savedJobs.push(jobId);
      await user.save();
    }

    res.json({
      success: true,
      message: 'Job saved'
    });
  } catch (error) {
    console.error('Save job error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get job seeker's applications
const getMyApplications = async (req, res) => {
  try {
    const { status, limit = 10, skip = 0 } = req.query;

    const filter = { candidateId: req.userId };
    if (status) filter.status = status;

    const applications = await JobApplication.find(filter)
      .populate('jobId', 'title companyName location salary')
      .populate('recruiterId', 'firstName lastName company')
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .sort({ appliedAt: -1 });

    const total = await JobApplication.countDocuments(filter);

    res.json({
      success: true,
      applications,
      pagination: { total, skip: parseInt(skip), limit: parseInt(limit) }
    });
  } catch (error) {
    console.error('Get my applications error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get saved jobs for job seeker
const getSavedJobs = async (req, res) => {
  try {
    const { limit = 10, skip = 0 } = req.query;

    const user = await User.findById(req.userId)
      .populate({
        path: 'jobSeekerProfile.savedJobs',
        options: { skip: parseInt(skip), limit: parseInt(limit) }
      });

    const jobs = user.jobSeekerProfile.savedJobs || [];
    const total = await Job.countDocuments({ _id: { $in: user.jobSeekerProfile.savedJobs } });

    res.json({
      success: true,
      jobs,
      pagination: { total, skip: parseInt(skip), limit: parseInt(limit) }
    });
  } catch (error) {
    console.error('Get saved jobs error:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  // Recruiter
  createJob,
  getRecruiterJobs,
  publishJob,
  getJobApplications,
  updateApplicationStatus,
  getRecruiterAnalytics,
  
  // Job Seeker
  searchJobs,
  getRecommendedJobs,
  applyForJob,
  getJobDetails,
  saveJob,
  getMyApplications,
  getSavedJobs
};
