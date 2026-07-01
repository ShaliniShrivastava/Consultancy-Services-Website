const Requirement = require("../model/Requirement");
const Resume = require("../model/Resume");
const nodemailer = require("nodemailer");

// Brevo SMTP transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

class FormController {
    static async postRequirement(req, res) {
        try {
            const data = new Requirement(req.body);
            await data.save();
            res.status(201).json({ success: true, message: "Requirement Submitted!" });
        } catch (err) { res.status(500).json({ success: false, message: err.message }); }
    }

    // 2. Post Resume (Candidate)
    static async postResume(req, res) {
        try {
            const { name, email, phone, designation } = req.body;

            // Check karo ki file aayi hai ya nahi
            let resumeUrl = req.file ? req.file.path : "";

            // 1. Data Save karo
            const data = new Resume({ name, email, phone, designation, resumeUrl });
            await data.save();

            // 2. Candidate ko Mail bhejo
            await transporter.sendMail({
                from: '"SR Admin Team" <mystle199@gmail.com>', 
                to: email, 
                subject: "Application Received - SR Admin",
                html: `
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
                    <h2 style="color: #015f41;">Hello ${name},</h2>
                    <p>Thank you for applying for the <b>${designation}</b> position.</p>
                    <p>We have received your resume. Our team will review it and get back to you soon.</p>
                    <br/>
                    <p>Regards,<br/><b>SR Admin Team</b></p>
                </div>`
            });

            // 3. Success Response
            res.status(201).json({ success: true, message: "Resume Uploaded & Mail Sent!" });

        } catch (err) {
            // Bhai, terminal mein ye 'Upload Error' check karna
            console.error("Upload Error:", err);
            res.status(500).json({ success: false, message: err.message });
        }
    }

    static async getRequirements(req, res) {
        const data = await Requirement.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data });
    }

    static async getResumes(req, res) {
        const data = await Resume.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data });
    }

    static async deleteRequirement(req, res) {
        try {
            await Requirement.findByIdAndDelete(req.params.id);
            res.status(200).json({ success: true, message: "Requirement Deleted!" });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }

    static async deleteResume(req, res) {
        try {
            await Resume.findByIdAndDelete(req.params.id);
            res.status(200).json({ success: true, message: "Application Deleted!" });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }

    // Shortlist email bhejo
    static async shortlistCandidate(req, res) {
        try {
            const { name, email } = req.body;

            await transporter.sendMail({
                from: `"SR Web Consultancy" <${process.env.SENDER_EMAIL}>`,
                to: email,
                subject: "Congratulations! You are Shortlisted 🎉",
                html: `
        <div style="font-family:Arial;max-width:500px;margin:auto;padding:30px;background:#f9f9f9;border-radius:12px;">
          <div style="background:#8FB339;padding:20px;border-radius:8px 8px 0 0;text-align:center;">
            <h2 style="color:white;margin:0;">SR Web Consultancy</h2>
          </div>
          <div style="background:white;padding:25px;border-radius:0 0 8px 8px;">
            <h3 style="color:#015f41;">Dear ${name},</h3>
            <p style="color:#555;">We are pleased to inform you that you have been <strong style="color:#8FB339;">shortlisted</strong> for the position you applied for.</p>
            <p style="color:#555;">Our team will contact you shortly with further details regarding the next steps.</p>
            <div style="background:#eef5df;padding:15px;border-radius:8px;margin:20px 0;border-left:4px solid #8FB339;">
              <p style="margin:0;color:#015f41;font-weight:bold;">Next Steps:</p>
              <p style="margin:5px 0 0;color:#555;">Please keep your phone available. Our HR team will reach out to schedule an interview.</p>
            </div>
            <p style="color:#999;font-size:12px;margin-top:20px;">Best Regards,<br><strong>SR Web Consultancy Team</strong></p>
          </div>
        </div>
      `,
            });

            res.status(200).json({ success: true, message: "Shortlist email bhej diya!" });
        } catch (err) {
            console.error("Email Error:", err);
            res.status(500).json({ success: false, message: err.message });
        }
    }

    // Reject email bhejo
    static async rejectCandidate(req, res) {
        try {
            const { name, email } = req.body;

            await transporter.sendMail({
                from: `"SR Web Consultancy" <${process.env.SENDER_EMAIL}>`,
                to: email,
                subject: "Application Status Update",
                html: `
        <div style="font-family:Arial;max-width:500px;margin:auto;padding:30px;background:#f9f9f9;border-radius:12px;">
          <div style="background:#015f41;padding:20px;border-radius:8px 8px 0 0;text-align:center;">
            <h2 style="color:white;margin:0;">SR Web Consultancy</h2>
          </div>
          <div style="background:white;padding:25px;border-radius:0 0 8px 8px;">
            <h3 style="color:#333;">Dear ${name},</h3>
            <p style="color:#555;">Thank you for applying and showing interest in our organization.</p>
            <p style="color:#555;">After careful consideration, we regret to inform you that we are <strong style="color:#d94e4e;">unable to move forward</strong> with your application at this time.</p>
            <div style="background:#fff5f5;padding:15px;border-radius:8px;margin:20px 0;border-left:4px solid #d94e4e;">
              <p style="margin:0;color:#d94e4e;font-weight:bold;">Don't Give Up!</p>
              <p style="margin:5px 0 0;color:#555;">We encourage you to keep improving your skills and apply again in the future.</p>
            </div>
            <p style="color:#999;font-size:12px;margin-top:20px;">Best Regards,<br><strong>SR Web Consultancy Team</strong></p>
          </div>
        </div>
      `,
            });

            res.status(200).json({ success: true, message: "Rejection email bhej diya!" });
        } catch (err) {
            console.error("Email Error:", err);
            res.status(500).json({ success: false, message: err.message });
        }
    }

}
module.exports = FormController;