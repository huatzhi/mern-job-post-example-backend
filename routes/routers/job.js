const express = require("express");
const { default: validator } = require("validator");
const Validator = require("validator");
const JobRouter = express.Router();
const passport = require('passport');
const { authenticateRecruiter } = require("../../modules/authHelper");
const dbJob = require("../../db_modules/dbJob");

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
    const { _id = "" } = req.user;

    const { title = "", location = "", description = "" } = req.body;

    if (!title || !location || !description) {
      res.status(400).json({ message: "Invalid input" });
    }

    await dbJob.create(_id, title, location, description);

    res.status(201).json({ ok: 1 });
  } catch (err) {
    console.error("POST /job/", err)
    res.status(err.code || 400).json({ message: err.message || err });
  }
});

module.exports = JobRouter;