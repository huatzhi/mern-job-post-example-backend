const { Recruiter } = require("../collections/collections");
const authHelper = require("../modules/authHelper");

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

      Recruiter(newRecruiterData).save();
    } catch (e) {
      console.error("register recruiter failure:", e);
      return Promise.reject({ code: 400, message: "Register failed. Unknown issue." })
    }
  },
};

module.exports = dbRecruiter;