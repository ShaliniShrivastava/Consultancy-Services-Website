const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    userType: { type: String, enum: ['Candidate', 'Client'], default: 'Candidate' }, // Kaun feedback de raha hai
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, required: true },
    status: { type: String, default: "Pending" }, // Admin approve karega tabhi website par dikhega
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Feedback", feedbackSchema);