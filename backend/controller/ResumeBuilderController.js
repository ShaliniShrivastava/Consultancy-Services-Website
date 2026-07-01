const ResumeBuilder = require('../model/ResumeBuilder');
const Razorpay = require('razorpay');
const crypto = require('crypto');
require('dotenv').config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 1. Razorpay order banao
const createOrder = async (req, res) => {
  try {
    const order = await razorpay.orders.create({
      amount: 5000,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });
    res.status(200).json({ success: true, order });
  } catch (err) {
    console.error("Order Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// 2. Payment verify karo
const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Payment invalid!" });
    }
    res.status(200).json({ success: true, message: "Payment verified!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 3. Resume data save karo
const saveResumeData = async (req, res) => {
  try {
    const { userId, name, email, phone, designation, summary, education, experience, skills, razorpayOrderId } = req.body;

    const resume = new ResumeBuilder({
      userId,
      name,
      email,
      phone,
      designation,
      summary,
      education: JSON.parse(education || '[]'),
      experience: JSON.parse(experience || '[]'),
      skills: JSON.parse(skills || '[]'),
      paymentStatus: 'paid',
      razorpayOrderId,
    });

    await resume.save();
    res.status(201).json({ success: true, message: "Resume save ho gaya!", data: resume });
  } catch (err) {
    console.error("Save Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// 4. Admin — sab resumes fetch karo
const getAllResumes = async (req, res) => {
  try {
    const data = await ResumeBuilder.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 5. Admin — resume delete karo
const deleteResume = async (req, res) => {
  try {
    await ResumeBuilder.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Resume deleted!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { createOrder, verifyPayment, saveResumeData, getAllResumes, deleteResume };