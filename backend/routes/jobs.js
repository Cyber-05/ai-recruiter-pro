const express = require('express');
const router = express.Router();
const {
  createJob,
  getRecruiterJobs,
  publishJob,
  getJobApplications,
  updateApplicationStatus,
  getRecruiterAnalytics,
  searchJobs,
  getRecommendedJobs,
  applyForJob,
  getJobDetails,
  saveJob,
  getMyApplications,
  getSavedJobs
} = require('../controllers/jobController');

const { authMiddleware, optionalAuth } = require('../middleware/auth');

// ========== RECRUITER ROUTES ==========
router.post('/create', authMiddleware, createJob);
router.get('/recruiter-jobs', authMiddleware, getRecruiterJobs);
router.put('/:jobId/publish', authMiddleware, publishJob);
router.get('/recruiter-applications', authMiddleware, getJobApplications);
router.put('/applications/:applicationId/status', authMiddleware, updateApplicationStatus);
router.get('/recruiter-analytics', authMiddleware, getRecruiterAnalytics);

// ========== JOB SEEKER ROUTES ==========
router.get('/search', optionalAuth, searchJobs);
router.get('/recommended', authMiddleware, getRecommendedJobs);
router.post('/:jobId/apply', authMiddleware, applyForJob);
router.get('/:jobId', optionalAuth, getJobDetails);
router.post('/:jobId/save', authMiddleware, saveJob);
router.get('/seeker/applications', authMiddleware, getMyApplications);
router.get('/seeker/saved-jobs', authMiddleware, getSavedJobs);

module.exports = router;
