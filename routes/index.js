const express = require("express");
const JobRouter = require("./routers/job");

const router = express.Router();

router.use(require("./routers/auth"));
router.use("/job", JobRouter);

module.exports = router;