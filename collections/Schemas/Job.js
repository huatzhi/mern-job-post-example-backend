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

Job = mongoose.model("jobs", JobSchema);

module.exports = Job;