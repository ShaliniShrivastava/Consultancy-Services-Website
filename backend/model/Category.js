const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, // Image ka URL ya path
  jobsCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Category", categorySchema);