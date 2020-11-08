const { Recruiter } = require("../collections/collections");
const authHelper = require("../modules/authHelper");
const jwtHelper = require("../modules/jwtHelper");

const dbRecruiter = {
  register: async (name, email, password) => {
    try {
      let exist = await Recruiter.findOne({ email }, { email: 1 }).lean();
      if (exist) {
        return Promise.reject({ status: 400, message: "The email is existed. Please login." });
      }

      const hashedPassword = await authHelper.hash(password);

      const newRecruiterData = {
        name,
        email,
        password: hashedPassword
      };

      await Recruiter(newRecruiterData).save();
    } catch (e) {
      console.error("register recruiter failure:", e);
      return Promise.reject({ code: 400, message: "Register failed. Unknown issue." })
    }
  },

  login: async (email, password) => {
    const recruiter = await Recruiter.findOne({ email }).lean();
    if (!recruiter) {
      return Promise.reject({ status: 401, message: "Either email or password is wrong. Please check again." });
    }

    let loginVerification;
    try {
      loginVerification = await authHelper.verify(password, recruiter.password);
    } catch (err) {
      console.error("login verification error", err);
      return Promise.reject({ status: 400, message: "Login verification process failed. Please contact customer services." });
    }
    if (!loginVerification) {
      return Promise.reject({ status: 401, message: "Either email or password is wrong. Please check again." });
    }

    const payload = {
      _id: String(recruiter._id),
      email: recruiter.email,
      name: recruiter.name
    };

    const token = jwtHelper.sign(payload);

    return {
      name: recruiter.name,
      token: `Bearer ${token}`
    };
  },
};

module.exports = dbRecruiter;