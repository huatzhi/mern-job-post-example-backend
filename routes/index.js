const express = require("express");
const JobRouter = require("./routers/job");
const RecruiterRouter = require("./routers/recruiter");

const router = express.Router();

router.use(require("./routers/auth"));
router.use("/job", JobRouter);
router.use("/recruiter", RecruiterRouter);

module.exports = router;