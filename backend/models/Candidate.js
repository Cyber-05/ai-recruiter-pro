const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  // Core User Reference
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  resumeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume' },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },

  // Personal Information
  name: { type: String, required: true },
  email: String,
  phone: String,
  location: String,
  title: String,
  bio: String,
  avatar: String,

  // Skills & Experience
  skills: [{ name: String, proficiency: String, years: Number }],
  experience: { type: Number, default: 0 }, // Years of experience
  education: String,

  // Scoring
  overallScore: Number,
  matchScore: Number,
  atsScore: Number,
  relevanceScore: { type: Number, default: 0 },

  // Pipeline Status
  stage: { 
    type: String, 
    enum: ['applied', 'screened', 'interviewed', 'offered', 'hired', 'rejected', 'imported'], 
    default: 'applied' 
  },
  notes: String,
  rating: { type: Number, min: 1, max: 5 },
  interviewQuestions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Interview' }],

  // Imported Data
  source: { type: String, enum: ['manual', 'linkedin', 'github', 'stackoverflow', 'upwork', 'twitter', 'indeed', 'google'] },
  sourceUrl: String,
  profileData: {
    githubUsername: String,
    githubRepos: Number,
    githubFollowers: Number,
    stackOverflowId: String,
    stackOverflowReputation: Number,
    linkedinUrl: String,
    twitterHandle: String,
    portfolioUrl: String,
  },
  portfolio: String,
  isImported: { type: Boolean, default: false },

  // Metadata
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  importedAt: Date,
  lastUpdated: Date
}, { timestamps: true });

module.exports = mongoose.model('Candidate', candidateSchema);
