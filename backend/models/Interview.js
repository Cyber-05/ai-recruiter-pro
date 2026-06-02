const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' },
  jobRole: { type: String, required: true },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'intermediate' },
  questions: [{
    number: Number,
    question: String,
    type: { type: String, enum: ['technical', 'behavioral', 'coding', 'system-design'], default: 'technical' },
    expectedAnswerKeyPoints: [String],
    difficulty: String,
    estimatedTime: Number
  }],
  duration: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Interview', interviewSchema);
