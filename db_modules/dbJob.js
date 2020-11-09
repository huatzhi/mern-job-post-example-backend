const { Job } = require("../collections/collections");

const dbJob = {
  get: async () => await Job.find({ statusOpen: true }).sort({ createdAt: -1 }).lean(),

  create: async (recruiterObjId, recruiterName, title, location, description) => {
    try {
      const job = new Job({ recruiter: recruiterObjId, recruiterName, title, location, description });
      await job.save();
    } catch (err) {
      console.error("Job create error", err);
      return Promise.reject({ code: 400, message: "Failed to save job." });
    }
  },

  getRecruiterJobs: async recruiterObjId => await Job.find({ recruiter: recruiterObjId, statusOpen: true }).sort({ createdAt: -1 }).lean(),

  close: async (recruiterObjId, jobObjId) => {
    let output = await Job.updateOne({ _id: jobObjId, recruiter: recruiterObjId, statusOpen: true }, { statusOpen: false });
    if (!output || !output.nModified) {
      return Promise.reject({ status: 400, message: "Job not found." });
    }
  },

}

module.exports = dbJob;