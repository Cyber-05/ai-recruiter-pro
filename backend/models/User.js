const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  company: { type: String },
  profilePicture: { type: String },
  bio: { type: String },
  phone: { type: String },
  location: { type: String },
  
  // User role and type
  role: { type: String, enum: ['recruiter', 'job-seeker', 'admin'], default: 'job-seeker' },
  
  // Job seeker specific fields
  jobSeekerProfile: {
    yearsOfExperience: { type: Number, default: 0 },
    skills: [{
      name: String,
      proficiency: { type: String, enum: ['beginner', 'intermediate', 'advanced', 'expert'], default: 'intermediate' },
      endorsements: { type: Number, default: 0 }
    }],
    education: [{
      degree: String,
      field: String,
      institution: String,
      graduationYear: Number
    }],
    workHistory: [{
      title: String,
      company: String,
      startDate: Date,
      endDate: Date,
      description: String,
      currentlyWorking: Boolean
    }],
    jobTypePreference: [String], // ['full-time', 'part-time', 'contract', 'remote']
    locationPreference: [String],
    salaryExpectation: {
      min: Number,
      max: Number,
      currency: { type: String, default: 'USD' }
    },
    industry: String,
    careerGoals: String,
    availability: {
      status: { type: String, enum: ['immediately', 'within-a-week', 'within-a-month', 'negotiable'], default: 'negotiable' },
      noticePeriodDays: Number
    },
    profileCompleteness: { type: Number, default: 0, min: 0, max: 100 },
    recommendedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
    appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
    savedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }]
  },
  
  // Recruiter specific fields
  recruiterProfile: {
    companyName: String,
    companySize: String,
    industry: String,
    companyWebsite: String,
    hiringTeamSize: Number,
    openPositions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
    savedCandidates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    favoriteQuestions: [String],
    hiringMetrics: {
      totalJobsPosted: { type: Number, default: 0 },
      totalCandidatesContacted: { type: Number, default: 0 },
      averageTimeToHire: { type: Number, default: 0 },
      successfulHires: { type: Number, default: 0 }
    }
  },
  
  subscription: {
    plan: { type: String, enum: ['free', 'pro', 'enterprise'], default: 'free' },
    status: { type: String, enum: ['active', 'inactive', 'cancelled'], default: 'active' },
    stripeCustomerId: String,
    stripeSubscriptionId: String,
    currentPeriodEnd: Date,
    resumesUsed: { type: Number, default: 0 },
    resumesLimit: { type: Number, default: 10 }
  },
  features: {
    resumeAnalyzer: { type: Boolean, default: true },
    atsChecker: { type: Boolean, default: false },
    interviewGenerator: { type: Boolean, default: false },
    jobDescriptionGenerator: { type: Boolean, default: false },
    candidateRanking: { type: Boolean, default: false },
    teamCollaboration: { type: Boolean, default: false },
    advancedAnalytics: { type: Boolean, default: false }
  },
  apiKey: String,
  isVerified: { type: Boolean, default: false },
  verificationToken: String,
  otp: String,
  otpExpire: Date,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  
  // Advanced tracking
  activityLog: [{
    action: String,
    targetId: mongoose.Schema.Types.ObjectId,
    timestamp: { type: Date, default: Date.now }
  }],
  preferences: {
    emailNotifications: { type: Boolean, default: true },
    jobAlerts: { type: Boolean, default: true },
    messageNotifications: { type: Boolean, default: true }
  },
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
