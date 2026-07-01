const Feedback = require("../model/Feedback");

class FeedbackController {
    // 1. User feedback submit karega
    static async postFeedback(req, res) {
        try {
            const data = new Feedback(req.body);
            await data.save();
            res.status(201).json({ success: true, message: "Thank you for your feedback!" });
        } catch (err) { res.status(500).json({ success: false, message: err.message }); }
    }

    // 2. Admin dashboard par saare feedbacks dikhane ke liye
    static async getAllFeedbacks(req, res) {
        const data = await Feedback.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data });
    }

    // 3. Status update (Approve/Reject) - Website par dikhane ke liye
    static async updateStatus(req, res) {
        await Feedback.findByIdAndUpdate(req.params.id, { status: req.body.status });
        res.status(200).json({ success: true, message: "Status Updated!" });
    }

    static async deleteFeedback(req, res) {
    try {
        const { id } = req.params;
        const deletedFeedback = await Feedback.findByIdAndDelete(id);

        if (!deletedFeedback) {
            return res.status(404).json({ success: false, message: "Feedback not found!" });
        }

        res.status(200).json({ success: true, message: "Feedback successfully deleted!" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}
}
module.exports = FeedbackController;