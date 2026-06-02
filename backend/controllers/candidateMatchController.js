const User = require('../models/User');
const Resume = require('../models/Resume');
const { scoreCandidate, scoreJobForCandidate } = require('../services/intelligentScoringService');

// Find candidates matching job requirements
const findCandidates = async (req, res) => {
  try {
    const { jobTitle, skills, experience, education, location } = req.body;

    if (!jobTitle) {
      return res.status(400).json({ error: 'Job title is required' });
    }

    // Get all verified users (candidates)
    const allCandidates = await User.find({ isVerified: true }).select('-password');

    if (allCandidates.length === 0) {
      return res.json({
        success: true,
        candidates: [],
        message: 'No verified candidates found'
      });
    }

    // Prepare job requirements for AI matching
    const jobRequirements = {
      title: jobTitle,
      requiredSkills: skills || [],
      experienceYears: experience || 0,
      education: education || '',
      location: location || 'remote'
    };

    // Score each candidate using AI
    const candidatesWithScores = await Promise.all(
      allCandidates.map(async (candidate) => {
        try {
          const score = await scoreCandidateMatch(candidate, jobRequirements);
          return {
            ...candidate.toObject(),
            matchScore: score.score,
            reasoning: score.reasoning,
            strengths: score.strengths,
            gaps: score.gaps
          };
        } catch (err) {
          console.error('Error scoring candidate:', err);
          return {
            ...candidate.toObject(),
            matchScore: 0,
            reasoning: 'Error during scoring'
          };
        }
      })
    );

    // Sort by match score (highest first)
    const rankedCandidates = candidatesWithScores
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 20); // Return top 20

    res.json({
      success: true,
      jobRequirements,
      candidates: rankedCandidates,
      totalMatches: rankedCandidates.length
    });
  } catch (error) {
    console.error('Find candidates error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Score candidate match against job requirements using intelligent service
const scoreCandidateMatch = async (candidate, jobRequirements) => {
  try {
    // Use local intelligent scoring service
    const result = scoreCandidate(candidate, jobRequirements);
    
    return {
      score: result.score,
      reasoning: result.reasoning,
      strengths: result.strengths,
      gaps: result.gaps,
      breakdown: result.breakdown,
      recommendations: result.recommendations
    };
  } catch (error) {
    console.error('Score candidate error:', error);
    // Fallback scoring
    return {
      score: 50,
      reasoning: 'Evaluation completed',
      strengths: ['Verified candidate', 'Profile available'],
      gaps: ['Limited data for detailed analysis'],
      breakdown: {},
      recommendations: ['Review candidate manually']
    };
  }
};

// Get candidate details with their resumes
const getCandidateProfile = async (req, res) => {
  try {
    const { candidateId } = req.params;

    const candidate = await User.findById(candidateId).select('-password');
    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    const resumes = await Resume.find({ userId: candidateId });

    res.json({
      success: true,
      candidate,
      resumes: resumes.map(r => ({
        id: r._id,
        fileName: r.fileName,
        skills: r.extractedData?.skills || [],
        experience: r.extractedData?.experience || [],
        education: r.extractedData?.education || [],
        atsScore: r.atsScore?.score || 0
      }))
    });
  } catch (error) {
    console.error('Get candidate profile error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Quick candidate search by skills
const searchCandidatesBySkills = async (req, res) => {
  try {
    const { skills, limit = 10 } = req.body;

    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      return res.status(400).json({ error: 'Skills array required' });
    }

    // Search in resumes for matching skills
    const matchingResumes = await Resume.find({
      'extractedData.skills': { $in: skills.map(s => s.toLowerCase()) }
    }).limit(limit);

    if (matchingResumes.length === 0) {
      return res.json({
        success: true,
        candidates: [],
        message: 'No candidates with matching skills'
      });
    }

    // Get unique user IDs and fetch user data
    const userIds = [...new Set(matchingResumes.map(r => r.userId))];
    const candidates = await User.find({ _id: { $in: userIds } }).select('-password');

    res.json({
      success: true,
      skills,
      candidates,
      totalMatches: candidates.length
    });
  } catch (error) {
    console.error('Search candidates error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get top candidates for a position
const getTopCandidates = async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const candidates = await User.find({ isVerified: true })
      .select('-password')
      .limit(parseInt(limit));

    res.json({
      success: true,
      candidates,
      total: candidates.length
    });
  } catch (error) {
    console.error('Get top candidates error:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  findCandidates,
  scoreCandidateMatch,
  getCandidateProfile,
  searchCandidatesBySkills,
  getTopCandidates
};
