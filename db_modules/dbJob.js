const { Job } = require("../collections/collections");

const dbJob = {
  create: async (recruiterObjId, title, location, description) => {
    try {
      const job = new Job({ recruiter: recruiterObjId, title, location, description });
      await job.save();
    } catch (err) {
      console.error("Job create error", err);
      return Promise.reject({ code: 400, message: "Failed to save job." });
    }
  },

}

module.exports = dbJob;