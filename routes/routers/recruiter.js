const express = require("express");
const RecruiterRouter = express.Router();
const { authenticateRecruiter } = require("../../modules/authHelper");
const dbJob = require("../../db_modules/dbJob");

RecruiterRouter.use(authenticateRecruiter);

RecruiterRouter.use((req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: "Login required." });
    return;
  }
  next();
});

RecruiterRouter.get("/job", async (req, res) => {
  const { _id = "" } = req.user;
  try {
    let jobs = await dbJob.getRecruiterJobs(_id);
    res.status(200).json(jobs);
  } catch (err) {
    console.error("GET /recruiter/job/", err)
    res.status(err.code || 400).json({ message: err.message || err });
  }
})

module.exports = RecruiterRouter;