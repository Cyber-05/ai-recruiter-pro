const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: String,
  requirements: [String],
  responsibilities: [String],
  requiredSkills: [String],
  preferredSkills: [String],
  experience: String,
  experienceYears: Number,
  education: String,
  
  salary: {
    min: Number,
    max: Number,
    currency: { type: String, default: 'USD' },
    salaryType: { type: String, enum: ['annual', 'monthly', 'hourly'], default: 'annual' }
  },
  
  location: String,
  remote: { type: Boolean, default: false },
  jobType: { type: String, enum: ['full-time', 'part-time', 'contract', 'remote', 'hybrid'], default: 'full-time' },
  
  industry: String,
  department: String,
  seniority: { type: String, enum: ['entry-level', 'mid-level', 'senior', 'lead', 'manager', 'director'], default: 'mid-level' },
  
  // Benefits and perks
  benefits: {
    healthInsurance: Boolean,
    retirement: Boolean,
    paidTimeOff: Number, // days per year
    equity: Boolean,
    bonusStructure: String,
    flexibleHours: Boolean,
    professionaldevelopment: Boolean
  },
  
  // Company culture
  companyName: String,
  companySize: String,
  companyWebsite: String,
  companyDescription: String,
  cultureKeywords: [String],
  mentoring: Boolean,
  training: Boolean,
  teamSize: Number,
  reportsTo: String,
  
  // Application tracking
  status: { type: String, enum: ['draft', 'published', 'closed', 'on-hold'], default: 'draft' },
  candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'JobApplication' }],
  
  viewCount: { type: Number, default: 0 },
  applicationCount: { type: Number, default: 0 },
  shortlistedCount: { type: Number, default: 0 },
  
  // Timeline
  postedAt: { type: Date, default: Date.now },
  closedAt: Date,
  applicationDeadline: Date,
  
  // Additional metadata
  tags: [String],
  jobCategory: String,
  visibility: { type: String, enum: ['public', 'private', 'invite-only'], default: 'public' },
  targetCandidates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Index for efficient searching
jobSchema.index({ title: 'text', description: 'text', requirements: 'text' });
jobSchema.index({ location: 1, status: 1 });
jobSchema.index({ userId: 1, status: 1 });
jobSchema.index({ salary: 1 });
jobSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Job', jobSchema);
