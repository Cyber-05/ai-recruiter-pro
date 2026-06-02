const express = require('express');
const {
  findCandidates,
  getCandidateProfile,
  searchCandidatesBySkills,
  getTopCandidates
} = require('../controllers/candidateMatchController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Find candidates by job requirements (AI matching)
router.post('/find', authMiddleware, findCandidates);

// Search candidates by specific skills
router.post('/search-by-skills', authMiddleware, searchCandidatesBySkills);

// Get candidate profile with resumes
router.get('/:candidateId', authMiddleware, getCandidateProfile);

// Get top candidates
router.get('/', authMiddleware, getTopCandidates);

module.exports = router;
