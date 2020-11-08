const express = require("express");

const router = express.Router();

router.use(require("./routers/auth"));

module.exports = router;