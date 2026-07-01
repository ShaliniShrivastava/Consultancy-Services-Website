// require("dotenv").config();
// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });

// transporter.sendMail({
//   from: `"InternshipHub" <${process.env.SMTP_USER}>`,
//   to: "mystle199@gmail.com",   // apna email — test ke liye
//   subject: "Brevo Test Email",
//   html: "<h3>✅ Brevo working!</h3>",
// }).then(() => console.log("✅ Email sent successfully!"))
//   .catch((err) => console.error("❌ Error:", err.message));