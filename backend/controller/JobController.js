const Job = require("../model/Job");

class JobController {
  static async addJob(req, res) {
    try {
      const newJob = new Job(req.body);
      await newJob.save();
      res.status(201).json({ success: true, message: "Job Added!" });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
  }

  static async getJobs(req, res) {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: jobs });
  }

  static async deleteJob(req, res) {
    await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Deleted!" });
  }

  static async updateJob(req, res) {
    await Job.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ success: true, message: "Updated!" });
  }
}
module.exports = JobController;