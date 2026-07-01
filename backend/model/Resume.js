const mongoose = require("mongoose");
const resumeSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    designation: String,
    resumeUrl: String // Cloudinary link
}, { timestamps: true });
module.exports = mongoose.model("Resume", resumeSchema);