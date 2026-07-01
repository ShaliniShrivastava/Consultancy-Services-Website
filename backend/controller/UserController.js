const Customer = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UserController {

    // 📝 Register Customer
    static async register(req, res) {
        try {

            const { name, email, password, number, gender, city } = req.body;

            const existingCustomer = await Customer.findOne({ email });
            if (existingCustomer) {
                return res.status(400).json({ message: "Email already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newCustomer = new Customer({
                name,
                email,
                password: hashedPassword,
                number,
                gender,
                city,
            });

            await newCustomer.save();

            res.status(201).json({
                success: true,
                message: "Customer registered successfully",
                email: newCustomer.email
            });

        } catch (error) {
            res.status(500).json({ success: false, message: "Server error", error: error.message });
        }
    }

    // 🔑 Login Customer
    static async login(req, res) {
        try {
            const { email, password } = req.body;

            const customer = await Customer.findOne({ email });
            if (!customer) {
                return res.status(400).json({ success: false, message: "Invalid credentials" });
            }

            const isMatch = await bcrypt.compare(password, customer.password);
            if (!isMatch) {
                return res.status(400).json({ success: false, message: "Invalid credentials" });
            }

            const token = jwt.sign(
                { userId: customer._id, role: customer.role || "candidate" },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            res.status(200).json({
                success: true,
                message: "Login successful",
                user: {
                    id: customer._id,
                    name: customer.name,
                    email: customer.email,
                    role: customer.role,
                    gender: customer.gender, // Frontend ke liye added
                    city: customer.city      // Frontend ke liye added
                }
            });

        } catch (error) {
            res.status(500).json({ success: false, message: "Server error", error: error.message });
        }
    }

    // 🚪 Logout Customer
    static async logout(req, res) {
        try {
            res.clearCookie("token", {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                path: "/"
            });
            res.status(200).json({ success: true, message: "Customer logged out successfully" });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error during logout", error });
        }
    }

    // 👤 Get Customer Profile
    static async getProfile(req, res) {
        try {
            // Yahan select("-password") karne se gender aur city automatically aa jayenge
            const customer = await Customer.findById(req.user.userId).select("-password");
            if (!customer) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            res.status(200).json({
                success: true,
                message: 'Customer data displayed',
                data: customer
            });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error fetching profile", error });
        }
    }

    // 🔐 Change Password
    static async changePassword(req, res) {
        try {
            const { userId, oldPassword, newPassword } = req.body;

            const customer = await Customer.findById(userId);
            if (!customer) {
                return res.status(404).json({ success: false, message: "User nahi mila!" });
            }

            const isMatch = await bcrypt.compare(oldPassword, customer.password);
            if (!isMatch) {
                return res.status(400).json({ success: false, message: "old password is not correct !" });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            customer.password = hashedPassword;
            await customer.save();

            res.status(200).json({
                success: true,
                message: "Password changed successfully!"
            });

        } catch (error) {
            res.status(500).json({ success: false, message: "Server error", error: error.message });
        }
    }

}

module.exports = UserController;