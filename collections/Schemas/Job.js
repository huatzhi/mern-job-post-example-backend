const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSchema = new Schema({
  recruiter: {
    type: mongoose.Types.ObjectId,
    ref: "recruiters"
  },
  recruiterName: String,
  title: String,
  location: String,
  description: String,
  statusOpen: { type: Boolean, default: true }
}, {
  timestamps: true
});

JobSchema.index({ statusOpen: 1, recruiter: 1, createdAt: -1 });
JobSchema.index({ statusOpen: 1, createdAt: -1 });

Job = mongoose.model("jobs", JobSchema);

module.exports = Job;