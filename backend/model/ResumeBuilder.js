const mongoose = require('mongoose');

const resumeBuilderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  email: String,
  phone: String,
  designation: String,
  summary: String,
  education: [{ degree: String, institute: String, year: String, percentage: String }],
  experience: [{ company: String, role: String, duration: String, description: String }],
  skills: [String],
  paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' },
  razorpayOrderId: String,
}, { timestamps: true });

module.exports = mongoose.model('ResumeBuilder', resumeBuilderSchema);