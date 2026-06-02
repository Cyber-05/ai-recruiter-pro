const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fileName: { type: String, required: true },
  filePath: { type: String },
  fileSize: Number,
  extractedData: {
    name: String,
    email: String,
    phone: String,
    summary: String,
    skills: [String],
    experience: [{
      title: String,
      company: String,
      duration: String,
      description: String
    }],
    education: [{
      school: String,
      degree: String,
      field: String,
      graduationYear: String
    }],
    certifications: [String],
    projects: [{
      name: String,
      description: String,
      technologies: [String]
    }]
  },
  analysis: {
    aiSummary: String,
    strengths: [String],
    weaknesses: [String],
    hireRecommendation: { type: String, enum: ['strong-yes', 'yes', 'maybe', 'no'], default: 'maybe' },
    matchPercentage: Number,
    confidence: Number
  },
  atsScore: {
    score: Number,
    keywords: { matched: [String], missing: [String] },
    formatting: Number,
    experience: Number,
    feedback: [String]
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);
