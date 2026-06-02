const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const { generateInterviewQuestions, getInterviews } = require('../controllers/interviewController');

const router = express.Router();

router.post('/generate', authMiddleware, generateInterviewQuestions);
router.get('/', authMiddleware, getInterviews);

module.exports = router;
