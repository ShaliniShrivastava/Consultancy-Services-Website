const Contact = require("../model/Contact");

class ContactController {
    // 1. Form submit karne ke liye
    static async postContact(req, res) {
        try {
            const data = new Contact(req.body);
            await data.save();
            res.status(201).json({ success: true, message: "Contact details saved!" });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }

    // 2. Dashboard par dikhane ke liye
    static async getContacts(req, res) {
        try {
            const data = await Contact.find().sort({ createdAt: -1 });
            res.status(200).json({ success: true, data });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }

    // 3. Delete karne ke liye
    static async deleteContact(req, res) {
        try {
            await Contact.findByIdAndDelete(req.params.id);
            res.status(200).json({ success: true, message: "Entry Deleted!" });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }
}

module.exports = ContactController;