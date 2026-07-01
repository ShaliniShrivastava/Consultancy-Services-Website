const Admin = require("../model/Admin");
const User = require("../model/User"); // Candidates list ke liye User model
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Requirement = require("../model/Requirement"); // Check karein aapka Job model isi naam se hai na?
const Resume = require("../model/Resume");

class AdminController {

    // 1. Admin Login
    static async login(req, res) {
        const { email, password } = req.body;
        try {
            // 1. Users collection mein dhundo jahan role admin ho
            const admin = await User.findOne({ email: email, role: "admin" });

            if (!admin) {
                console.log("admin is not found!");
                return res.status(400).json({ success: false, message: "Admin access denied!" });
            }

            // 2. Password compare karein (Kyunki DB mein hash hai)
            const isMatch = await bcrypt.compare(password, admin.password);
            if (!isMatch) {
                console.log("Invalid Password!");
                return res.status(400).json({ success: false, message: "Invalid Password!" });
            }

            // 3. Login Success
            console.log("Login Successful:", admin.name);
            res.status(200).json({
                success: true,
                user: { id: admin._id, name: admin.name, email: admin.email, role: admin.role }
            });

        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }


    static async getDashboardStats(req, res) {
        try {
            const totalUsers = await User.countDocuments({ role: 'candidate' });
            const activeJobs = await Requirement.countDocuments(); // Aapka /admin/requirements wala model
            const totalApplications = await Resume.countDocuments(); // Aapka /admin/resumes wala model

            res.status(200).json({
                success: true,
                stats: {
                    totalUsers,
                    activeJobs,
                    totalApplications
                }
            });
        } catch (error) {
            res.status(500).json({ success: false, message: "not able to fetch stats" });
        }
    }

    // 3. Get All Applications (Table ke liye)
    static async getApplicationsList(req, res) {
        try {
            // Note: Agar aap table mein Resume dikhana chahte hain toh Resume.find() use karein
            const applications = await User.find({ role: 'candidate' }).select("-password").sort({ createdAt: -1 });

            res.status(200).json({
                success: true,
                data: applications
            });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error fetching applications" });
        }
    }

    // 4. Logout Admin
    static async logout(req, res) {
        try {
            res.clearCookie("adminToken");
            res.status(200).json({ message: "Admin logged out successfully" });
        } catch (error) {
            res.status(500).json({ message: "Logout error" });
        }
    }

    
}

module.exports = AdminController;