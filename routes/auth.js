const { Router } = require("express");
const express = require("express");
const AuthRouter = express.Router();

// should change to post
AuthRouter.get("/register", (req, res) => {
  res.status(200).json({ ok: 1 });
})

module.exports = AuthRouter;
