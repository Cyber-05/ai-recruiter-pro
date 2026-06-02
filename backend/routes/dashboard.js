const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const User = require('../models/User');
const Resume = require('../models/Resume');

const router = express.Router();

router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const resumes = await Resume.find({ userId: req.userId });
    
    const stats = {
      plan: user.subscription.plan,
      resumesAnalyzed: resumes.length,
      resumesUsed: user.subscription.resumesUsed,
      resumesLimit: user.subscription.resumesLimit,
      averageScore: resumes.length > 0 
        ? Math.round(resumes.reduce((sum, r) => sum + (r.analysis.matchPercentage || 0), 0) / resumes.length)
        : 0,
      topSkills: extractTopSkills(resumes)
    };

    res.json({ success: true, stats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

function extractTopSkills(resumes) {
  const skillCount = {};
  resumes.forEach(r => {
    r.extractedData.skills?.forEach(skill => {
      skillCount[skill] = (skillCount[skill] || 0) + 1;
    });
  });
  return Object.entries(skillCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([skill]) => skill);
}

module.exports = router;
