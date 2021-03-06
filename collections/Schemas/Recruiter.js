const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecruiterSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: { // note that hashed password is saved. Please check with authHelper.js
    type: String,
    required: true
  },
}, {
  timestamps: true
});

Recruiter = mongoose.model("recruiters", RecruiterSchema);

module.exports = Recruiter;