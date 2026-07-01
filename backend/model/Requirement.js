const mongoose = require("mongoose");
const requirementSchema = new mongoose.Schema({
    name: String,
    businessName: String,
    email: String,
    phone: String,
    message: String,
    experience: Number,
    gstNumber:String
}, { timestamps: true });
module.exports = mongoose.model("Requirement", requirementSchema);