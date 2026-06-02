const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  status: {
    type: String,
    enum: ['applied', 'viewed', 'shortlisted', 'interviewed', 'offered', 'rejected', 'withdrawn'],
    default: 'applied'
  },
  
  matchScore: {
    roleMatch: Number,
    skillMatch: Number,
    experienceMatch: Number,
    overall: Number
  },
  
  applicationNotes: String,
  recruiterNotes: [{
    note: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
  }],
  
  interviewScheduled: {
    isScheduled: Boolean,
    date: Date,
    time: String,
    interviewType: String, // 'phone', 'video', 'in-person'
    interviewerName: String,
    interviewLink: String
  },
  
  ratings: {
    technicalSkills: Number, // 1-5
    communication: Number,   // 1-5
    cultureFit: Number,      // 1-5
    overallFit: Number       // 1-5
  },
  
  feedback: String,
  
  appliedAt: { type: Date, default: Date.now },
  viewedAt: Date,
  shortlistedAt: Date,
  rejectedAt: Date,
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Index for efficient querying
jobApplicationSchema.index({ jobId: 1, candidateId: 1 });
jobApplicationSchema.index({ recruiterId: 1, status: 1 });
jobApplicationSchema.index({ candidateId: 1, status: 1 });

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
