const express = require("express");
const JobRouter = express.Router();
const { authenticateRecruiter } = require("../../modules/authHelper");
const dbJob = require("../../db_modules/dbJob");

JobRouter.get("/", async (req, res) => {
  try {
    const jobs = await dbJob.get();
    res.status(200).json(jobs);
  } catch (err) {
    console.error("GET /job/", err)
    res.status(err.code || 400).json({ message: err.message || err });
  }
});

JobRouter.use(authenticateRecruiter);

JobRouter.use((req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: "Login required." });
    return;
  }
  next();
});

JobRouter.post("/", async (req, res) => {
  try {
    const { _id = "", name = "" } = req.user;

    const { title = "", location = "", description = "" } = req.body;

    if (!title || !location || !description) {
      res.status(400).json({ message: "Invalid input" });
    }

    await dbJob.create(_id, name, title, location, description);

    res.status(201).json({ ok: 1 });
  } catch (err) {
    console.error("POST /job/", err)
    res.status(err.code || 400).json({ message: err.message || err });
  }
});

JobRouter.post("/close", async (req, res) => {
  try {
    const { _id = "" } = req.user;
    const { jobObjId = "" } = req.body;
    if (!jobObjId) {
      res.status(400).json({ message: "Invalid input" });
      return;
    }

    await dbJob.close(_id, jobObjId);

    res.sendStatus(204);
  } catch (err) {
    console.error("POST /job/close", err)
    res.status(err.code || 400).json({ message: err.message || err });
  }
});

module.exports = JobRouter;