const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const { analyzeResume, getResumes } = require('../controllers/resumeController');

const router = express.Router();

router.post('/analyze', authMiddleware, analyzeResume);
router.get('/', authMiddleware, getResumes);

module.exports = router;
