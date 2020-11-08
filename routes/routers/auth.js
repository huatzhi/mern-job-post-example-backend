const express = require("express");
const Validator = require("validator");
const dbRecruiter = require("../../db_modules/dbRecruiter");
const AuthRouter = express.Router();

// should change to post
AuthRouter.post("/recruiter/register", async (req, res) => {
  // todo :: add validations
  try {
    const { email = "", name = "", password = "" } = req.body;
    if (!Validator.isEmail(email) || Validator.isEmpty(name)) {
      res.status(400).json({ message: "Invalid input." });
      return;
    }

    if (!Validator.isLength(password, { min: 6, max: 30 })) {
      res.status(400).json({ message: "Password have to be at least 6 characters and at most 30 characters." });
      return;
    }

    await dbRecruiter.register(name, email, password);
    res.status(200).json({ message: "Registration Success." });
  } catch (err) {
    console.error("/recruiter/register", err)
    res.status(err.code || 400).json({ message: err.message || err });
  }
})

module.exports = AuthRouter;
